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
    const { contractorId, adminId, amount, currency = "gbp", description } =
      await req.json();

    if (!contractorId || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid payment data" }, { status: 400 });
    }

    const { data: contractor, error: profileError } = await supabase
      .from("profiles")
      .select("stripe_connect_id, name, email")
      .eq("id", contractorId)
      .single();

    if (profileError || !contractor?.stripe_connect_id) {
      return NextResponse.json(
        { error: "Contractor has not connected their Stripe account" },
        { status: 400 }
      );
    }

    const transfer = await stripe.transfers.create({
      amount,
      currency,
      destination: contractor.stripe_connect_id,
      description: description || `Payment to ${contractor.name}`,
      metadata: { contractor_id: contractorId, admin_id: adminId },
    });

    const { data: payment, error: paymentError } = await supabase
      .from("contractor_payments")
      .insert({
        contractor_id:      contractorId,
        admin_id:           adminId,
        amount,
        currency,
        description:        description || null,
        status:             "paid",
        stripe_transfer_id: transfer.id,
      })
      .select()
      .single();

    if (paymentError) throw paymentError;

    await supabase.from("notifications").insert({
      user_id:      contractorId,
      title:        "Payment Received",
      message:      `You have received a payment of ${(amount / 100).toFixed(2)} ${currency.toUpperCase()}${description ? ` for: ${description}` : ""}.`,
      type:         "assignment",
      reference_id: payment.id,
    });

    return NextResponse.json({ success: true, payment, transfer_id: transfer.id });
  } catch (err) {
    console.error("[Payout] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}