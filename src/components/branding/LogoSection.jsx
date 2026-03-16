"use client";
import React, { useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { Image, X, Loader2 } from "lucide-react";

const LogoSection = ({ logos, onUpload, onRemove, uploading }) => {
  const primaryRef = useRef(null);
  const secondaryRef = useRef(null);

  const handleFileChange = async (type, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await onUpload(type, file);
    e.target.value = "";
  };

  return (
    <Card className="bg-tertiary rounded-2xl">
      <CardContent className="flex flex-col gap-5">
        <header>
          <h3 className="text-xl md:text-2xl text-accent font-semibold mb-2">
            Logos
          </h3>
          <p className="font-medium text-slate-600 text-xs md:text-base">
            Upload your logo files in all orientations. These are your primary
            all-purpose visuals.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          {/* Primary Logos */}
          <div>
            <input
              ref={primaryRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange("primary", e)}
            />
            {logos.primary?.length > 0 ? (
              <div className="space-y-3">
                {logos.primary.map((url) => (
                  <div key={url} className="relative group bg-white rounded-xl p-4 border border-slate-200">
                    <img src={url} alt="Primary logo" className="max-h-32 mx-auto object-contain" />
                    <button
                      onClick={() => onRemove("primary", url)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => primaryRef.current?.click()}
                  disabled={uploading}
                  className="w-full border-dashed border-2 border-slate-300 rounded-xl py-4 text-slate-500 hover:border-primary hover:text-primary transition text-sm cursor-pointer"
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "+ Add Another"}
                </button>
              </div>
            ) : (
              <div
                onClick={() => !uploading && primaryRef.current?.click()}
                className="border-slate-300 border-dashed border md:border-2 rounded-lg md:rounded-xl bg-white py-8 px-10 md:px-20 md:py-18 hover:border-primary transition cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  {uploading ? (
                    <Loader2 className="text-primary md:h-8 w-8 animate-spin" />
                  ) : (
                    <Image className="text-slate-400 md:h-8 w-8" />
                  )}
                  <h5 className="text-accent font-semibold md:text-xl text-base">Primary Logos</h5>
                  <span className="text-slate-600 font-medium text-sm">Click to upload</span>
                </div>
              </div>
            )}
          </div>

          {/* Secondary Logos */}
          <div>
            <input
              ref={secondaryRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange("secondary", e)}
            />
            {logos.secondary?.length > 0 ? (
              <div className="space-y-3">
                {logos.secondary.map((url) => (
                  <div key={url} className="relative group bg-white rounded-xl p-4 border border-slate-200">
                    <img src={url} alt="Secondary logo" className="max-h-32 mx-auto object-contain" />
                    <button
                      onClick={() => onRemove("secondary", url)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => secondaryRef.current?.click()}
                  disabled={uploading}
                  className="w-full border-dashed border-2 border-slate-300 rounded-xl py-4 text-slate-500 hover:border-primary hover:text-primary transition text-sm cursor-pointer"
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "+ Add Another"}
                </button>
              </div>
            ) : (
              <div
                onClick={() => !uploading && secondaryRef.current?.click()}
                className="border-slate-300 border-dashed border md:border-2 rounded-lg md:rounded-xl bg-white py-8 px-10 md:px-20 md:py-18 hover:border-primary transition cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  {uploading ? (
                    <Loader2 className="text-primary md:h-8 w-8 animate-spin" />
                  ) : (
                    <Image className="text-slate-400 md:h-8 w-8" />
                  )}
                  <h5 className="text-accent font-semibold md:text-xl text-base">Secondary Logos</h5>
                  <span className="text-slate-600 font-medium text-sm">Click to upload</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-slate-600 text-xs text-center md:text-sm md:text-left">
          File Size: Under 25MB • PNG Recommended
        </p>
      </CardContent>
    </Card>
  );
};

export default LogoSection;
