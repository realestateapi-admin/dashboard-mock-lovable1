
import React from "react";
import { ArrowRightLeft } from "lucide-react";

interface PlanChangeIndicatorProps {
  hasChanges: boolean;
  planChanged: boolean;
  addOnsChanged: boolean;
  overageChanged: boolean;
}

export const PlanChangeIndicator = ({ 
  hasChanges, 
  planChanged, 
  addOnsChanged, 
  overageChanged 
}: PlanChangeIndicatorProps) => {
  if (!hasChanges) return null;
  
  // Create message that specifies what changed
  let message = "Plan has been changed";
  if (planChanged && addOnsChanged && overageChanged) {
    message = "Plan, add-ons, and overage settings have been changed";
  } else if (planChanged && addOnsChanged) {
    message = "Plan and add-ons have been changed";
  } else if (planChanged && overageChanged) {
    message = "Plan and overage settings have been changed";
  } else if (addOnsChanged && overageChanged) {
    message = "Add-ons and overage settings have been changed";
  } else if (planChanged) {
    message = "Plan has been changed";
  } else if (addOnsChanged) {
    message = "Add-ons have been changed";
  } else if (overageChanged) {
    message = "Overage settings have been changed";
  }
  
  return (
    <div className="flex items-center justify-center gap-2 py-2">
      <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  );
};
