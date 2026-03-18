"use client";
import Payout from "@/components/earnings/Payout";
import TabNavigation from "@/components/common/TabNavigation";
import WalletSection from "@/components/earnings/WalletSection";

import { useState } from "react";

export default function Earnings() {
  const [activeTab, setActiveTab] = useState("payout");
  return (
    <>
      <main className="min-h-screen bg-secondary px-3 md:px-8 py-5 pb-4">
        <TabNavigation
          tabs={[
            { label: "Payouts", value: "payout" },
            { label: "Wallet", value: "wallet" },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === "payout" && <Payout />}
        {activeTab === "wallet" && <WalletSection />}
      </main>
    </>
  );
}
