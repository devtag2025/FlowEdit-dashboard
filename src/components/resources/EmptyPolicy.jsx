import { File } from "lucide-react";
import React from "react";

const EmptyPolicy = () => {
  return (
    <div className="hidden lg:col-span-4 lg:flex flex-col items-center justify-center space-y-4 relative bg-tertiary p-4 rounded-2xl">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <File className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-accent mb-2">Select a File</h3>
      <p className="text-accent/60 max-w-md">
        Choose a File to view its detail.
      </p>
    </div>
  );
};

export default EmptyPolicy;
