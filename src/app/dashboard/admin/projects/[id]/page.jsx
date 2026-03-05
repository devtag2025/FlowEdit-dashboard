"use client";

import ProjectSection from "@/components/projects/ProjectSection";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-secondary p-2 md:p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <ProjectSection projectId={id} />
      </div>
    </div>
  );
};

export default page;
