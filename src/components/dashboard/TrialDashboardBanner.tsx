
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
  
  // Determine colors based on trial days left
  const isExpired = trialDaysLeft <= 0;
  const isUrgent = trialDaysLeft <= 2 && trialDaysLeft > 0;
  
  const alertClasses = isExpired 
    ? "mb-6 bg-red-50 border-red-500"
    : isUrgent 
    ? "mb-6 bg-orange-50 border-orange-500"
    : "mb-6 bg-primary-teal/10 border-primary-teal";
    
  const titleColor = isExpired 
    ? "text-red-700"
    : isUrgent 
    ? "text-orange-700"
    : "text-primary-teal";
    
  const textColor = isExpired 
    ? "text-red-600"
    : isUrgent 
    ? "text-orange-600"
    : "text-primary-teal";
  
  return (
    <Alert className={alertClasses}>
      <div className="flex flex-col sm:flex-row w-full">
        <div className="flex-1 mb-4 sm:mb-0">
          <h3 className={`font-semibold ${titleColor}`}>
            {isExpired ? "Free Trial Expired" : "You're on the Free Trial"}
          </h3>
          <AlertDescription className="mt-1">
            {isExpired ? (
              "Your free trial has ended. Choose a plan to continue accessing all features."
            ) : (
              <>
                You have <span className={`font-medium ${textColor}`}>{trialDaysLeft} days</span> left in your free trial. Choose a plan that fits your needs.
              </>
            )}
          </AlertDescription>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:ml-4 sm:self-center">
          <Button asChild className="bg-[#5014d0] hover:bg-[#5014d0]/90">
            <Link to="/dashboard/plan-signup">Choose a Plan</Link>
          </Button>
          {shouldShowRequestExtension && !isExpired && (
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
