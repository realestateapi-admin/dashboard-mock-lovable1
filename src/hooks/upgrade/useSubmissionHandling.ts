
import { useToast } from "@/hooks/use-toast";
import { UpgradeStep } from "./useWizardStepNavigation";

interface SubmissionHandlingProps {
  termsAccepted: boolean;
  goToStep: (step: UpgradeStep) => void;
}

export const useSubmissionHandling = ({ termsAccepted, goToStep }: SubmissionHandlingProps) => {
  const { toast } = useToast();

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
    handleFinalizePlan,
    handleSubmitChanges
  };
};
