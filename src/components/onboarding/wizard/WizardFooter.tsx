
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface WizardFooterProps {
  step: number;
  totalSteps: number;
  handleBack: () => void;
  handleNext: () => void;
  isCurrentStepValid: boolean;
  showPendingInvitations?: boolean;
}

const WizardFooter = ({
  step,
  totalSteps,
  handleBack,
  handleNext,
  isCurrentStepValid,
  showPendingInvitations = false
}: WizardFooterProps) => {
  if (showPendingInvitations) {
    return (
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Team Setup
        </Button>
        
        <Button
          variant="outline"
          disabled
        >
          Waiting for invitation...
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={handleBack}
        disabled={step === 0}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <Button
        onClick={handleNext}
        className="bg-[#04c8c8] hover:bg-[#04c8c8]/90"
        disabled={!isCurrentStepValid}
      >
        {step < totalSteps - 1 ? (
          <>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            Complete <Check className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default WizardFooter;
