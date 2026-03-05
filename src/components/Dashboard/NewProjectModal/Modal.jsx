"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSection, FormField } from "./FormSection";

export default function NewProjectRequestModal({ isOpen, setIsOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      projectTitle: "",
      projectDescription: "",
      platform: "",
      clientName: "",
      clientLength: "",
      footage: "",
      notifyTeam: false,
      editingSpeed: "",
      additionalNotes: "",
    },
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setUploadedFiles([]);
    setIsOpen(false);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="
    w-full max-w-[95vw] sm:max-w-7xl
    max-h-[90vh]
    rounded-4xl
    bg-tertiary
    p-0
    overflow-y-auto
    overscroll-contain
    scroll-smooth
    no-scrollbar 
  "
      >
        <DialogHeader className="bg-tertiary border-primary/20 p-10 pb-4 top-0">
          <div className="relative">
            <DialogTitle className="text-2xl font-bold font-onest text-accent">
              New Project Request
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
          <DialogDescription className="text-md font-onest text-accent/60">
            Each request creates one completed video. For multiple outputs,
            submit separate requests
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <FormSection title="Project Details">
            <FormField
              className="text-accent text-lg font-medium font-onest"
              label="Project Title"
              required
              error={errors.projectTitle}
            >
              <Input
                placeholder="Enter project title"
                {...register("projectTitle", {
                  required: "Project title is required",
                })}
                className=" border-accent/20 text-accent font-medium placeholder:text-accent/80 focus:border-primary focus:ring-primary"
              />
            </FormField>

            <FormField
              label="Project Description"
              error={errors.projectDescription}
            >
              <Textarea
                placeholder="Describe your project..."
                rows={4}
                {...register("projectDescription")}
                className="   bg-white!
      border-accent/20
      text-accent
      placeholder:text-accent/40
      focus:border-primary
      focus:ring-primary
      resize-none
      min-h-40      
      w-full
      wrap-break-word
      overflow-x-hidden  "
              />
            </FormField>

            <FormField label="Platform" required error={errors.platform}>
              <Select onValueChange={(value) => setValue("platform", value)}>
                <SelectTrigger className="bg-white! border-accent/20 text-accent focus:border-primary focus:ring-primary placeholder:text-accent/80 w-full">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="internal">Internal</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Desired Length" required error={errors.platform}>
              <Select onValueChange={(value) => setValue("platform", value)}>
                <SelectTrigger className="bg-white! border-accent/20 text-accent focus:border-primary focus:ring-primary placeholder:text-accent/80 w-full">
                  <SelectValue placeholder="Select Length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="20">20 minutes</SelectItem>
                  <SelectItem value="25">25 minutes</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </FormSection>

          <FormField label="Optional Uploads">
            <div className="space-y-3">
              <div className="border-2 border-dashed border-accent/20 rounded-lg p-8 text-center hover:border-primary/40 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <Button
                    type="button"
                    onClick={() =>
                      document.getElementById("file-upload").click()
                    }
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Files
                  </Button>
                  <p className="text-sm text-accent/60">
                    Upload Supporting files (max total 1GB)
                  </p>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white p-3 rounded-lg border border-accent/10"
                    >
                      <span className="text-sm text-accent truncate flex-1">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-danger hover:text-danger/80 ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormField>

          <div className="flex items-start gap-3 bg-primary/5 p-8 rounded-lg border border-primary/20">
            <input
              type="checkbox"
              id="branding-template"
              {...register("applyBranding")}
              className="mt-3 w-4 h-4 rounded border-accent/30 text-primary focus:ring-primary"
            />
            <label
              htmlFor="branding-template"
              className="flex-1 cursor-pointer"
            >
              <p className="text-lg font-onest font-bold text-accent">
                Apply my branding template to this project
              </p>
              <p className="text-xs font-onest text-accent/60 mt-1">
                Used saved colors, fonts, logos, and editing style
              </p>
            </label>
          </div>

          <FormSection title="Editing Instructions">
            <FormField label="Style Preferences">
              <Textarea
                placeholder="Describe the style, mood, transitions, etc."
                rows={5}
                className="
      bg-white!
      border-accent/20
      text-accent
      placeholder:text-accent/40
      focus:border-primary
      focus:ring-primary
      resize-none
      min-h-40      
      w-full
      wrap-break-word
      overflow-x-hidden    
    "
              />
            </FormField>

            <div>
              <div>
                <p className="text-sm font-medium text-accent/50">
                  Style direction, pacing, mood, music preferences...
                </p>
              </div>
            </div>
          </FormSection>

          <FormSection title="Additional Notes">
            <FormField
              label="Notes for Editor (optional)"
              error={errors.additionalNotes}
            >
              <Textarea
                placeholder="Any additional clarifications..."
                rows={4}
                {...register("additionalNotes")}
                className="
                 bg-white!
      border-accent/20
      text-accent
      placeholder:text-accent/40
      focus:border-primary
      focus:ring-primary
      resize-none
      min-h-40      
      w-full
      wrap-break-word
      overflow-x-hidden"
              />
            </FormField>
          </FormSection>

          <div className="flex flex-col gap-4 pt-4 border-t border-accent/10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm sm:text-base text-accent font-onest">
              You will receive a confirmation once your project is added to your
              dashboard
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:items-center">
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto bg-white text-md font-semibold font-onest text-primary hover:bg-accent/5"
              >
                Reset to defaults
              </Button>

              <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="w-full sm:w-auto bg-primary text-md font-onest font-semibold hover:bg-primary/90 text-white"
              >
                Submit Request
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
