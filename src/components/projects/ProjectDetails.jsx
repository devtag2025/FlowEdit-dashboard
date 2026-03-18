"use client";
import { useState, useEffect } from "react";
import { FolderOpen, Check, X, ExternalLink } from "lucide-react";
import { fetchClientBranding } from "@/lib/queries/branding";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function BrandKitSection({ clientId }) {
  const [branding, setBranding] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;
    fetchClientBranding(clientId)
      .then(setBranding)
      .catch(() => setBranding(null))
      .finally(() => setLoading(false));
  }, [clientId]);

  if (loading) {
    return (
      <div className="mb-6 p-4 bg-primary/5 rounded-lg">
        <p className="text-sm text-accent/50">Loading brand kit...</p>
      </div>
    );
  }

  if (!branding) {
    return (
      <div className="mb-6 p-4 bg-amber-50 rounded-lg">
        <p className="text-sm text-amber-700">
          Branding is enabled but no brand kit has been saved yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6 p-5 bg-primary/5 rounded-xl border border-primary/10 space-y-5">
      <h4 className="text-xs font-bold text-primary uppercase tracking-widest">
        Client Brand Kit
      </h4>

      {/* Logos */}
      {(branding.logos?.primary?.length > 0 || branding.logos?.secondary?.length > 0) && (
        <div>
          <p className="text-[10px] text-accent/50 uppercase font-semibold mb-2">Logos</p>
          <div className="flex gap-3 flex-wrap">
            {[...(branding.logos.primary || []), ...(branding.logos.secondary || [])].map((url) => (
              <div key={url} className="bg-white rounded-lg p-2 border border-slate-200">
                <img src={url} alt="Logo" className="h-12 object-contain" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Colors */}
      {branding.colors?.length > 0 && (
        <div>
          <p className="text-[10px] text-accent/50 uppercase font-semibold mb-2">Brand Colors</p>
          <div className="flex gap-2 flex-wrap">
            {branding.colors.map((color) => (
              <div key={color} className="flex items-center gap-1.5">
                <div
                  className="w-6 h-6 rounded-md border border-slate-200"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs font-mono text-accent/60 uppercase">{color}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fonts */}
      {(branding.heading_font || branding.body_font) && (
        <div>
          <p className="text-[10px] text-accent/50 uppercase font-semibold mb-2">Fonts</p>
          <div className="grid grid-cols-2 gap-3">
            {branding.heading_font && (
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <p className="text-[10px] text-accent/40 uppercase mb-1">Heading</p>
                <p className="text-sm font-semibold text-accent" style={{ fontFamily: branding.heading_font }}>
                  {branding.heading_font}
                </p>
              </div>
            )}
            {branding.body_font && (
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <p className="text-[10px] text-accent/40 uppercase mb-1">Body</p>
                <p className="text-sm text-accent" style={{ fontFamily: branding.body_font }}>
                  {branding.body_font}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Brand Voice */}
      {branding.brand_voice && (
        <div>
          <p className="text-[10px] text-accent/50 uppercase font-semibold mb-2">Brand Voice</p>
          <p className="text-sm text-gray-700 leading-relaxed">{branding.brand_voice}</p>
        </div>
      )}

      {/* Graphic Assets */}
      {branding.graphic_assets?.length > 0 && (
        <div>
          <p className="text-[10px] text-accent/50 uppercase font-semibold mb-2">Graphic Assets</p>
          <div className="flex gap-2 flex-wrap">
            {branding.graphic_assets.map((url) => (
              <div key={url} className="w-16 h-16 rounded-lg border border-slate-200 overflow-hidden bg-white">
                <img src={url} alt="Asset" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guidelines */}
      {(branding.guidelines_url || branding.guidelines_pdf_url) && (
        <div>
          <p className="text-[10px] text-accent/50 uppercase font-semibold mb-2">Brand Guidelines</p>
          <div className="flex gap-3 flex-wrap">
            {branding.guidelines_url && (
              <a
                href={branding.guidelines_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
              >
                Brand Website <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {branding.guidelines_pdf_url && (
              <a
                href={branding.guidelines_pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
              >
                Brand Guide PDF <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectDetails({ project }) {
  if (!project) return null;

  const cloudLink = project.asset_links?.[0];

  return (
    <div className="pt-4 mt-4 space-y-3">
      <div className="relative animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="relative bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-bold text-accent mb-6 flex items-center gap-2">
            Full Project Details
          </h3>

          {project.style_preferences && (
            <div className="mb-6 p-4 bg-gray-50/50 rounded-lg">
              <h4 className="text-xs font-bold text-accent/60 mb-2 uppercase tracking-widest">
                Editing Instructions
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {project.style_preferences}
              </p>
            </div>
          )}

          <div className="mb-6 p-4 bg-gray-200 rounded-lg">
            <div className="flex items-center gap-2">
              {project.apply_branding ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <X className="w-4 h-4 text-gray-400" />
              )}
              <h4 className="text-xs font-bold text-accent/60 uppercase tracking-widest">
                Apply my branding template to this project
              </h4>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mt-1">
              {project.apply_branding
                ? "Your saved brand colors, fonts, logos, and preferred editing style will be automatically applied to this video."
                : "Branding template is not applied to this project."}
            </p>
          </div>

          {/* Brand Kit — shown when apply_branding is true */}
          {project.apply_branding && (
            <BrandKitSection clientId={project.client_id} />
          )}

          {cloudLink && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <h4 className="text-xs font-bold text-accent/60 uppercase tracking-widest">
                  Cloud Folder Link
                </h4>
              </div>
              <a
                href={cloudLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-3 font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] cursor-pointer"
              >
                <FolderOpen className="w-4 h-4" /> Open Folder
              </a>
              <p className="text-[11px] text-gray-500 mt-2 italic text-center">
                Contains all raw footage, scripts, images, and assets.
              </p>
            </div>
          )}

          {project.additional_notes && (
            <div className="mb-6 p-4 bg-gray-50/50 rounded-lg">
              <h4 className="text-xs font-bold text-accent/60 mb-2 uppercase tracking-widest">
                Additional Notes
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {project.additional_notes}
              </p>
            </div>
          )}

          <div className="pt-6 border-t border-gray-100">
            <h4 className="text-xs font-bold text-accent/60 mb-4 uppercase tracking-widest">
              Project Metadata
            </h4>
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">
                  Platform
                </p>
                <p className="text-sm font-bold text-accent capitalize">
                  {project.platform || "—"}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">
                  Submission Date
                </p>
                <p className="text-sm font-bold text-accent">
                  {formatDate(project.created_at)}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">
                  Video Length
                </p>
                <p className="text-sm font-bold text-accent">
                  {project.desired_length || "—"}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">
                  Priority
                </p>
                <p className="text-sm font-bold text-accent capitalize">
                  {project.priority || "Medium"}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">
                  Deadline
                </p>
                <p className="text-sm font-bold text-accent">
                  {formatDate(project.deadline)}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">
                  Versions
                </p>
                <p className="text-sm font-bold text-accent">
                  {project.versions?.length || 0} version{project.versions?.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
