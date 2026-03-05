"use client";
import AccessTools from "@/components/resources/AccessTools";
import LearningCatalog from "@/components/resources/LearningCatalog";
import OnboardingSteps from "@/components/resources/OnboardingSteps";
import Policies from "@/components/resources/Policies";
import TabNavigation from "@/components/resources/TabNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { onboardingSteps } from "@/utils/resource";
import React, { useState } from "react";

const Resources = () => {
  const [activeTab, setActiveTab] = useState("access");
  return (
    <main className="min-h-screen bg-secondary px-4 py-5 pb-4 space-y-8">
      <Card className="bg-tertiary">
        <CardContent>
          <h1 className="text-accent font-semibold md:font-bold text-xl md:text-3xl mb-2">
            Onboarding Progress
          </h1>
          <OnboardingSteps steps={onboardingSteps} />
        </CardContent>
      </Card>

      <TabNavigation activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "access" && <AccessTools />}
      {activeTab === "catalog" && <LearningCatalog />}
      {activeTab === "policy" && <Policies />}
    </main>
  );
};

export default Resources;
