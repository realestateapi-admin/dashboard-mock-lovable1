
import React from "react";
import { ArrowRightLeft } from "lucide-react";

interface PlanChangeIndicatorProps {
  hasChanges: boolean;
}

export const PlanChangeIndicator = ({ hasChanges }: PlanChangeIndicatorProps) => {
  if (!hasChanges) return null;
  
  return (
    <div className="flex items-center justify-center gap-2 py-2">
      <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Plan has been changed</span>
    </div>
  );
};
