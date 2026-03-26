import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);

const planForPrice = (priceId) => {
  if (!priceId) return "launch";
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER) return "starter";
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO) return "pro";
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_AGENCY) return "agency";
  return "launch";
};

const updateProfileSubscription = async ({ customerId, status, plan, email }) => {
  let query = supabase.from("profiles").update({
    subscription_status: status,
    subscription_plan: plan,
  });

  if (customerId) {
    query = query.eq("stripe_customer_id", customerId);
  }

  let { error } = await query;

  if (error && email) {
    const fallback = await supabase.from("profiles").update({
      subscription_status: status,
      subscription_plan: plan,
      stripe_customer_id: customerId,
    }).eq("email", email);
    if (fallback.error) {
      console.error("Webhook profile update fallback error", fallback.error);
    }
    return;
  }

  if (error) {
    console.error("Webhook profile update error", error);
  }
};

export async function POST(req) {
  const payload = await req.text();
  const header = req.headers.get("stripe-signature");

  if (!header) {
    return NextResponse.json({ message: "Missing stripe-signature header" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      header,
      process.env.STRIPE_WEBHOOK_SECRET
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
        const customerId = data.customer;
        const subscriptionId = data.subscription;
        const plan = data.metadata?.plan || "launch";

        await updateProfileSubscription({
          customerId,
          status: "active",
          plan,
          email: data.customer_details?.email,
        });

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          if (subscription && subscription.items?.data?.[0]?.price) {
            const mappedPlan = planForPrice(subscription.items.data[0].price.id);
            await updateProfileSubscription({
              customerId,
              status: subscription.status === "active" ? "active" : subscription.status,
              plan: mappedPlan,
              email: data.customer_details?.email,
            });
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const customerId = data.customer;
        const status = data.status;
        const plan = planForPrice(data.items.data[0]?.price.id);

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
        await updateProfileSubscription({ customerId, status: "past_due" });
        break;
      }

      default:
        // ignore others
        break;
    }
  } catch (err) {
    console.error("Webhook processing error", err);
    return NextResponse.json({ message: "Webhook processing error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
