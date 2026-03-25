import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get("customer_id");

  if (!customerId) {
    return NextResponse.json({ message: "customer_id query parameter is required" }, { status: 400 });
  }

  try {
    const invoices = await stripe.invoices.list({ customer: customerId, limit: 20 });

    return NextResponse.json(invoices.data.map((inv) => ({
      id: inv.id,
      number: inv.number,
      status: inv.status,
      amount_paid: inv.amount_paid,
      total: inv.total,
      created: inv.created,
      due_date: inv.due_date,
      subscription_plan: inv.lines?.data?.[0]?.price?.nickname || null,
      hosted_invoice_url: inv.hosted_invoice_url,
    })));
  } catch (err) {
    console.error("Error fetching invoices", err);
    return NextResponse.json({ message: err.message || "Error fetching invoices" }, { status: 500 });
  }
}
