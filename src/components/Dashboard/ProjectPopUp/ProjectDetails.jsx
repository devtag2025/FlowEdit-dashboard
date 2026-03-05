import { useState } from 'react';
import { ChevronDown, ChevronUp, FolderOpen, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProjectDetailsSection() {
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  return (
    <div className="pt-4 mt-4 space-y-3">
      <Button
        variant="ghost"
        onClick={() => setShowProjectDetails(!showProjectDetails)}
        className="text-[#6a4dff] hover:bg-[#e8e3f8] w-full flex items-center justify-between transition-colors duration-200"
      >
        <span className="font-semibold">
          {showProjectDetails ? 'Hide Project Details' : 'See Project Details'}
        </span>
        {showProjectDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>

      {showProjectDetails && (
        <div className="relative animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="relative bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-xl font-bold text-[#2d1b69] mb-6 flex items-center gap-2">
              Full Project Details
            </h3>

            <div className="mb-6 p-4 bg-gray-50/50 rounded-lg">
              <h4 className="text-xs font-bold text-[#2d1b69]/60 mb-2 uppercase tracking-widest">
                Editing Instructions
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Upbeat summer vibes, fast cuts, use the provided logo overlay. Add subtle color grading to enhance warm tones. Include transitions between product shots.
              </p>
            </div>

            <div className="mb-6 p-4 bg-gray-50/50 rounded-lg">
              <h4 className="text-xs font-bold text-[#2d1b69]/60 mb-2 uppercase tracking-widest">
                Branding Elements
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Brand colors, logos, fonts, or previous editing styles to follow. These settings come from the client's account-level branding preferences.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <h4 className="text-xs font-bold text-[#2d1b69]/60 uppercase tracking-widest">
                  Cloud Folder Link
                </h4>
                <span className="px-2 py-0.5 bg-[#6a4dff] text-white text-[10px] font-bold rounded uppercase">
                  Required
                </span>
              </div>
              <button className="w-full bg-[#6a4dff] hover:bg-[#2d1b69] text-white rounded-lg px-4 py-3 font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]">
                <FolderOpen className="w-4 h-4" /> Open Folder
              </button>
              <p className="text-[11px] text-gray-500 mt-2 italic text-center">
                Contains all raw footage, scripts, images, and assets.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <h4 className="text-xs font-bold text-[#2d1b69]/60 uppercase tracking-widest">
                  Direct Uploads
                </h4>
                <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-[10px] font-bold rounded uppercase">
                  Optional
                </span>
              </div>
              <button className="w-full border-2 border-[#6a4dff] text-[#6a4dff] hover:bg-[#e8e3f8] rounded-lg px-4 py-3 font-medium text-sm flex items-center justify-center gap-2 transition-all">
                <Upload className="w-4 h-4" /> Upload Files
              </button>
              <div className="mt-3 p-4 bg-white border border-dashed border-gray-300 rounded-lg text-center">
                <p className="text-xs text-gray-400 italic">Uploaded files will appear here</p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h4 className="text-xs font-bold text-[#2d1b69]/60 mb-4 uppercase tracking-widest">
                Project Metadata
              </h4>
              <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Platform</p>
                  <p className="text-sm font-bold text-[#2d1b69]">Instagram Reels</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Submission Date</p>
                  <p className="text-sm font-bold text-[#2d1b69]">Oct 25, 2025</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Video Length</p>
                  <p className="text-sm font-bold text-[#2d1b69]">30–60 seconds</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Revision Count</p>
                  <p className="text-sm font-bold text-[#2d1b69]">2 Revisions</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Aspect Ratio</p>
                  <p className="text-sm font-bold text-[#2d1b69]">9:16</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}