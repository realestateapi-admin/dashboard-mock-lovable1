
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
  if (isOnPaidPlan || (!isTrialActive || !isFreeUser)) return null;
  
  return (
    <Alert className="bg-[#04c8c8]/10 border-[#04c8c8]">
      <AlertCircle className="h-4 w-4 text-[#04c8c8]" />
      <AlertTitle className="text-[#04c8c8] font-medium">Free Plan Active</AlertTitle>
      <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p>You have <span className="font-medium text-[#04c8c8]">{trialDaysLeft} days</span> left in your free period.</p>
          <Progress value={(14 - trialDaysLeft) / 14 * 100} className="h-2 mt-2 bg-[#e2e8f0]" indicatorClassName="bg-[#04c8c8]" />
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <Button size="sm" className="bg-[#5014d0] hover:bg-[#5014d0]/90" asChild>
            <Link to="/dashboard/billing">Upgrade Now</Link>
          </Button>
          <Button size="sm" variant="outline" className="text-[#5014d0] border-[#5014d0] hover:bg-[#5014d0]/10" onClick={requestTrialExtension}>
            Request Extension
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
