"use client";
import { Badge, Circle } from "lucide-react";

export const StatusBadge = ({ status }) => {
  const styles = {
    Review: "bg-primary/10 text-primary border-primary",
    Processing: "bg-yellow-100 text-yellow-700 border-yellow-700",
    Complete: "bg-green-100 text-green-700 border-green-700",
    Submitted: "bg-blue-100 text-blue-700 border-blue-700",
    Error: "bg-danger/10 text-danger border-danger",
  };

  console.log(status);
  return (
    <div
      className={`w-fit rounded-full border px-3 py-1 text-sm font-medium ${styles[status]}`}
    >
      {status}
    </div>
  );
};

export const ActionButton = ({ icon: Icon, onClick, label }) => (
  <button
    onClick={onClick}
    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white hover:bg-accent/5 border border-accent/10 transition-colors cursor-pointer"
    aria-label={label}
  >
    <Icon className="w-4 h-4 text-accent" />
  </button>
);
