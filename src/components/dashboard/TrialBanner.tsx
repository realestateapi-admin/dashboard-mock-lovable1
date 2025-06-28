
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TrialBannerProps {
  isTrialActive: boolean;
  trialDaysLeft: number;
  requestTrialExtension: () => void;
  isFreeUser?: boolean;
  isOnPaidPlan?: boolean;
}

export const TrialBanner = ({ 
  isTrialActive, 
  trialDaysLeft, 
  requestTrialExtension,
  isFreeUser = true,
  isOnPaidPlan = false
}: TrialBannerProps) => {
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
    ? "bg-red-50 border-red-500"
    : isUrgent 
    ? "bg-orange-50 border-orange-500"
    : "bg-[#04c8c8]/10 border-[#04c8c8]";
    
  const iconColor = isExpired 
    ? "text-red-500"
    : isUrgent 
    ? "text-orange-500"
    : "text-[#04c8c8]";
    
  const titleColor = isExpired 
    ? "text-red-700"
    : isUrgent 
    ? "text-orange-700"
    : "text-[#04c8c8]";
    
  const textColor = isExpired 
    ? "text-red-600"
    : isUrgent 
    ? "text-orange-600"
    : "text-[#04c8c8]";
    
  const progressColor = isExpired 
    ? "bg-red-500"
    : isUrgent 
    ? "bg-orange-500"
    : "bg-[#04c8c8]";
  
  return (
    <Alert className={alertClasses}>
      <AlertCircle className={`h-4 w-4 ${iconColor}`} />
      <AlertTitle className={`${titleColor} font-medium`}>
        {isExpired ? "Free Plan Expired" : "Free Plan Active"}
      </AlertTitle>
      <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          {isExpired ? (
            <p>Your free trial has ended. Upgrade now to continue accessing all features.</p>
          ) : (
            <>
              <p>You have <span className={`font-medium ${textColor}`}>{trialDaysLeft} days</span> left in your free period.</p>
              <Progress value={(14 - trialDaysLeft) / 14 * 100} className="h-2 mt-2 bg-[#e2e8f0]" indicatorClassName={progressColor} />
            </>
          )}
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <Button size="sm" className="bg-[#5014d0] hover:bg-[#5014d0]/90" asChild>
            <Link to="/dashboard/plan-signup">
              {isExpired ? "Choose a Plan" : "Upgrade Now"}
            </Link>
          </Button>
          {shouldShowRequestExtension && !isExpired && (
            <Button size="sm" variant="outline" className="text-[#5014d0] border-[#5014d0] hover:bg-[#5014d0]/10" onClick={requestTrialExtension}>
              Request Extension
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};
