"use client";
import React, { useState } from "react";
import { Play, ArrowLeft, MoveRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectDetails from "./ProjectDetails";
import { Card, CardContent } from "../ui/card";
import { projects as clientProjects } from "@/utils/dashboard-client";
import { projects as adminProjects } from "@/utils/dashboard-admin";
import { projects as contractorProjects } from "@/utils/dashboard-contractor";
import Link from "next/link";
import { usePathname } from "next/navigation";

const projectsByRole = {
  client: clientProjects,
  admin: adminProjects,
  contractor: contractorProjects,
};
import ProjectComments from "./ProjectComments";
import ProjectApprovePopup from "./ProjectApprovePopup";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function ProjectSection({ projectId }) {
  const pathname = usePathname();
  const role = pathname.split("/")[2]; // "client" | "admin" | "contractor"
  const projects = projectsByRole[role] || clientProjects;
  const [showDetails, setShowDetails] = useState(false);
  const [isRevising, setIsRevising] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const project = projects.find((p) => String(p.id) === String(projectId));

  const handleRevise = () => {
    setIsRevising(true);
    setTimeout(() => {
      setIsRevising(false);
    }, 2000);
  };

  if (!project) {
    return (
      <div className="p-10 text-center text-accent/60">Project not found</div>
    );
  }

  return (
    <Card className="bg-white rounded-3xl">
      <CardContent className="md:px-10 md:py-8">
        <div className="flex flex-col items-start justify-center gap-5">
          <Link href={`/dashboard/${role}`}>
            <span className="flex items-center text-slate-500 text-sm md:text-lg">
              <ArrowLeft className="w-4 h-4 mt-1 mr-1" /> Back to Dashboard
            </span>
          </Link>

          <h2 className="text-xl md:text-4xl font-semibold my-2">
            {project.name}
          </h2>

          <div className="flex items-center gap-3">
            <span className="bg-slate-200 text-xs md:text-sm border rounded-full px-4 py-1 font-bold">
              {project.platform}
            </span>
            <Badge className="bg-slate-200 text-primary text-xs md:text-sm border px-4 py-1">
              {project.status}
            </Badge>
            <span className="text-xs md:text-sm">
              Updated on {project.lastUpdated}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 h-full">
          <div className="p-3 md:p-6 space-y-4 overflow-hidden">
            <div className="aspect-video bg-slate-black rounded-xl md:rounded-2xl flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/80" />
              <div className="relative z-10 text-center">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-white backdrop-blur rounded-full flex items-center justify-center mb-3 mx-auto cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 md:w-8 md:h-8 ml-1" />
                </div>
                <p className="text-white/80 text-xs md:text-sm">
                  Video preview coming soon
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              <span className="text-sm md:text-lg font-semibold">
                Video Project Version: 5
              </span>
              <TooltipProvider delayDuration={200}>
                <div className="flex gap-2">
                  {isApproved ? (
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2 text-[#22C55E] font-bold text-sm md:text-xl">
                        <Check className="w-5 h-5" /> Approved
                      </div>
                      <p className="text-[10px] text-xs md:text-sm text-slate-600">
                        Final files are available in your Cloud Folder
                      </p>
                      <button className="text-primary font-bold text-xs md:text-sm hover:underline cursor-pointer">
                        Open Cloud Folder →
                      </button>
                    </div>
                  ) : (
                    <>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="lg"
                            className={`border md:rounded-xl md:px-5 md:py-6 transition text-xs md:text-base ${
                              isRevising
                                ? "bg-gray-200 text-gray-600 border-gray-600 cursor-not-allowed"
                                : "text-primary border-primary cursor-pointer"
                            }`}
                            disabled={isRevising}
                            onClick={handleRevise}
                          >
                            {isRevising ? "Submitted" : "Revise"}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          align="center"
                          className="max-w-xs text-xs"
                        >
                          Request Changes & send feedback to the editor
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="lg"
                            className="text-white text-xs md:text-base bg-primary md:px-5 md:py-6 md:rounded-xl gap-2 cursor-pointer"
                            onClick={() => setIsApproveOpen(true)}
                          >
                            Approve
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          align="center"
                          className="max-w-xs text-xs"
                        >
                          Approve this version as final. Files will be delivered
                          to your Cloud folder
                        </TooltipContent>
                      </Tooltip>
                    </>
                  )}
                </div>
              </TooltipProvider>
            </div>

            <ProjectApprovePopup
              isOpen={isApproveOpen}
              onClose={() => setIsApproveOpen(false)}
              onApprovalComplete={() => setIsApproved(true)}
            />

            <div className="text-sm md:text-base bg-tertiary/60 shadow-lg rounded-xl p-4 border border-accent/20">
              <p className="leading-relaxed">{project.description}</p>

              <div
                onClick={() => setShowDetails((prev) => !prev)}
                className="flex items-center justify-end gap-2 cursor-pointer text-primary font-semibold text-xs md:text-base mt-1"
              >
                <span>
                  {showDetails ? "Hide Project Details" : "See Project Details"}
                </span>
                <MoveRight className="h-4 w-4" />
              </div>
            </div>

            {showDetails && (
              <div className="mt-6">
                <ProjectDetails />
              </div>
            )}
          </div>

          <ProjectComments />
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectSection;
