
import React from "react";
import WizardProgress from "@/components/onboarding/wizard/WizardProgress";

interface UpgradeWizardProgressProps {
  currentStepIndex: number;
}

export const UpgradeWizardProgress: React.FC<UpgradeWizardProgressProps> = ({ currentStepIndex }) => {
  return (
    <div className="mb-8">
      <WizardProgress step={currentStepIndex} totalSteps={6} />
    </div>
  );
};
