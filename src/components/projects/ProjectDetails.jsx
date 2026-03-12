import { FolderOpen, Check, X } from "lucide-react";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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
