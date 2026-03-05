import { Label } from "../ui/label";
import { Input } from "../ui/input";
export const SettingsInput = ({ label, type = "text", placeholder, register, error }) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-accent">{label}</Label>
    <Input
      type={type}
      placeholder={placeholder}
      {...register}
      className={`bg-white border-secondary/30 text-accent placeholder:text-accent/40 focus:border-primary focus:ring-primary ${
        error ? 'border-danger focus:border-danger focus:ring-danger' : ''
      }`}
    />
    {error && (
      <p className="text-xs text-danger mt-1">{error.message}</p>
    )}
  </div>
);