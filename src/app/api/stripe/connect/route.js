import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY,
  
);
export async function POST(req) {
  try {
    const { profileId, email } = await req.json();

    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_connect_id")
      .eq("id", profileId)
      .single();

    let accountId = profile?.stripe_connect_id;

    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        email,
        capabilities: { transfers: { requested: true } },
      });
      accountId = account.id;

      await supabase
        .from("profiles")
        .update({ stripe_connect_id: accountId })
        .eq("id", profileId);
    }

    const accountLink = await stripe.accountLinks.create({
      account:     accountId,
      refresh_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/contractor/earnings?connect=refresh`,
      return_url:  `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/contractor/earnings?connect=success`,
      type:        "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (err) {
    console.error("[Connect] onboarding error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}