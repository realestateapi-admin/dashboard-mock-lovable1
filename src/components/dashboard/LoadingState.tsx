
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const CardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Card className={className}>
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );
};

export const ChartSkeleton = () => {
  return (
    <div className="space-y-4 py-6">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-[240px] w-full" />
    </div>
  );
};

export const UsageBreakdownSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Skeleton className="h-[180px] w-[180px] rounded-full" />
      </div>
      <div className="space-y-2 mt-4">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ActivitySkeleton = () => {
  return (
    <div className="px-6 space-y-4">
      {Array(3).fill(0).map((_, i) => (
        <div key={i} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
          <Skeleton className="mt-1.5 h-2 w-2 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-3 w-24" />
            <div className="flex items-center gap-2 pt-1">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const EndpointUsageSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array(4).fill(0).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
            <div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-4 w-40" />
              </div>
              <Skeleton className="h-3 w-48 mt-1" />
            </div>
            <div className="flex flex-col sm:items-end gap-1 mt-1 sm:mt-0">
              <div className="flex gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
};

export const TableSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full rounded-md" />
      <div className="space-y-2">
        <div className="flex gap-4 items-center py-3 border-b">
          {Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-5 w-20" />
          ))}
        </div>
        {Array(10).fill(0).map((_, i) => (
          <div key={i} className="flex gap-4 items-center py-4 border-b last:border-0">
            {Array(6).fill(0).map((_, j) => (
              <Skeleton key={j} className="h-4 w-24" />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-10 w-64" />
      </div>
    </div>
  );
};

export const FiltersSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="flex flex-wrap gap-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-48" />
      </div>
    </div>
  );
};

export const LoadingPage = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <FiltersSkeleton />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-8 w-32" />
        </CardHeader>
        <CardContent>
          <TableSkeleton />
        </CardContent>
      </Card>
    </div>
  );
};
