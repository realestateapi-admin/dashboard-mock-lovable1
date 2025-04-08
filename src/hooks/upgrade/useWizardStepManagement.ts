
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Wizard step type
export type UpgradeStep = 'manage' | 'plan' | 'addons' | 'overage' | 'terms' | 'confirmation';

export const useWizardStepManagement = () => {
  const { toast } = useToast();
  
  // Wizard state
  const [currentStep, setCurrentStep] = useState<UpgradeStep>('manage');
  const [previousStep, setPreviousStep] = useState<UpgradeStep | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

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

  // Calculate current step index for progress bar
  const getStepIndex = () => {
    const stepOrder: UpgradeStep[] = ['manage', 'plan', 'addons', 'overage', 'terms', 'confirmation'];
    return stepOrder.indexOf(currentStep);
  };

  // Handle terms acceptance
  const handleTermsAccepted = (accepted: boolean) => {
    setTermsAccepted(accepted);
  };

  // Handle plan finalization
  const handleFinalizePlan = () => {
    goToStep('terms');
  };

  // Handle submission after terms acceptance
  const handleSubmitChanges = () => {
    if (termsAccepted) {
      // This is where the changes would be submitted to the backend
      // Only at this point should the global state be updated
      
      // For demo purposes, we're just moving to the confirmation step
      goToStep('confirmation');
      
      // In a real app, you would submit the changes to the API here
      // and only update the global state after a successful response
      toast({
        title: "Changes submitted",
        description: "Your subscription changes have been processed successfully.",
        variant: "default"
      });
    } else {
      toast({
        title: "Terms of Service Required",
        description: "Please accept the Terms of Service to continue.",
        variant: "destructive"
      });
    }
  };

  return {
    currentStep,
    termsAccepted,
    getStepIndex,
    goToStep,
    goBack,
    handleTermsAccepted,
    handleFinalizePlan,
    handleSubmitChanges
  };
};
