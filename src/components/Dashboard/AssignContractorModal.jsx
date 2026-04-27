"use client";
import React, { useState } from "react";
import { X, Loader2, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const ROLES = [
  { key: "offline_editor",   label: "Offline Editor",   description: "Handles raw footage and initial cuts" },
  { key: "primary_editor",   label: "Primary Editor",   description: "Main edit, colour and assembly" },
  { key: "finishing_editor", label: "Finishing Editor", description: "Final polish, graphics and delivery" },
];

function ContractorPicker({ roleLabel, roleDesc, contractors, selected, onChange }) {
  const [expanded, setExpanded] = useState(false);
  const current = contractors.find((c) => c.id === selected);

  return (
    <div className="border border-accent/15 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center justify-between p-3 bg-white hover:bg-accent/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          {current ? (
            <Avatar className="w-7 h-7">
              {current.avatar_url ? (
                <AvatarImage src={current.avatar_url} />
              ) : (
                <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                  {current.name?.[0] || "?"}
                </AvatarFallback>
              )}
            </Avatar>
          ) : (
            <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="text-accent/30 text-sm">?</span>
            </div>
          )}
          <div className="text-left">
            <p className="text-sm font-semibold text-accent">{roleLabel}</p>
            <p className="text-xs text-accent/50">
              {current ? current.name : roleDesc}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {current && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(null); }}
              className="text-accent/40 hover:text-red-500 transition-colors p-0.5 rounded"
              aria-label="Clear"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {expanded ? <ChevronUp className="w-4 h-4 text-accent/40" /> : <ChevronDown className="w-4 h-4 text-accent/40" />}
        </div>
      </button>

      {expanded && (
        <div className="max-h-44 overflow-y-auto border-t border-accent/10 bg-white">
          {contractors.length === 0 ? (
            <p className="text-xs text-accent/40 text-center py-4">No contractors available</p>
          ) : (
            contractors.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => { onChange(c.id); setExpanded(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-accent/5 transition-colors text-left ${
                  selected === c.id ? "bg-primary/8" : ""
                }`}
              >
                <Avatar className="w-7 h-7 shrink-0">
                  {c.avatar_url ? (
                    <AvatarImage src={c.avatar_url} />
                  ) : (
                    <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                      {c.name?.[0] || "?"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-accent truncate">{c.name}</p>
                  <p className="text-xs text-accent/50 truncate">{c.email}</p>
                </div>
                {selected === c.id && (
                  <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="text-white text-[10px]">✓</span>
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function AssignContractorModal({ isOpen, setIsOpen, project, contractors, onAssign, error }) {
  const [selections, setSelections] = useState({
    offline_editor: null,
    primary_editor: null,
    finishing_editor: null,
  });
  const [isAssigning, setIsAssigning] = useState(false);

  const hasSelection = Object.values(selections).some(Boolean);

  const handleAssign = async () => {
    if (!hasSelection || !project) return;
    setIsAssigning(true);
    try {
      await onAssign(project.id, selections);
    } finally {
      setIsAssigning(false);
      setSelections({ offline_editor: null, primary_editor: null, finishing_editor: null });
    }
  };

  const setRole = (roleKey, contractorId) => {
    setSelections((prev) => ({ ...prev, [roleKey]: contractorId }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && !isAssigning) {
        setSelections({ offline_editor: null, primary_editor: null, finishing_editor: null });
      }
      setIsOpen(open);
    }}>
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-[95vw] sm:max-w-md rounded-2xl bg-tertiary p-0"
      >
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="relative">
            <DialogTitle className="text-xl font-bold font-onest text-accent">
              Assign Editors
            </DialogTitle>
            <DialogClose asChild>
              <button
                className="absolute right-0 top-0 rounded-md p-2 text-accent/60 hover:text-accent hover:bg-accent/10 transition"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </DialogClose>
          </div>
          <DialogDescription className="text-sm font-onest text-accent/60 mt-1">
            Assign editor roles for{" "}
            <span className="font-semibold text-accent">{project?.title}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-3">
          {ROLES.map(({ key, label, description }) => (
            <ContractorPicker
              key={key}
              roleKey={key}
              roleLabel={label}
              roleDesc={description}
              contractors={contractors}
              selected={selections[key]}
              onChange={(id) => setRole(key, id)}
            />
          ))}

          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-3 py-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          <p className="text-xs text-accent/40 text-center pt-1">
            Assign at least one role to proceed.
          </p>

          <Button
            onClick={handleAssign}
            disabled={!hasSelection || isAssigning}
            className="w-full bg-primary text-white font-onest font-semibold hover:bg-primary/90 h-11 disabled:opacity-50"
          >
            {isAssigning ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Assigning...
              </>
            ) : (
              "Assign Editors"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
