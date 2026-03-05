"use client"
import { Label } from "@/components/ui/label";
export const FormSection = ({ title, children, className = "" }) => (
  <div className={`space-y-4 ${className}`}>
    <h3 className={`text-xl font-bold text-accent  border-primary/20 pb-2 ${className}`}>
      {title}
    </h3>
    {children}
  </div>
);


export const FormField = ({ label, children, error, required = false }) => (
  <div className="space-y-2">
    <Label className={`text-md font-md font-onest text-accent`}>
      {label} {required && <span className="text-danger">*</span>}
    </Label>
    {children}
    {error && <p className="text-xs text-danger">{error.message}</p>}
  </div>
);