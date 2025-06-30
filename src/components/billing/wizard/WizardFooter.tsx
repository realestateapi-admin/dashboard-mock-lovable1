
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WizardFooterProps {
  currentStep: number;
  totalSteps: number;
  handleBack: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
  isLoading?: boolean;
  canContinue?: boolean;
  validationError?: string;
  showValidationError?: boolean;
}

export const WizardFooter = ({ 
  currentStep, 
  totalSteps, 
  handleBack, 
  handleNext,
  handleSubmit,
  isLoading = false,
  canContinue = true,
  validationError,
  showValidationError = false
}: WizardFooterProps) => {
  const { toast } = useToast();

  const handleNextClick = () => {
    if (!canContinue && showValidationError && validationError) {
      toast({
        title: "Missing information",
        description: validationError,
        variant: "destructive",
      });
      return;
    }
    handleNext();
  };

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
        <Button 
          onClick={handleNextClick} 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            "Continue"
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
            "Complete Subscription"
          )}
        </Button>
      )}
    </div>
  );
};
