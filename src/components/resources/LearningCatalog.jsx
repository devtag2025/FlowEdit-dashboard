"use client";

import { useState } from "react";
import EmptyCatalog from "./EmptyCatalog";
import CatalogSidebar from "./CatalogSidebar";
import { catalogData } from "@/utils/catalog";
import VideoCard from "../common/VideoCard";

const tabs = [
  {
    label: "Getting Started",
    value: "started",
  },
  {
    label: "Editing Standards",
    value: "editing",
  },
  {
    label: "File Naming & Exports",
    value: "naming",
  },
  {
    label: "Revisions & Feedback",
    value: "revision",
  },
];

const LearningCatalog = () => {
  const [activeTab, setActiveTab] = useState("started");
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = catalogData[activeTab];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-accent">Learning Catalog</h2>

      <div className="lg:grid lg:grid-cols-12 pb-4 bg-tertiary/80 rounded-2xl">
        <div className="lg:col-span-8 px-5 py-3">
          <div className="flex justify-between py-2 border-b border-accent/30">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab.value);
                  setSelectedCard(null);
                }}
                className={`relative text-sm md:text-base font-medium cursor-pointer pb-2 transition-all duration-300 ${
                  activeTab === tab.value
                    ? "text-accent font-bold border-b-4 border-primary rounded"
                    : "text-accent/70 border-b-2 border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 p-2 mt-2">
            {cards.map((card) => (
              <VideoCard
                key={card.id}
                {...card}
                onClick={() => setSelectedCard(card)}
              />
            ))}
          </div>
        </div>

        {selectedCard ? (
          <CatalogSidebar
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
          />
        ) : (
          <EmptyCatalog />
        )}
      </div>
    </div>
  );
};

export default LearningCatalog;
