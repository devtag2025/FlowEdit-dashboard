"use client";
import React, { useState, useEffect } from "react";
import BrandVoiceSection from "@/components/branding/BrandVoiceSection";
import ColorSection from "@/components/branding/ColorSection";
import FontSection from "@/components/branding/FontSection";
import GraphicAssetSection from "@/components/branding/GraphicAssetSection";
import GuidelineSection from "@/components/branding/GuidelineSection";
import LogoSection from "@/components/branding/LogoSection";
import { Loader2, Check } from "lucide-react";
import {
  fetchClientBranding,
  upsertClientBranding,
  uploadBrandingFile,
  deleteBrandingFile,
} from "@/lib/queries/branding";
import { fetchUserProfile } from "@/lib/queries/projects";
import Loader from "@/components/common/Loader";

const DEFAULT_BRANDING = {
  logos: { primary: [], secondary: [] },
  colors: [],
  heading_font: "Inter",
  body_font: "Inter",
  brand_voice: "",
  graphic_assets: [],
  guidelines_url: "",
  guidelines_pdf_url: "",
};

const BrandingPage = () => {
  const [profile, setProfile] = useState(null);
  const [branding, setBranding] = useState(DEFAULT_BRANDING);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingAsset, setUploadingAsset] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const userProfile = await fetchUserProfile();
        setProfile(userProfile);
        if (userProfile) {
          const data = await fetchClientBranding(userProfile.id);
          if (data) {
            setBranding({
              logos: data.logos || DEFAULT_BRANDING.logos,
              colors: data.colors || [],
              heading_font: data.heading_font || "Inter",
              body_font: data.body_font || "Inter",
              brand_voice: data.brand_voice || "",
              graphic_assets: data.graphic_assets || [],
              guidelines_url: data.guidelines_url || "",
              guidelines_pdf_url: data.guidelines_pdf_url || "",
            });
          }
        }
      } catch (err) {
        console.error("Failed to load branding:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      await upsertClientBranding(profile.id, branding);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to save branding:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setBranding(DEFAULT_BRANDING);
  };

  // ─── Logo handlers ───
  const handleLogoUpload = async (type, file) => {
    if (!profile) return;
    setUploadingLogo(true);
    try {
      const url = await uploadBrandingFile(profile.id, `logos/${type}`, file);
      setBranding((prev) => ({
        ...prev,
        logos: {
          ...prev.logos,
          [type]: [...(prev.logos[type] || []), url],
        },
      }));
    } catch (err) {
      console.error("Failed to upload logo:", err);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleLogoRemove = async (type, url) => {
    try {
      await deleteBrandingFile(url);
      setBranding((prev) => ({
        ...prev,
        logos: {
          ...prev.logos,
          [type]: prev.logos[type].filter((u) => u !== url),
        },
      }));
    } catch (err) {
      console.error("Failed to delete logo:", err);
    }
  };

  // ─── Graphic asset handlers ───
  const handleAssetUpload = async (file) => {
    if (!profile) return;
    setUploadingAsset(true);
    try {
      const url = await uploadBrandingFile(profile.id, "assets", file);
      setBranding((prev) => ({
        ...prev,
        graphic_assets: [...prev.graphic_assets, url],
      }));
    } catch (err) {
      console.error("Failed to upload asset:", err);
    } finally {
      setUploadingAsset(false);
    }
  };

  const handleAssetRemove = async (url) => {
    try {
      await deleteBrandingFile(url);
      setBranding((prev) => ({
        ...prev,
        graphic_assets: prev.graphic_assets.filter((u) => u !== url),
      }));
    } catch (err) {
      console.error("Failed to delete asset:", err);
    }
  };

  // ─── PDF handler ───
  const handlePdfUpload = async (file) => {
    if (!profile) return;
    setUploadingPdf(true);
    try {
      const url = await uploadBrandingFile(profile.id, "guidelines", file);
      setBranding((prev) => ({ ...prev, guidelines_pdf_url: url }));
    } catch (err) {
      console.error("Failed to upload PDF:", err);
    } finally {
      setUploadingPdf(false);
    }
  };

  const handlePdfRemove = async () => {
    if (branding.guidelines_pdf_url) {
      try {
        await deleteBrandingFile(branding.guidelines_pdf_url);
        setBranding((prev) => ({ ...prev, guidelines_pdf_url: "" }));
      } catch (err) {
        console.error("Failed to delete PDF:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader />
      </div>
    );
  }

  return (
    <main className="bg-secondary px-4 md:px-8 py-5 pb-10">
      <header className="mb-6">
        <h1 className="text-accent font-semibold text-2xl md:text-3xl mb-2">
          Branding
        </h1>
        <p className="text-accent text-sm md:text-base">
          Manage the brand elements applied across all your projects.
        </p>
      </header>

      <section className="flex flex-col space-y-5">
        <LogoSection
          logos={branding.logos}
          onUpload={handleLogoUpload}
          onRemove={handleLogoRemove}
          uploading={uploadingLogo}
        />

        <ColorSection
          colors={branding.colors}
          onChange={(colors) => setBranding((prev) => ({ ...prev, colors }))}
        />

        <FontSection
          headingFont={branding.heading_font}
          bodyFont={branding.body_font}
          onHeadingChange={(font) => setBranding((prev) => ({ ...prev, heading_font: font }))}
          onBodyChange={(font) => setBranding((prev) => ({ ...prev, body_font: font }))}
        />

        <BrandVoiceSection
          value={branding.brand_voice}
          onChange={(value) => setBranding((prev) => ({ ...prev, brand_voice: value }))}
        />

        <GraphicAssetSection
          assets={branding.graphic_assets}
          onUpload={handleAssetUpload}
          onRemove={handleAssetRemove}
          uploading={uploadingAsset}
        />

        <GuidelineSection
          guidelinesUrl={branding.guidelines_url}
          guidelinesPdfUrl={branding.guidelines_pdf_url}
          onUrlChange={(url) => setBranding((prev) => ({ ...prev, guidelines_url: url }))}
          onPdfUpload={handlePdfUpload}
          onPdfRemove={handlePdfRemove}
          uploading={uploadingPdf}
        />

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleReset}
            className="text-xs md:text-base text-primary font-bold hover:underline cursor-pointer"
          >
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-xs md:text-base bg-primary px-6 py-3 rounded-lg text-white shadow-lg font-semibold hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved!
              </>
            ) : (
              "Save Brand Settings"
            )}
          </button>
        </div>
      </section>
    </main>
  );
};

export default BrandingPage;
