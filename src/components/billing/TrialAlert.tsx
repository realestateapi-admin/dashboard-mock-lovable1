
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TrialAlertProps {
  isTrialActive: boolean;
  trialDaysLeft: number;
  requestTrialExtension: () => void;
  isOnPaidPlan?: boolean;
}

export const TrialAlert = ({ 
  isTrialActive, 
  trialDaysLeft, 
  requestTrialExtension,
  isOnPaidPlan = false
}: TrialAlertProps) => {
  // Don't show alert if user is on a paid plan
  if (isOnPaidPlan || !isTrialActive) return null;

  return (
    <Alert className="bg-primary-teal/10 border-primary-teal">
      <AlertCircle className="h-4 w-4 text-primary-teal" />
      <AlertTitle className="text-primary-teal">Trial Mode Active</AlertTitle>
      <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-4">
        <span>You have {trialDaysLeft} days left in your trial. Select a plan to continue after your trial ends.</span>
        <Button size="sm" variant="outline" onClick={requestTrialExtension}>
          Request Extension
        </Button>
      </AlertDescription>
    </Alert>
  );
};
