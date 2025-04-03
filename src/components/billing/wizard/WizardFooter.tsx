
import { Button } from "@/components/ui/button";

interface WizardFooterProps {
  currentStep: number;
  totalSteps: number;
  handleBack: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
}

export const WizardFooter = ({ 
  currentStep, 
  totalSteps, 
  handleBack, 
  handleNext,
  handleSubmit
}: WizardFooterProps) => {
  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={handleBack}
        disabled={currentStep === 0}
      >
        Back
      </Button>
      
      {currentStep < totalSteps - 1 ? (
        <Button onClick={handleNext}>
          Continue
        </Button>
      ) : (
        <Button onClick={handleSubmit}>
          Complete Subscription
        </Button>
      )}
    </div>
  );
};
