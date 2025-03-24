
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export const ChartSkeleton = () => {
  return (
    <div className="pt-4">
      <Skeleton className="w-full h-[240px]" />
    </div>
  );
};
