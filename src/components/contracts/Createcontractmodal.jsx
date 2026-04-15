"use client";
import { useState, useEffect } from "react";
import { X, Loader2, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchContractors } from "@/lib/queries/contractors";
import { uploadContractFile, createContract } from "@/lib/queries/contracts";

const CreateContractModal = ({ onClose, onSuccess, preselectedContractor }) => {
  const [contractors, setContractors] = useState([]);
  const [loadingContractors, setLoadingContractors] = useState(true);
  const [selectedContractorId, setSelectedContractorId] = useState(
    preselectedContractor?.id || ""
  );
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContractors()
      .then(setContractors)
      .catch(() => {})
      .finally(() => setLoadingContractors(false));
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.type !== "application/pdf") {
        setError("Please upload a PDF file.");
        return;
      }
      if (selected.size > 10 * 1024 * 1024) {
        setError("File size must be under 10MB.");
        return;
      }
      setFile(selected);
      setError(null);
    }
  };

  const handleCreate = async () => {
    if (!selectedContractorId) {
      setError("Please select a contractor.");
      return;
    }
    if (!file) {
      setError("Please upload a contract PDF.");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // 1. Upload PDF to Supabase Storage
      const fileUrl = await uploadContractFile(selectedContractorId, file);

      // 2. Create the contract record
      const contract = await createContract({
        contractorId: selectedContractorId,
        title: title.trim() || "Contractor Agreement",
        fileUrl,
      });

      onSuccess?.(contract);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create contract. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 space-y-5 animate-in fade-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-accent">Create Contract</h2>
            <p className="text-sm text-accent/60 mt-0.5">
              Upload a PDF and assign to a contractor
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-accent" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Contractor selector */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-accent">
              Contractor <span className="text-red-400">*</span>
            </label>
            {loadingContractors ? (
              <div className="flex items-center gap-2 text-sm text-accent/50">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading contractors...
              </div>
            ) : (
              <select
                value={selectedContractorId}
                onChange={(e) => setSelectedContractorId(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-accent/20 text-accent text-sm font-medium bg-white focus:border-primary focus:outline-none"
              >
                <option value="">Select a contractor</option>
                {contractors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.email})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-accent">
              Contract Title
            </label>
            <Input
              placeholder="e.g. Contractor Agreement — March 2025"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 border-accent/20 focus:border-primary focus-visible:ring-0 text-accent"
            />
          </div>

          {/* File upload */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-accent">
              Contract PDF <span className="text-red-400">*</span>
            </label>

            {file ? (
              <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/20">
                <FileText className="w-5 h-5 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-accent truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-accent/50">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="p-1 hover:bg-accent/10 rounded-full"
                >
                  <X className="w-4 h-4 text-accent/50" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-accent/20 rounded-xl cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-colors">
                <Upload className="w-6 h-6 text-accent/40" />
                <span className="text-sm text-accent/60">
                  Click to upload PDF (max 10MB)
                </span>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-accent/10">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={saving}
            className="text-accent/50 hover:text-accent rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={saving || !selectedContractorId || !file}
            className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2 px-6 disabled:opacity-50"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Upload className="w-4 h-4" /> Create & Send
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateContractModal;
