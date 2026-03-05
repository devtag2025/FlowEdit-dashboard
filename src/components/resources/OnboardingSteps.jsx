"use client";

const OnboardingSteps = ({ steps }) => {
  return (
    <div className="py-6">
      <div className="relative">
        <div className="absolute top-3 left-0 right-0 h-0.5 md:h-1 bg-gray-300">
          <div className="h-full bg-primary" style={{ width: "37.5%" }} />
        </div>

        <div className="flex justify-between relative">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[8px] md:text-xs font-bold mb-1 ${
                  step.completed
                    ? "bg-primary text-white"
                    : "bg-tertiary border-2 border-gray-300 text-gray-400"
                }`}
              >
                {step.completed ? "✓" : step.id}
              </div>
              <span className="text-[8px] md:text-xs text-accent">
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingSteps;
