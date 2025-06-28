
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface WizardFooterProps {
  currentStep: number;
  totalSteps: number;
  handleBack: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
  isLoading?: boolean;
}

export const WizardFooter = ({ 
  currentStep, 
  totalSteps, 
  handleBack, 
  handleNext,
  handleSubmit,
  isLoading = false
}: WizardFooterProps) => {
  return (
    <div className="flex justify-between gap-4">
      <Button
        variant="outline"
        onClick={handleBack}
        disabled={currentStep === 0 || isLoading}
      >
        Back
      </Button>
      
      {currentStep < totalSteps - 1 ? (
        <Button onClick={handleNext} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            currentStep === 4 ? "Complete Subscription" : "Continue"
          )}
        </Button>
      ) : (
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Go To Dashboard"
          )}
        </Button>
      )}
    </div>
  );
};
