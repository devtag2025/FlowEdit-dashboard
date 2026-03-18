"use client";
import React, { useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { FileText, X, Loader2, ExternalLink } from "lucide-react";

const GuidelineSection = ({ guidelinesUrl, guidelinesPdfUrl, onUrlChange, onPdfUpload, onPdfRemove, uploading }) => {
  const fileRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await onPdfUpload(file);
    e.target.value = "";
  };

  return (
    <Card className="bg-tertiary rounded-2xl">
      <CardContent className="flex flex-col gap-5">
        <header>
          <h3 className="text-xl md:text-2xl text-accent font-semibold mb-2">
            Brand Guidelines
          </h3>
          <p className="font-medium text-slate-600 text-xs md:text-base">
            Upload your existing brand book or brand guides.
          </p>
        </header>

        <div className="flex flex-col space-y-4">
          <h4 className="text-accent text-sm md:text-base font-semibold">
            Brand Website or Guide URL
          </h4>
          <input
            type="text"
            placeholder="https://yourbrand.com/guidelines"
            value={guidelinesUrl || ""}
            onChange={(e) => onUrlChange(e.target.value)}
            className="w-full rounded-lg bg-white p-4 focus:outline-none text-xs md:text-base"
          />

          <h4 className="text-accent font-semibold text-sm md:text-base">
            Upload Brand Guide PDF
          </h4>

          <input
            ref={fileRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          {guidelinesPdfUrl ? (
            <div className="flex items-center gap-3 bg-white rounded-lg p-4 border border-slate-200">
              <FileText className="text-primary w-5 h-5 shrink-0" />
              <a
                href={guidelinesPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline truncate flex-1"
              >
                Brand Guide PDF
                <ExternalLink className="w-3 h-3 inline ml-1" />
              </a>
              <button
                onClick={onPdfRemove}
                className="text-red-500 hover:text-red-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="flex items-center px-3 py-2 gap-2 bg-pink-200 rounded-lg font-bold text-blue-500 text-xs md:text-base cursor-pointer disabled:opacity-50"
              >
                {uploading ? (
                  <Loader2 className="text-purple-500 w-3 h-3 md:w-4 md:h-4 animate-spin" />
                ) : (
                  <FileText className="text-purple-500 w-3 h-3 md:w-4 md:h-4" />
                )}
                {uploading ? "Uploading..." : "Upload Files"}
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GuidelineSection;
