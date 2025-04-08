
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface WizardActionButtonsProps {
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;
  handleBack: () => void;
  handleNext: () => void;
}

export const WizardActionButtons = ({
  currentStep,
  totalSteps,
  isLoading,
  handleBack,
  handleNext
}: WizardActionButtonsProps) => {
  return (
    <div className="flex justify-between pt-6">
      <Button
        onClick={handleBack}
        variant="outline"
      >
        {currentStep === 0 ? (
          <span>Cancel</span>
        ) : (
          <>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </>
        )}
      </Button>
      
      <Button
        onClick={handleNext}
        disabled={isLoading}
        className="bg-purple-600 hover:bg-purple-700"
      >
        {isLoading ? (
          <span>Processing...</span>
        ) : currentStep === totalSteps - 1 ? (
          <span>Confirm Changes</span>
        ) : (
          <span>Next <ArrowRight className="ml-2 h-4 w-4" /></span>
        )}
      </Button>
    </div>
  );
};
