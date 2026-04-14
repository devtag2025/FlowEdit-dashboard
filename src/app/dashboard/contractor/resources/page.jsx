"use client";
import AccessTools from "@/components/resources/AccessTools";
import LearningCatalog from "@/components/resources/LearningCatalog";
import OnboardingSteps from "@/components/resources/OnboardingSteps";
import Policies from "@/components/resources/Policies";
import TabNavigation from "@/components/common/TabNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { fetchOnboardingSteps, fetchPolicies } from "@/lib/queries/earnings"; // ✅ from DB
import Loader from "@/components/common/Loader";
import React, { useState, useEffect } from "react";

const Resources = () => {
  const [activeTab, setActiveTab]         = useState("access");
  const [steps, setSteps]                 = useState([]);
  const [policies, setPolicies]           = useState([]);
  const [loadingSteps, setLoadingSteps]   = useState(true);
  const [loadingPolicies, setLoadingPolicies] = useState(false);

  // ✅ Fetch onboarding steps from DB on mount
  useEffect(() => {
    fetchOnboardingSteps()
      .then(setSteps)
      .catch((err) => console.error("Failed to load onboarding steps:", err))
      .finally(() => setLoadingSteps(false));
  }, []);

  // ✅ Fetch policies from DB when that tab is selected
  useEffect(() => {
    if (activeTab !== "policy") return;
    setLoadingPolicies(true);
    fetchPolicies()
      .then(setPolicies)
      .catch((err) => console.error("Failed to load policies:", err))
      .finally(() => setLoadingPolicies(false));
  }, [activeTab]);

  return (
    <main className="min-h-screen bg-secondary px-4 py-5 pb-4 space-y-8">

      {/* Onboarding Progress */}
      <Card className="bg-tertiary">
        <CardContent>
          <h1 className="text-accent font-semibold md:font-bold text-xl md:text-3xl mb-2">
            Onboarding Progress
          </h1>
          {loadingSteps ? (
            <div className="flex justify-center py-6">
              <Loader />
            </div>
          ) : (
            <OnboardingSteps steps={steps} /> // ✅ real data from DB
          )}
        </CardContent>
      </Card>

      <TabNavigation
        tabs={[
          { label: "Access & Tools", value: "access" },
          { label: "Learning Catalog", value: "catalog" },
          { label: "Policies", value: "policy" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        buttonClassName="text-xs"
      />

      {activeTab === "access" && <AccessTools />}
      {activeTab === "catalog" && <LearningCatalog />}
      {activeTab === "policy" && (
        loadingPolicies ? (
          <div className="flex justify-center py-10">
            <Loader />
          </div>
        ) : (
          <Policies policies={policies} /> // ✅ real data from DB
        )
      )}
    </main>
  );
};

export default Resources;
