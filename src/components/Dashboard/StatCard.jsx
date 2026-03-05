"use client";
import { TrendingUp } from "lucide-react";

const StatCard = ({ icon: Icon, title, value, percentage, subtitle, time, progress, trend, type }) => {
  const displayValue = value || percentage;

  const renderVisualization = () => {
    switch (type) {
      case "revenue":
        return (
          <div className="h-16 w-full relative">
            <svg className="w-full h-full" viewBox="0 0 200 64" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(106, 77, 255)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(106, 77, 255)" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M0,48 Q10,32 20,40 T40,35 T60,28 T80,38 T100,25 T120,30 T140,22 T160,28 T180,20 T200,18"
                fill="none"
                stroke="rgb(106, 77, 255)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M0,48 Q10,32 20,40 T40,35 T60,28 T80,38 T100,25 T120,30 T140,22 T160,28 T180,20 T200,18 L200,64 L0,64 Z"
                fill="url(#gradient)"
              />
            </svg>
          </div>
        );

      case "capacity":
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-accent/60">
                {progress.current}/{progress.total} Capacity
              </span>
            </div>
            <div className="w-full h-2 bg-accent/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          </div>
        );

      case "pie":
        return (
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="8" fill="none" className="text-accent/10" />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${progress.segments[0]} ${200 - progress.segments[0]}`}
                  className="text-primary"
                />
              </svg>
            </div>
            <div className="flex-1 space-y-2">
              {progress.labels.map((label, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${i === 0 ? "bg-primary" : "bg-accent/20"}`} />
                  <span className="text-xs text-accent/70">{label}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "split":
        return (
          <div className="space-y-3">
            <div className="flex items-center h-8 rounded-lg overflow-hidden">
              <div
                className="h-full bg-primary flex items-center justify-center"
                style={{ width: `${(progress.active / (progress.active + progress.available)) * 100}%` }}
              >
                <span className="text-sm font-bold text-white">{progress.active}</span>
              </div>
              <div
                className="h-full bg-secondary flex items-center justify-center"
                style={{ width: `${(progress.available / (progress.active + progress.available)) * 100}%` }}
              >
                <span className="text-sm font-medium text-accent/70">{progress.available}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-accent/60">{progress.active} Busy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-accent/60">{progress.available} Available</span>
              </div>
            </div>
          </div>
        );

      default:
        // Default progress bar (client/contractor style)
        if (percentage) {
          return (
            <div className="space-y-2">
              <div className="w-full h-2 bg-accent/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: percentage }}
                />
              </div>
            </div>
          );
        }
        return null;
    }
  };

  return (
    <div className="bg-tertiary rounded-2xl p-6 space-y-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        {Icon ? (
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        ) : (
          <p className="text-sm text-accent font-bold mb-1">{title}</p>
        )}
        {time && (
          <span className="bg-white text-slate-700 text-xs rounded-full px-2 py-1">
            {time}
          </span>
        )}
        {trend && !time && (
          <div className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </div>
        )}
      </div>

      <div>
        {Icon && <p className="text-sm text-accent/70 mb-1">{title}</p>}
        <h3 className="text-3xl font-bold text-accent">{displayValue}</h3>
        {subtitle && <p className="text-xs text-accent/60 mt-1">{subtitle}</p>}
      </div>

      {time && trend && (
        <div className="flex items-center gap-1 text-sm font-bold text-green-500 rounded-full">
          <TrendingUp className="w-4 h-4" />
          {trend}
        </div>
      )}

      {renderVisualization()}
    </div>
  );
};

export default StatCard;
