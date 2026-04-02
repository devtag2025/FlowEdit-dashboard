import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: process.env.STRIPE_API_VERSION || "2026-03-25.dahlia",
});

// Must use the JWT service_role key (starts with eyJ) — not the sb_secret_ key
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

async function getStripeCustomerDetails(customerId) {
  if (!customerId) return {};
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return {
      name:    customer.name  || null,
      email:   customer.email || null,
      address: customer.address?.line1
        ? [customer.address.line1, customer.address.line2].filter(Boolean).join(", ")
        : null,
      city: [customer.address?.city, customer.address?.state].filter(Boolean).join(", ") || null,
    };
  } catch (e) {
    console.error("[Webhook] getStripeCustomerDetails error:", e.message);
    return {};
  }
}

const updateProfileSubscription = async ({
  customerId, status, plan, email, name, includeAddress = false,
}) => {
  console.log("[Webhook] updateProfile:", { customerId, status, plan, email });

  if (!customerId && !email) {
    console.warn("[Webhook] no customerId or email — skipping");
    return;
  }

  const payload = {
    subscription_status: status,
    ...(plan !== undefined && { subscription_plan: plan }),
    ...(customerId && { stripe_customer_id: customerId }),
  };

  if (includeAddress && customerId) {
    const details = await getStripeCustomerDetails(customerId);
    if (details.name)    payload.name    = details.name;
    if (details.email)   payload.email   = details.email;
    if (details.address) payload.address = details.address;
    if (details.city)    payload.city    = details.city;
  }

  let updated = false;

  // 1. Try update by stripe_customer_id
  if (customerId) {
    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("stripe_customer_id", customerId)
      .select("id");
    console.log("[Webhook] by stripe_customer_id → rows:", data?.length, error?.message);
    if (data?.length > 0) updated = true;
  }

  // 2. Try update by email
  if (!updated && email) {
    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("email", email)
      .select("id");
    console.log("[Webhook] by email → rows:", data?.length, error?.message);
    if (data?.length > 0) updated = true;
  }

  // 3. Cannot insert new rows — profiles.id is a FK to auth.users.id
  //    If profile doesn't exist yet the user hasn't signed in via Google.
  //    fetchUserProfile handles the merge on first sign-in via the
  //    stripe_customer_id lookup.
  if (!updated) {
    console.log("[Webhook] profile not found for", email || customerId,
      "— will merge on first Google sign-in via fetchUserProfile");
  }
};

export async function POST(req) {
  const payload = await req.text();
  const header  = req.headers.get("stripe-signature");

  if (!header) {
    return NextResponse.json({ message: "Missing stripe-signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      header,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("[Webhook] signature verification failed:", err.message);
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  try {
    const { type, data: { object: data } } = event;
    console.log("[Webhook] event:", type);

    switch (type) {
      case "checkout.session.completed": {
        const customerId     = data.customer;
        const subscriptionId = data.subscription;
        const email          = data.customer_details?.email ?? data.metadata?.email ?? null;
        const name           = data.customer_details?.name  ?? null;
        const plan           = data.metadata?.plan ?? "launch";

        console.log("[Webhook] checkout.session.completed", { customerId, plan, email });

        await updateProfileSubscription({
          customerId, status: "active", plan, email, name, includeAddress: true,
        });

        if (subscriptionId) {
          const sub = await stripe.subscriptions.retrieve(subscriptionId);
          if (sub?.items?.data?.[0]?.price) {
            const mappedPlan = planForPrice(sub.items.data[0].price.id);
            const subStatus  = sub.status === "active" ? "active" : sub.status;
            await updateProfileSubscription({
              customerId, status: subStatus, plan: mappedPlan, email, name, includeAddress: false,
            });
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const plan = planForPrice(data.items?.data?.[0]?.price?.id);
        await updateProfileSubscription({ customerId: data.customer, status: data.status, plan });
        break;
      }

      case "customer.subscription.deleted": {
        await updateProfileSubscription({ customerId: data.customer, status: "canceled", plan: "launch" });
        break;
      }

      case "invoice.payment_failed": {
        await updateProfileSubscription({ customerId: data.customer, status: "past_due" });
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