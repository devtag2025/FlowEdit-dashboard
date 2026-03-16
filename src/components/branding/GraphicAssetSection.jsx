"use client";
import React, { useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { Upload, X, Loader2 } from "lucide-react";

const GraphicAssetSection = ({ assets, onUpload, onRemove, uploading }) => {
  const fileRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await onUpload(file);
    e.target.value = "";
  };

  return (
    <Card className="bg-tertiary rounded-2xl">
      <CardContent className="flex flex-col gap-5">
        <header>
          <h3 className="text-xl md:text-2xl text-accent font-semibold mb-2">
            Graphic Assets
          </h3>
          <p className="font-medium text-slate-600 text-xs md:text-base">
            Upload images, patterns, icons, or other visual essentials used in
            your projects.
          </p>
        </header>

        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg font-bold text-white shadow-lg text-xs md:text-base cursor-pointer disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
            ) : (
              <Upload className="w-3 h-3 md:w-4 md:h-4" />
            )}
            {uploading ? "Uploading..." : "Upload Assets"}
          </button>
        </div>

        <div className="flex gap-2 md:gap-4 flex-wrap">
          {assets.length > 0 ? (
            assets.map((url) => (
              <div key={url} className="relative group">
                <div className="w-20 md:w-35 aspect-square rounded-lg border md:border-2 border-slate-200 bg-white overflow-hidden">
                  <img src={url} alt="Asset" className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => onRemove(url)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))
          ) : (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-20 md:w-35 aspect-square rounded-lg border md:border-2 border-dashed border-slate-300 bg-white/60 flex items-center justify-center hover:border-primary transition"
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GraphicAssetSection;
