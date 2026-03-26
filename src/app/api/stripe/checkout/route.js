import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: "2026-03-25.dahlia",
});

const PRICE_MAP = {
  starter: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER,
  pro: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
  agency: process.env.NEXT_PUBLIC_STRIPE_PRICE_AGENCY,
};

export async function POST(request) {
  try {
    const { plan, profileId, stripeCustomerId } = await request.json();
    if (!plan || !PRICE_MAP[plan]) {
      return NextResponse.json({ message: "Invalid plan" }, { status: 400 });
    }

    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      return NextResponse.json({ message: "NEXT_PUBLIC_BASE_URL is not configured" }, { status: 500 });
    }

    const priceId = PRICE_MAP[plan];

    let sessionArgs = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { plan, profileId },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/client/service?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/client/service?canceled=true`,
    };

    if (stripeCustomerId) {
      sessionArgs.customer = stripeCustomerId;
    }

    const session = await stripe.checkout.sessions.create(sessionArgs);

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (error) {
    console.error("Checkout create error", error);
    return NextResponse.json({ message: error.message || "Unknown error" }, { status: 500 });
  }
}
