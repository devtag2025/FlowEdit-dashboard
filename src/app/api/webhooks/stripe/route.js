// src/app/api/webhooks/stripe/route.js
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: process.env.STRIPE_API_VERSION || "2026-03-25.dahlia",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY  // must be eyJ... service role JWT
);

const planForPrice = (priceId) => {
  if (!priceId) return "launch";
  if (priceId === process.env.STRIPE_PRICE_STARTER) return "starter";
  if (priceId === process.env.STRIPE_PRICE_PRO)     return "pro";
  if (priceId === process.env.STRIPE_PRICE_AGENCY)  return "agency";
  return "launch";
};

/**
 * Central subscription sync function.
 *
 * Strategy:
 *  1. Try UPDATE profiles by stripe_customer_id  → user already logged in before
 *  2. Try UPDATE profiles by email               → same (trigger already ran)
 *  3. Neither matched → user hasn't logged in yet
 *     UPSERT into pending_subscriptions so the trigger picks it up on first login
 */
async function syncSubscription({ customerId, status, plan, email }) {
  console.log("[Webhook] syncSubscription", { customerId, status, plan, email });

  if (!customerId && !email) {
    console.warn("[Webhook] no identifier — skipping");
    return;
  }

  const profilePayload = {
    subscription_status: status,
    ...(plan          && { subscription_plan:   plan }),
    ...(customerId    && { stripe_customer_id:  customerId }),
  };

  let updated = false;

  // 1. Try by stripe_customer_id
  if (customerId) {
    const { data, error } = await supabase
      .from("profiles")
      .update(profilePayload)
      .eq("stripe_customer_id", customerId)
      .select("id");
    console.log("[Webhook] by stripe_customer_id →", data?.length ?? 0, error?.message ?? "ok");
    if (data?.length > 0) updated = true;
  }

  // 2. Try by email
  if (!updated && email) {
    const { data, error } = await supabase
      .from("profiles")
      .update(profilePayload)
      .eq("email", email)
      .select("id");
    console.log("[Webhook] by email →", data?.length ?? 0, error?.message ?? "ok");
    if (data?.length > 0) updated = true;
  }

  // 3. No profile row yet — store in staging table
  //    The trigger on auth.users will merge this on Google sign-in
  if (!updated && email) {
    const { error } = await supabase
      .from("pending_subscriptions")
      .upsert({
        email,
        stripe_customer_id:  customerId ?? null,
        subscription_status: status,
        subscription_plan:   plan ?? "launch",
        updated_at:          new Date().toISOString(),
      }, { onConflict: "email" });

    if (error) {
      console.error("[Webhook] pending_subscriptions upsert failed:", error.message);
    } else {
      console.log("[Webhook] saved to pending_subscriptions for", email);
    }
  }
}

export async function POST(req) {
  const payload = await req.text();
  const header  = req.headers.get("stripe-signature");

  if (!header) {
    return NextResponse.json({ message: "Missing stripe-signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, header, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[Webhook] signature error:", err.message);
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  const { type, data: { object: obj } } = event;
  console.log("[Webhook] event:", type);

  try {
    switch (type) {

      case "checkout.session.completed": {
        const customerId = obj.customer;
        const email      = obj.customer_details?.email ?? obj.metadata?.email ?? null;
        const plan       = obj.metadata?.plan ?? "launch";

        // Resolve final plan from the subscription if available
        let resolvedPlan = plan;
        if (obj.subscription) {
          try {
            const sub = await stripe.subscriptions.retrieve(obj.subscription);
            const priceId = sub?.items?.data?.[0]?.price?.id;
            if (priceId) resolvedPlan = planForPrice(priceId);
          } catch (e) {
            console.warn("[Webhook] could not retrieve subscription:", e.message);
          }
        }

        await syncSubscription({ customerId, status: "active", plan: resolvedPlan, email });
        break;
      }

      case "customer.subscription.updated": {
        const plan = planForPrice(obj.items?.data?.[0]?.price?.id);
        await syncSubscription({ customerId: obj.customer, status: obj.status, plan });
        break;
      }

      case "customer.subscription.deleted": {
        await syncSubscription({ customerId: obj.customer, status: "canceled", plan: "launch" });
        break;
      }

      case "invoice.payment_failed": {
        await syncSubscription({ customerId: obj.customer, status: "past_due" });
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("[Webhook] processing error:", err);
    return NextResponse.json({ message: "Processing error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}