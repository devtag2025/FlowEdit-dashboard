import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

const planForPrice = (priceId) => {
  if (!priceId) return "launch";
  if (priceId === process.env.STRIPE_PRICE_STARTER) return "starter";
  if (priceId === process.env.STRIPE_PRICE_PRO)     return "pro";
  if (priceId === process.env.STRIPE_PRICE_AGENCY)  return "agency";
  return "launch";
};

async function syncSubscription({ customerId, status, plan, email }) {
  if (!customerId && !email) return;

  const profilePayload = {
    subscription_status: status,
    ...(plan       && { subscription_plan:  plan }),
    ...(customerId && { stripe_customer_id: customerId }),
  };

  let updated = false;

  if (customerId) {
    const { data } = await supabase
      .from("profiles")
      .update(profilePayload)
      .eq("stripe_customer_id", customerId)
      .select("id");
    if (data?.length > 0) updated = true;
  }

  if (!updated && email) {
    const { data } = await supabase
      .from("profiles")
      .update(profilePayload)
      .eq("email", email)
      .select("id");
    if (data?.length > 0) updated = true;
  }

  if (!updated && email) {
    await supabase
      .from("pending_subscriptions")
      .upsert(
        {
          email,
          stripe_customer_id:  customerId ?? null,
          subscription_status: status,
          subscription_plan:   plan ?? "launch",
          updated_at:          new Date().toISOString(),
        },
        { onConflict: "email" }
      );
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
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  const { type, data: { object: obj } } = event;

  try {
    switch (type) {
      case "checkout.session.completed": {
        const customerId = obj.customer;
        const email      = obj.customer_details?.email ?? obj.metadata?.email ?? null;
        const plan       = obj.metadata?.plan ?? "launch";

        let resolvedPlan = plan;
        if (obj.subscription) {
          try {
            const sub = await stripe.subscriptions.retrieve(obj.subscription);
            const priceId = sub?.items?.data?.[0]?.price?.id;
            if (priceId) resolvedPlan = planForPrice(priceId);
          } catch {}
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
    return NextResponse.json({ message: "Processing error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
