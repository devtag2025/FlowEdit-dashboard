"use client";
import BrandVoiceSection from "@/components/branding/BrandVoiceSection";
import ColorSection from "@/components/branding/ColorSection";
import FontSection from "@/components/branding/FontSection";
import GraphicAssetSection from "@/components/branding/GraphicAssetSection";
import GuidelineSection from "@/components/branding/GuidelineSection";
import LogoSection from "@/components/branding/LogoSection";
import { Button } from "@/components/common/Button";
import React from "react";

const BrandingPage = () => {
  return (
    <main className="min-h-screen bg-secondary px-4 md:px-8 py-5 pb-10 ">
      <header className="mb-6">
        <h1 className="text-accent font-semibold text-2xl md:text-3xl mb-2">
          Branding
        </h1>
        <p className="text-accent text-sm md:text-base">
          Manage the brand elements applied across all your projects.
        </p>
      </header>

      <section className="flex flex-col space-y-5">
        <LogoSection />
        <ColorSection />
        <FontSection />
        <BrandVoiceSection />
        <GraphicAssetSection />
        <GuidelineSection />

        <div className="flex justify-between items-center mt-4">
          <Button className="text-xs md:text-base text-primary font-bold hover:underline">
            Reset to Defaults
          </Button>
          <Button className="text-xs md:text-base bg-primary px-4 py-3 rounded-lg text-white shadow-lg">
            Save Brand Settings
          </Button>
        </div>
      </section>
    </main>
  );
};

export default BrandingPage;
