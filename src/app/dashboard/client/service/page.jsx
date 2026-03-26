"use client";
import CTA from "@/components/service/CTA";
import Invoice from "@/components/service/Invoice";
import PaymentDetail from "@/components/service/PaymentDetail";
import PlanCards from "@/components/service/PlanCards";
import TabNavigation from "@/components/common/TabNavigation";
import { useState, useEffect } from "react";
import { fetchUserProfile } from "@/lib/queries/projects";

export default function ServicePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setProfile(userProfile);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

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

        <TabNavigation
          tabs={[
            { label: "Overview", value: "overview" },
            { label: "Invoices", value: "invoices" },
            { label: "Payment", value: "payment" },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          containerClassName="border border-tertiary md:bg-tertiary w-5xl"
          buttonClassName="text-accent text-lg font-semibold md:px-6"
        />

        {activeTab === "overview" && <PlanCards profile={profile} />}
        {activeTab === "invoices" && <Invoice customerId={profile?.stripe_customer_id} />}
        {activeTab === "payment" && <PaymentDetail profile={profile} />}

        <CTA />
      </main>
    </>
  );
}
