"use client";

import { X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const CatalogSidebar = ({ card, onClose }) => {
  const [completed, setCompleted] = useState(card.checklists.map(() => false));

  const toggleChecklist = (index) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };

  return (
    <>
      <div className="hidden lg:grid lg:col-span-4 relative bg-tertiary px-4 pt-4 rounded-2xl shadow-lg">
        <X
          className="w-4 h-4 text-slate-900 cursor-pointer absolute right-3 top-6"
          onClick={onClose}
        />

        <div className="flex flex-col gap-6">
          <h3 className="text-accent text-xl font-semibold">{card.title}</h3>

          <video
            src={card.video}
            controls
            className="w-full rounded shadow-md"
            poster={card.thumbnail}
          >
            Your browser does not support the video tag.
          </video>

          <div className="space-y-4">
            <h3 className="text-accent font-semibold text-lg border-b pb-3">
              Lesson Checklist
            </h3>

            {card.checklists.map((checklist, index) => (
              <label key={checklist.id} className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={completed[index]}
                  onChange={() => toggleChecklist(index)}
                  className="w-4 h-4 rounded-full border-2 border-accent/50"
                />
                <span
                  className={`text-accent/70 text-sm ${
                    completed[index] ? "line-through text-accent/40" : ""
                  }`}
                >
                  {checklist.point}
                </span>
              </label>
            ))}
          </div>

          <div className="flex justify-between gap-2">
            <Button
              className="bg-gray-300 text-accent hover:bg-gray-400/60 shadow-md"
              onClick={onClose}
            >
              Close
            </Button>
            <Button className="flex-1">Mark as Complete</Button>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 z-50 flex items-end transition-transform duration-300 ease-out lg:hidden">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />

        <div className="relative bg-tertiary w-full rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto shadow-2xl animate-slideUp">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-accent text-xl font-semibold">{card.title}</h3>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-slate-900 cursor-pointer" />
            </button>
          </div>

          <video
            src={card.video}
            controls
            className="w-full rounded shadow-md mb-4"
            poster={card.thumbnail}
          >
            Your browser does not support the video tag.
          </video>

          <div className="space-y-4">
            <h3 className="text-accent font-semibold text-lg border-b pb-3">
              Lesson Checklist
            </h3>

            {card.checklists.map((checklist, index) => (
              <label key={checklist.id} className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={completed[index]}
                  onChange={() => toggleChecklist(index)}
                  className="w-4 h-4 rounded-full border-2 border-accent/50"
                />
                <span
                  className={`text-accent/70 text-sm ${
                    completed[index] ? "line-through text-accent/40" : ""
                  }`}
                >
                  {checklist.point}
                </span>
              </label>
            ))}
          </div>

          <div className="flex justify-between gap-2 mt-4">
            <Button
              className="bg-gray-300 text-accent hover:bg-gray-400/60 shadow-md flex-1"
              onClick={onClose}
            >
              Close
            </Button>
            <Button className="flex-1">Mark as Complete</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogSidebar;
