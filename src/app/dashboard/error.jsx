"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    console.error("[Dashboard Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-8">
      <div className="bg-tertiary rounded-3xl p-8 max-w-md w-full text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7 text-red-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-accent mb-1">Something went wrong</h2>
          <p className="text-sm text-accent/55">
            {error?.message || "An unexpected error occurred. Try refreshing the page."}
          </p>
        </div>
        <Button
          onClick={reset}
          className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 h-10 gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </Button>
      </div>
    </div>
  );
}
