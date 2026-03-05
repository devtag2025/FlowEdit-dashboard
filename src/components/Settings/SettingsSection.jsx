"use client"
export const SettingsSection = ({ title, description, children, className = "" }) => (
  <div className={`bg-tertiary rounded-2xl p-6 ${className}`}>
    {title && (
      <div className="mb-4">
        <h3 className="text-xl font-light font-onest text-accent mb-1">{title}</h3>
        {description && (
          <p className="text-md font-onest text-accent/60">{description}</p>
        )}
      </div>
    )}
    {children}
  </div>
);