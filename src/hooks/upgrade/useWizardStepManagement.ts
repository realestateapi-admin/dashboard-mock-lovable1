
import { useWizardStepNavigation, UpgradeStep } from "./useWizardStepNavigation";
import { useTermsAcceptance } from "./useTermsAcceptance";
import { useSubmissionHandling } from "./useSubmissionHandling";

// Re-export the UpgradeStep type
export type { UpgradeStep };

export const useWizardStepManagement = () => {
  // Use the focused navigation hook
  const { 
    currentStep, 
    getStepIndex, 
    goToStep, 
    goBack 
  } = useWizardStepNavigation();
  
  // Use the terms acceptance hook
  const { 
    termsAccepted, 
    handleTermsAccepted, 
    validateTermsAcceptance 
  } = useTermsAcceptance();
  
  // Use the submission handling hook
  const { 
    handleFinalizePlan, 
    handleSubmitChanges 
  } = useSubmissionHandling({ 
    termsAccepted, 
    goToStep 
  });

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
