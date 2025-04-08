
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface WizardActionButtonsProps {
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;
  handleBack: () => void;
  handleNext: () => void;
  isUpgradeFlow?: boolean;
}

export const WizardActionButtons = ({
  currentStep,
  totalSteps,
  isLoading,
  handleBack,
  handleNext,
  isUpgradeFlow = true
}: WizardActionButtonsProps) => {
  // Set button colors based on flow
  const primaryButtonClass = isUpgradeFlow 
    ? "bg-purple-600 hover:bg-purple-700 text-white" 
    : "bg-[#04c8c8] hover:bg-teal-600 text-white";

  return (
    <div className="flex justify-between w-full">
      <Button
        onClick={handleBack}
        disabled={currentStep === 0}
        variant="outline"
        className="flex items-center gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      
      <Button
        onClick={handleNext}
        disabled={isLoading}
        className={`flex items-center gap-1 ${primaryButtonClass}`}
      >
        {isLoading ? (
          "Processing..."
        ) : currentStep === totalSteps - 1 ? (
          "Go to dashboard"
        ) : (
          <>
            Next
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};
