
import { useState } from "react";

// Wizard step type re-exported for convenience
export type UpgradeStep = 'manage' | 'plan' | 'addons' | 'overage' | 'terms' | 'confirmation';

export const useWizardStepNavigation = () => {
  // Step state
  const [currentStep, setCurrentStep] = useState<UpgradeStep>('manage');
  const [previousStep, setPreviousStep] = useState<UpgradeStep | null>(null);

  // Step index calculation for progress bar
  const getStepIndex = () => {
    const stepOrder: UpgradeStep[] = ['manage', 'plan', 'addons', 'overage', 'terms', 'confirmation'];
    return stepOrder.indexOf(currentStep);
  };

  // Navigation handlers
  const goToStep = (step: UpgradeStep) => {
    setPreviousStep(currentStep);
    setCurrentStep(step);
  };

  const goBack = () => {
    if (previousStep) {
      setCurrentStep(previousStep);
      setPreviousStep(null);
    } else {
      // If no previous step is recorded, go to the manage step
      setCurrentStep('manage');
    }
  };

  return {
    currentStep,
    getStepIndex,
    goToStep,
    goBack
  };
};
