"use client";

import PlanCard from "./PlanCard";
import { createCheckoutSession } from "@/lib/queries/billing";
import { getStripe } from "@/lib/stripe";
import { useState } from "react";

const PlanCards = ({ profile }) => {
  const [loadingPlan, setLoadingPlan] = useState(null);

  const plans = [
    {
      key: "launch",
      title: "Launch",
      price: "$ 0",
      description: "Get started for free.",
      features: ["1 video per month", "72h Turnaround", "Basic stock footage", "No revisions"],
      buttonText: "Select Launch",
      highlighted: !profile?.subscription_plan || profile?.subscription_plan === "launch",
    },
    {
      key: "starter",
      title: "Starter",
      price: "$ 499",
      description: "Perfect for individuals.",
      features: ["2 videos per month", "48h Turnaround", "Stock Footage included", "1 Revision round"],
      buttonText: "Upgrade to Starter",
      highlighted: profile?.subscription_plan === "starter",
    },
    {
      key: "pro",
      title: "Pro",
      price: "$ 999",
      description: "Great for growing brands.",
      features: ["8 videos per month", "24h Turnaround", "Premium Stock Assets", "Unlimited Revisions", "Dedicated Editor"],
      buttonText: "Upgrade to Pro",
      highlighted: profile?.subscription_plan === "pro",
    },
    {
      key: "agency",
      title: "Agency",
      price: "$ 2499",
      description: "For high-volume teams.",
      features: ["20 videos per month", "Priority Support", "Custom Motion Graphics", "Stack Integration", "White-labeling"],
      buttonText: "Upgrade to Agency",
      highlighted: profile?.subscription_plan === "agency",
    },
  ];

  const handleSubscribe = async (plan) => {
    if (!profile?.id) {
      alert("Please sign in before upgrading your plan.");
      return;
    }

    try {
      setLoadingPlan(plan);
      const payload = await createCheckoutSession(plan, profile.id, profile.stripe_customer_id);
      const url = payload?.url;
      const sessionId = payload?.id;

      if (url) {
        window.location.href = url;
        return;
      }

      if (!sessionId) {
        throw new Error("Checkout session did not return a URL or session ID.");
      }

      const stripe = await getStripe();
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result?.error) {
        throw new Error(result.error.message);
      }
    } catch (err) {
      console.error("Failed to start checkout", err);
      alert(`Checkout initialization failed: ${err?.message ?? err}`);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <>
      <section className="text-center my-10">
        <h2 className="text-accent text-xl font-bold md:text-2xl md:font-semibold mb-2">
          Simple, transparent pricing
        </h2>
        <p className="text-accent text-sm md:text-base md:text-slate-600">
          Choose the plan that best fits your content needs. All plans include
          professional editing and fast delivery.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 max-w-5xl mx-auto my-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.key}
            plan={{
              ...plan,
              buttonText:
                profile?.subscription_plan === plan.key ? "Current Plan" : plan.buttonText,
              buttonDisabled: profile?.subscription_plan === plan.key || loadingPlan,
              onClick: () => handleSubscribe(plan.key),
            }}
          />
        ))}
      </div>
    </>
  );
};

export default PlanCards;
