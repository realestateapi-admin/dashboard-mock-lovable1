
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const PlanSummaryLoading = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-10 w-full" />
      <div className="space-y-2 mt-6">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
};
