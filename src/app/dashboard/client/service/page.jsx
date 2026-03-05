"use client";
import CTA from "@/components/service/CTA";
import Invoice from "@/components/service/Invoice";
import PaymentDetail from "@/components/service/PaymentDetail";
import PlanCards from "@/components/service/PlanCards";
import TabNavigation from "@/components/service/TabNavigation";
import { useState } from "react";

export default function ServicePage() {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <>
      <main className="min-h-screen bg-secondary px-3 md:px-8 py-5 pb-4">
        <header className="mb-10">
          <h1 className="text-accent font-semibold text-2xl md:text-3xl mb-2">
            Services & Billing
          </h1>
          <p className="text-accent text-sm md:text-base">
            Manage your subscription, view invoices, and update payment details.
          </p>
        </header>

        <TabNavigation activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "overview" && <PlanCards />}
        {activeTab === "invoices" && <Invoice />}
        {activeTab === "payment" && <PaymentDetail />}

        <CTA />
      </main>
    </>
  );
}
