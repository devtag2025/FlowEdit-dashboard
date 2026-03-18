"use client";
<<<<<<< Updated upstream
import { Eye, MessageSquare, EllipsisVertical } from "lucide-react";
import { stats, projects } from "@/utils/dashboard-contractor";
import StatCard from "@/components/Dashboard/StatCard";
import { StatusBadge, ActionButton } from "@/components/Dashboard/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
=======
import React, { useState, useEffect, useCallback } from "react";
import { Eye, Search, Activity, Clock, CheckCircle } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { StatusBadge, ActionButton } from "@/components/dashboard/StatusBadge";
import { Input } from "@/components/ui/input";
import FilterButton from "@/components/dashboard/FilterButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
>>>>>>> Stashed changes
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import { useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleProjectView = (project) => {
    setLoading(true);
    router.push(`/dashboard/contractor/projects/${project.id}`);
  };
  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div className="min-h-screen bg-secondary p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-accent mb-1 sm:mb-2">
                Good Evening, Sarah
              </h1>
              <p className="text-base text-slate-700">
                Complete your required steps in the Resources tab to become
                Active.
              </p>
            </div>
            <div className="bg-white/50 py-2 px-3 rounded-full flex items-center gap-4 text-sm w-fit">
              <span className="text-slate-700 font-semibold">Status</span>
              <span className="bg-white text-primary rounded-full py-1 px-3 font-bold">
                Inactive
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="space-y-6">
            <Card className="bg-tertiary">
              <CardContent>
                <h2 className="text-xl md:text-2xl font-bold text-accent mb-8">
                  Assigned Projects
                </h2>

                <div className="w-full overflow-x-auto">
                  <div className="min-w-[900px]">
                    <div className="grid grid-cols-5 px-7 py-4 text-xs font-bold gap-x-8 uppercase text-slate-700">
                      <span>Project</span>
                      <span>Client</span>
                      <span>Status</span>
                      <span>Due Date</span>
                      <span>Actions</span>
                    </div>

                    <div>
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="text-sm md:text-base grid grid-cols-5 gap-x-8 px-6 py-4 text-accent border-white border-t-2 hover:bg-gray-300"
                        >
                          <span className="font-bold">{project.name}</span>

                          <span>{project.client}</span>

                          <div className="flex items-center">
                            <StatusBadge status={project.status} />
                          </div>

                          <span>{project.dueDate}</span>

                          <div className="flex gap-2">
                            <ActionButton
                              icon={Eye}
                              label="Read"
                              onClick={() => handleProjectView(project)}
                            />
                            <ActionButton
                              icon={MessageSquare}
                              label="Comments"
                            />
                            <ActionButton
                              icon={EllipsisVertical}
                              label="options"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
