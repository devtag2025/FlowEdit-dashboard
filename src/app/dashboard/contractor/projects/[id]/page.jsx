"use client";
import React from "react";
import { useParams } from "next/navigation";
import ProjectSection from "@/components/projects/ProjectSection";

const page = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-secondary p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <ProjectSection projectId={id} />
      </div>
    </div>
  );
};

export default page;
