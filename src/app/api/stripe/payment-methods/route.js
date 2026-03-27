import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: process.env.STRIPE_API_VERSION || "2026-03-25.dahlia",
});

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
    // Fetch payment methods attached to this customer
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });

    // Get the default payment method from the customer object
    const customer = await stripe.customers.retrieve(customerId);
    const defaultPmId =
      customer.invoice_settings?.default_payment_method ||
      customer.default_source;

    const result = paymentMethods.data.map((pm) => ({
      id:        pm.id,
      brand:     pm.card?.brand     || "card",
      last4:     pm.card?.last4     || "****",
      exp_month: pm.card?.exp_month || "--",
      exp_year:  pm.card?.exp_year  || "--",
      isDefault: pm.id === defaultPmId,
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error fetching payment methods:", err);
    return NextResponse.json(
      { message: err.message || "Error fetching payment methods" },
      { status: 500 }
    );
  }
}