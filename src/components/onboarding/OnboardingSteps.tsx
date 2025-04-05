
import React from "react";
import { Check, Circle } from "lucide-react";

export type OnboardingStep = {
  name: string;
  status: "completed" | "current" | "upcoming";
};

interface OnboardingStepsProps {
  steps: OnboardingStep[];
}

const OnboardingSteps = ({ steps }: OnboardingStepsProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.name}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                  step.status === "completed"
                    ? "bg-[#04c8c8] border-[#04c8c8] text-white"
                    : step.status === "current"
                    ? "border-[#04c8c8] text-[#04c8c8]"
                    : "border-gray-300 text-gray-300"
                }`}
              >
                {step.status === "completed" ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              {/* Step Label */}
              <span
                className={`mt-2 text-xs font-medium ${
                  step.status === "completed"
                    ? "text-[#04c8c8]"
                    : step.status === "current"
                    ? "text-[#04c8c8]"
                    : "text-gray-400"
                }`}
              >
                {step.name}
              </span>
            </div>

            {/* Connector Line (except after the last step) */}
            {index < steps.length - 1 && (
              <div
                className={`h-[2px] flex-1 mx-2 ${
                  step.status === "completed" ? "bg-[#04c8c8]" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OnboardingSteps;
