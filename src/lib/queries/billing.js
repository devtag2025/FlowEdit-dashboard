import { createClient } from "@supabase/supabase-js";

const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  : null;

export async function createCheckoutSession(plan, profileId, stripeCustomerId) {
  const response = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan, profileId, stripeCustomerId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create Stripe checkout session");
  }

  return response.json();
}

export async function fetchStripeInvoices(stripeCustomerId) {
  if (!stripeCustomerId) {
    throw new Error("Customer ID not available");
  }

  const response = await fetch(`/api/stripe/invoices?customer_id=${encodeURIComponent(stripeCustomerId)}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch invoices");
  }
  return response.json();
}
