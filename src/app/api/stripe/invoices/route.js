import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
  { apiVersion: process.env.STRIPE_API_VERSION || "2026-03-25.dahlia" }
);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get("customer_id");

  if (!customerId) {
    return NextResponse.json(
      { message: "customer_id query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: 20,
    });

    const result = invoices.data.map((inv) => ({
      id:                  inv.id,
      number:              inv.number,
      status:              inv.status,
      created:             inv.created,
      amount_paid:         inv.amount_paid,
      total:               inv.total,
      subscription_plan:   inv.lines?.data?.[0]?.price?.nickname
                           || inv.lines?.data?.[0]?.description
                           || null,
      hosted_invoice_url:  inv.hosted_invoice_url,
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error fetching invoices:", err);
    return NextResponse.json(
      { message: err.message || "Error fetching invoices" },
      { status: 500 }
    );
  }
}