
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, FileBarChart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DemographicUsageSummaryProps {
  skipTraceHits: number;
  skipTraceRequests: number;
  isLoading: boolean;
}

export const DemographicUsageSummary = ({
  skipTraceHits,
  skipTraceRequests,
  isLoading
}: DemographicUsageSummaryProps) => {
  return (
    <>
      {/* Today's Skip Trace Hits */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Today's Successful Skip Trace Hits
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-2xl font-bold">{skipTraceHits.toLocaleString()}</div>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Successful people lookups today
          </p>
        </CardContent>
      </Card>

      {/* Skip Trace Requests */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Today's Skip Trace Requests
          </CardTitle>
          <FileBarChart className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-2xl font-bold">{skipTraceRequests.toLocaleString()}</div>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Total skip trace lookups attempted
          </p>
          <div className="mt-2">
            <div className="text-xs text-muted-foreground flex justify-between">
              <span>Success rate:</span>
              <span className="font-medium text-emerald-600">
                {skipTraceRequests > 0 
                  ? Math.round((skipTraceHits / skipTraceRequests) * 100) 
                  : 0}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
