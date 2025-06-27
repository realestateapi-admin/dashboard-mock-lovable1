
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileBarChart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface LiensUsageSummaryProps {
  lienRecords: number;
  propertyLiensRequests: number;
  isLoading: boolean;
}

export const LiensUsageSummary = ({
  lienRecords,
  propertyLiensRequests,
  isLoading
}: LiensUsageSummaryProps) => {
  return (
    <>
      {/* Today's Lien Records */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Today's Lien Records
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-2xl font-bold">{lienRecords.toLocaleString()}</div>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Total lien records retrieved today
          </p>
        </CardContent>
      </Card>

      {/* Liens Requests */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Today's Liens Requests
          </CardTitle>
          <FileBarChart className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-2xl font-bold">{propertyLiensRequests.toLocaleString()}</div>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Total lien searches attempted
          </p>
          <div className="mt-2">
            <div className="text-xs text-muted-foreground flex justify-between">
              <span>Success rate:</span>
              <span className="font-medium text-emerald-600">
                {propertyLiensRequests > 0 
                  ? Math.round((lienRecords / propertyLiensRequests) * 100) 
                  : 0}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
