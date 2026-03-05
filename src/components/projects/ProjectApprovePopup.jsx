"use client";
import React, { useState } from "react";
import { X, Star } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogPortal } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ProjectSuccessPopup from "./ProjectSuccessPopup";

const StarRating = ({ value, onChange }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onClick={() => onChange(star)}
          className={`w-6 h-6 md:w-10 md:h-10 mt-2 cursor-pointer transition duration-300
            ${star <= value ? "fill-primary text-primary  hover:scale-110 " : "text-primary/60 hover:text-primary/40"}
          `}
        />
      ))}
    </div>
  );
};

const ProjectApprovePopup = ({ isOpen, onClose, onApprovalComplete }) => {
  const [quality, setQuality] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const isDisabled = quality === 0 || speed === 0 || !feedback.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const handleClose = () => {
    onClose();
    setQuality(0);
    setSpeed(0);
    setFeedback("");
  };

  const handleFinalDone = () => {
    setShowSuccess(false);
    handleClose();
    if (onApprovalComplete) onApprovalComplete();
  };

  const handleJustCloseSuccess = () => {
    setShowSuccess(false);
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogPortal>
        <DialogContent
          className="
            w-full max-w-[95vw] sm:max-w-xl max-h-[90vh] 
            rounded-4xl bg-tertiary p-0 overflow-y-auto overscroll-contain scroll-smooth no-scrollbar
          "
        >
          <DialogHeader className="bg-tertiary border-primary/20 p-10 pb-4 top-0">
            <div className="relative">
              <DialogTitle className="text-slate-900 md:text-2xl text-left font-bold">
                Rate and Approve
              </DialogTitle>

              <DialogClose asChild>
                <button
                  className="absolute right-0 top-0 rounded-md text-accent/60 hover:text-accent transition cursor-pointer"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </DialogClose>
            </div>
            <DialogDescription className="text-md text-gray-400 text-left">
              Rate and approve project for delivery. Project will be added to
              your cloud storage folder.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
            <div className="space-y-1">
              <label className="text-sm md:text-base font-bold text-gray-700">
                Quality <span className="text-red-500">*</span>
              </label>
              <StarRating value={quality} onChange={setQuality} />
            </div>

            <div className="space-y-1">
              <label className="text-sm md:text-base font-bold text-gray-700">
                Speed <span className="text-red-500">*</span>
              </label>
              <StarRating value={speed} onChange={setSpeed} />
            </div>

            <div className="space-y-1">
              <label className="text-sm md:text-base font-bold text-gray-700">
                Feedback <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share any notes or thoughts about this project..."
                className="resize-none h-28 text-xs md:text-base mt-3 text-slate-700"
              />
            </div>

            <Button
              type="submit"
              disabled={isDisabled}
              className={`w-full rounded-xl py-6 text-base font-semibold transition
                ${
                  isDisabled
                    ? "bg-primary text-white cursor-not-allowed"
                    : "bg-primary/90 hover:bg-primary hover:shadow-lg text-white cursor-pointer"
                }`}
            >
              Approve
            </Button>
          </form>

          <ProjectSuccessPopup
            isOpen={showSuccess}
            onClose={handleJustCloseSuccess}
            onDone={handleFinalDone}
          />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ProjectApprovePopup;
