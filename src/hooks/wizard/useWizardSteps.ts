
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface WizardStep {
  title: string;
  description: string;
}

export const useWizardSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const steps: WizardStep[] = [
    {
      title: "Choose Your Billing Option",
      description: ""
    },
    {
      title: "Select Add-Ons",
      description: "Enhance your subscription with premium features"
    },
    {
      title: "Overage Handling",
      description: "Choose how to handle API calls that exceed your plan limits"
    },
    {
      title: "Payment Information",
      description: "Enter your payment details to complete your subscription"
    }
  ];

  // Validate if current step is complete
  const isCurrentStepValid = (overageHandling: string | null) => {
    if (currentStep === 2) {
      // Make overage handling selection mandatory
      return !!overageHandling;
    }
    return true;
  };

  // Simulate loading when moving between steps
  const handleNext = (overageHandling: string | null) => {
    // Check if current step is valid before proceeding
    if (!isCurrentStepValid(overageHandling)) {
      toast({
        title: "Selection Required",
        description: "Please select an overage handling option to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(prevStep => prevStep + 1);
        setIsLoading(false);
      }, 500);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(prevStep => prevStep - 1);
        setIsLoading(false);
      }, 500);
    }
  };

  return {
    currentStep,
    steps,
    isLoading,
    setIsLoading,
    handleNext,
    handleBack
  };
};
