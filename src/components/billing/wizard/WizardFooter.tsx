
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface WizardFooterProps {
  currentStep: number;
  totalSteps: number;
  handleBack: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
  isLoading?: boolean;
  canContinue?: boolean;
  validationError?: string;
}

export const WizardFooter = ({ 
  currentStep, 
  totalSteps, 
  handleBack, 
  handleNext,
  handleSubmit,
  isLoading = false,
  canContinue = true,
  validationError
}: WizardFooterProps) => {
  return (
    <div className="space-y-4">
      {/* Show validation error message when user cannot continue */}
      {!canContinue && validationError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {validationError}
          </AlertDescription>
        </Alert>
      )}
      
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
            onClick={handleNext} 
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
    </div>
  );
};
