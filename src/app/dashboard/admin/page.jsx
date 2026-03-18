"use client";
import React, { useState } from "react";
import {
  Search,
  Edit,
  Download,
  MessageCircle,
  Users,
  Eye,
  MoreVertical,
} from "lucide-react";
<<<<<<< Updated upstream
import { stats, filters, projects } from "@/utils/dashboard-admin";
import StatCard from "@/components/Dashboard/StatCard";
=======
import StatCard from "@/components/dashboard/StatCard";
>>>>>>> Stashed changes
import { Input } from "@/components/ui/input";
import { StatusBadge, ActionButton } from "@/components/dashboard/StatusBadge";
import FilterButton from "@/components/dashboard/FilterButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
<<<<<<< Updated upstream
=======
import {
  fetchAllProjects,
  fetchUserProfile,
  fetchContractors,
  assignContractor,
  markPosted,
} from "@/lib/queries/projects";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AssignContractorModal from "@/components/dashboard/AssignContractorModal";
import MarkPostedModal from "@/components/dashboard/MarkPostedModal";
import { notifyProjectEvent } from "@/lib/queries/notifications";
>>>>>>> Stashed changes

const Dashboard = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      activeFilter === "All" || project.status === activeFilter;
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.platform.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleProjectView = (project) => {
    setLoading(true);
    router.push(`/dashboard/admin/projects/${project.id}`);
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
              <h1 className="text-2xl sm:text-3xl font-bold text-accent mb-1 sm:mb-2">
                Admin Dashboard
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-semibold font-onest text-accent">
                My Video Projects
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="relative w-full overflow-hidden ">
                <div className="w-full">
                  <div className="lg:hidden w-full">
                    <Select
                      value={activeFilter}
                      onValueChange={setActiveFilter}
                    >
                      <SelectTrigger
                        className="
        h-11 w-full
        rounded-xl
        border border-accent/20
        bg-tertiary!
        text-sm font-semibold text-accent

        transition-all
        hover:border-primary/50
        hover:bg-accent/5

        focus:ring-2
        focus:ring-primary/40
        focus:border-primary
      "
                      >
                        <SelectValue placeholder="Select filter" />
                      </SelectTrigger>

                      <SelectContent
                        className="
        rounded-xl
        border border-accent/20
        bg-tertiary
        shadow-lg
      "
                      >
                        {filters.map((filter) => (
                          <SelectItem
                            key={filter}
                            value={filter}
                            className="
            cursor-pointer
            text-sm font-medium text-accent

            focus:bg-primary/10
            focus:text-accent

            data-[state=checked]:bg-primary/15
            data-[state=checked]:font-semibold
          "
                          >
                            {filter}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="hidden lg:flex gap-2 flex-wrap">
                    {filters.map((filter) => (
                      <FilterButton
                        key={filter}
                        active={activeFilter === filter}
                        onClick={() => setActiveFilter(filter)}
                      >
                        {filter}
                      </FilterButton>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative w-full lg:w-80 bg-tertiary rounded-2xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 bg-tertiary border-accent/10 text-accent placeholder:text-accent focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="hidden lg:block bg-tertiary rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-accent/10">
                    <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">
                      Project Name
                    </th>
                    <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">
                      Status
                    </th>
                    <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">
                      Last Updated
                    </th>
                    <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">
                      Assigned Contractors
                    </th>
                    <th className="text-right p-4 text-accent/70 font-semibold uppercase text-xs">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-accent/10 hover:bg-accent/5 transition-colors"
                    >
                      <td className="p-4">
                        <div className="space-y-2">
                          <p className="font-semibold text-accent">
                            {project.name}
                          </p>
                        </div>
                      </td>

                      <td className="p-4">
                        <StatusBadge status={project.status} />
                      </td>

                      <td className="p-4 text-accent/70">
                        {project.lastUpdated}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={project.contractor.avatar}
                            alt={project.contractor.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-accent/80 text-sm">
                            {project.contractor.name}
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <ActionButton icon={Users} label="Assign" />
                          <ActionButton
                            icon={Eye}
                            label="View"
                            onClick={() => handleProjectView(project)}
                          />
                          <ActionButton icon={MoreVertical} label="More" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden space-y-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-tertiary rounded-2xl p-4 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-accent mb-1">
                        {project.name}
                      </h3>
                      <p className="text-sm text-accent/70">
                        {project.platform}
                      </p>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>

                  <div className="space-y-2">
                    <div className="w-full h-1.5 bg-accent/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-accent/60">
                      Last updated: {project.lastUpdated}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <ActionButton
                      icon={Edit}
                      label="Edit"
                      onClick={() => handleOpenProject(project)}
                    />
                    <ActionButton icon={Download} label="Download" />
                    <ActionButton
                      icon={MessageCircle}
                      label="Comments"
                      onClick={() => handleOpenProject(project)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="bg-tertiary rounded-2xl p-12 text-center">
                <p className="text-accent/60">
                  No projects found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
