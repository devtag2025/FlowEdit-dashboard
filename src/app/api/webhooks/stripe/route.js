import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: process.env.STRIPE_API_VERSION || "2026-03-25.dahlia",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY,
  
);
const planForPrice = (priceId) => {
  if (!priceId) return "launch";
  const starter = process.env.STRIPE_PRICE_STARTER || process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER;
  const pro     = process.env.STRIPE_PRICE_PRO     || process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO;
  const agency  = process.env.STRIPE_PRICE_AGENCY  || process.env.NEXT_PUBLIC_STRIPE_PRICE_AGENCY;
  if (priceId === starter) return "starter";
  if (priceId === pro)     return "pro";
  if (priceId === agency)  return "agency";
  return "launch";
};

/**
 * Fetch full customer details from Stripe so we can store
 * name, email, and billing address in the profiles table.
 * This avoids needing a second API call from the frontend.
 */
async function getStripeCustomerDetails(customerId) {
  if (!customerId) return {};
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return {
      name:    customer.name  || null,
      email:   customer.email || null,
      address: customer.address?.line1
                 ? [customer.address.line1, customer.address.line2]
                     .filter(Boolean).join(", ")
                 : null,
      city:    [customer.address?.city, customer.address?.state]
                 .filter(Boolean).join(", ") || null,
    };
  } catch {
    return {};
  }
}

const updateProfileSubscription = async ({
  customerId,
  status,
  plan,
  email,
  name,
  includeAddress = false,  // only fetch address on checkout.session.completed
}) => {
  if (!customerId && !email) {
    console.warn("updateProfileSubscription called without customerId or email");
    return;
  }

  // Base subscription payload
  const payload = {
    subscription_status: status,
    subscription_plan:   plan,
    stripe_customer_id:  customerId,
  };

  // On checkout completion, also pull and store billing details from Stripe
  if (includeAddress && customerId) {
    const details = await getStripeCustomerDetails(customerId);
    if (details.name)    payload.name    = details.name;
    if (details.email)   payload.email   = details.email;
    if (details.address) payload.address = details.address;
    if (details.city)    payload.city    = details.city;
  }

  let updated = false;

  // ── 1. Try by stripe_customer_id ─────────────────────────────────────────
  if (customerId) {
    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("stripe_customer_id", customerId)
      .select();

    if (error) console.error("Webhook update by stripe_customer_id:", error);
    if (data?.length > 0) updated = true;
  }

  // ── 2. Try by email ───────────────────────────────────────────────────────
  if (!updated && email) {
    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("email", email)
      .select();

    if (error) console.error("Webhook update by email:", error);
    if (data?.length > 0) updated = true;
  }

  // ── 3. Upsert by email as last resort ─────────────────────────────────────
  if (!updated && email) {
    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          ...payload,
          email,
          name: name || payload.name || "Stripe Customer",
          role: "client",
        },
        { onConflict: "email" }
      );

    if (error) console.error("Webhook upsert by email:", error);
  }
};

export async function POST(req) {
  const payload = await req.text();
  const header  = req.headers.get("stripe-signature");

  if (!header) {
    return NextResponse.json({ message: "Missing stripe-signature header" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      header,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ message: "Webhook signature verification failed" }, { status: 400 });
  }

  try {
    const type = event.type;
    const data = event.data.object;

    switch (type) {
      case "checkout.session.completed": {
        const customerId     = data.customer;
        const subscriptionId = data.subscription;
        const email          = data.customer_details?.email ?? data.metadata?.email ?? null;
        const name           = data.customer_details?.name  ?? null;
        const plan           = data.metadata?.plan ?? "launch";

        console.log("checkout.session.completed", { customerId, subscriptionId, plan, email });

        await updateProfileSubscription({
          customerId,
          status: "active",
          plan,
          email,
          name,
          includeAddress: true,  // ← pull billing address from Stripe and save to profiles
        });

        // Refine plan from the actual subscription price
        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          if (subscription?.items?.data?.[0]?.price) {
            const mappedPlan = planForPrice(subscription.items.data[0].price.id);
            const subStatus  = subscription.status === "active" ? "active" : subscription.status;
            await updateProfileSubscription({
              customerId,
              status:  subStatus,
              plan:    mappedPlan,
              email,
              name,
              includeAddress: false, // already saved above
            });
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const customerId = data.customer;
        const status     = data.status;
        const plan       = planForPrice(data.items?.data?.[0]?.price?.id);
        await updateProfileSubscription({ customerId, status, plan });
        break;
      }

      case "customer.subscription.deleted": {
        const customerId = data.customer;
        await updateProfileSubscription({ customerId, status: "canceled", plan: "launch" });
        break;
      }

      case "invoice.payment_failed": {
        const customerId = data.customer;
        await updateProfileSubscription({ customerId, status: "past_due", plan: undefined });
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("Webhook processing error", err);
    return NextResponse.json({ message: "Webhook processing error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}