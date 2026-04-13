import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

export function getStripe() {
  if (!stripePromise) {
    if (!process.env.STRIPE_PUBLISHABLE_KEY) {
      throw new Error("STRIPE_PUBLISHABLE_KEY is not defined");
    }
    stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
}

export const STRIPE_PRICE_IDS = {
  starter: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER,
  pro: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
  agency: process.env.NEXT_PUBLIC_STRIPE_PRICE_AGENCY,
};

export const getPlanNameFromPriceId = (priceId) => {
  return Object.entries(STRIPE_PRICE_IDS).find(([plan, id]) => id === priceId)?.[0] || null;
};
