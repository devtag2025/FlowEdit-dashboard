import { Switch } from "../ui/switch";
export const SettingsToggle = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex-1">
      <p className="text-sm font-medium text-accent">{label}</p>
      {description && (
        <p className="text-xs text-accent/60 mt-1">{description}</p>
      )}
    </div>
    <Switch
      checked={checked}
      onCheckedChange={onChange}
      className="data-[state=checked]:bg-primary"
    />
  </div>
);