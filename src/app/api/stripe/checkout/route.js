import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: process.env.STRIPE_API_VERSION || "2026-03-25.dahlia",
});

const PRICE_MAP = {
  starter: process.env.STRIPE_PRICE_STARTER,
  pro:     process.env.STRIPE_PRICE_PRO,
  agency:  process.env.STRIPE_PRICE_AGENCY,
};

export async function POST(request) {
  try {
    const { plan, profileId, stripeCustomerId } = await request.json();

    if (!plan || !PRICE_MAP[plan]) {
      return NextResponse.json({ message: "Invalid plan" }, { status: 400 });
    }

    const priceId = PRICE_MAP[plan];
    if (!priceId) {
      return NextResponse.json(
        { message: `Price ID not configured for plan: ${plan}` },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      return NextResponse.json(
        { message: "NEXT_PUBLIC_BASE_URL not configured" },
        { status: 500 }
      );
    }

    const sessionArgs = {
      mode:                 "subscription",
      payment_method_types: ["card"],
      line_items:           [{ price: priceId, quantity: 1 }],
      metadata:             { plan, ...(profileId && { profileId }) },
      // After payment → login page so user can sign in with Google
      success_url: `${baseUrl}/login?paid=true&plan=${plan}`,
      cancel_url:  `${baseUrl}/?canceled=true`,
    };

    if (stripeCustomerId) {
      sessionArgs.customer = stripeCustomerId;
    }

    const session = await stripe.checkout.sessions.create(sessionArgs);
    return NextResponse.json({ url: session.url, id: session.id });
  } catch (error) {
    console.error("[Checkout] error:", error);
    return NextResponse.json({ message: error.message || "Unknown error" }, { status: 500 });
  }
}