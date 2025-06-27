
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

export const TrialDashboardBanner = () => {
  const { isTrialActive, trialDaysLeft, requestTrialExtension, isFreeUser, isOnPaidPlan } = useTrialAlert();
  
  // Don't show banner if user is on a paid plan
  if (isOnPaidPlan) return null;
  
  // Don't show if trial is not active or user is not on free plan
  if (!isTrialActive || !isFreeUser) return null;
  
  // Only show "Request Extension" button if 2 days or less remaining
  const shouldShowRequestExtension = trialDaysLeft <= 2;
  
  return (
    <Alert className="mb-6 bg-primary-teal/10 border-primary-teal">
      <div className="flex flex-col sm:flex-row w-full">
        <div className="flex-1 mb-4 sm:mb-0">
          <h3 className="font-semibold text-primary-teal">You're on the Free Trial</h3>
          <AlertDescription className="mt-1">
            You have <span className="font-medium text-primary-teal">{trialDaysLeft} days</span> left in your free trial. Choose a plan that fits your needs.
          </AlertDescription>
          <Progress 
            value={(14 - trialDaysLeft) / 14 * 100} 
            className="h-2 mt-3 bg-slate-100" 
            indicatorClassName="bg-primary-teal" 
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:ml-4 sm:self-center">
          <Button asChild className="bg-[#5014d0] hover:bg-[#5014d0]/90">
            <Link to="/dashboard/plan-signup">Choose a Plan</Link>
          </Button>
          {shouldShowRequestExtension && (
            <Button 
              variant="outline" 
              className="border-[#5014d0] text-[#5014d0] hover:bg-[#5014d0]/10"
              onClick={requestTrialExtension}
            >
              Request Extension
            </Button>
          )}
        </div>
      </div>
    </Alert>
  );
};
