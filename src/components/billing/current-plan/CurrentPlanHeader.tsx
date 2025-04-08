
import React from "react";
import { Badge } from "@/components/ui/badge";

interface CurrentPlanHeaderProps {
  planName: string;
  addOnCount: number;
  billingCycle: 'monthly' | 'annual';
}

export const CurrentPlanHeader = ({
  planName,
  addOnCount,
  billingCycle
}: CurrentPlanHeaderProps) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-2xl font-bold">Your Current Plan</h2>
        <p className="text-muted-foreground mt-1">
          You're currently on the {planName} plan with {addOnCount} add-ons
        </p>
      </div>
      {billingCycle === 'annual' && (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Annual Billing
        </Badge>
      )}
    </div>
  );
};
