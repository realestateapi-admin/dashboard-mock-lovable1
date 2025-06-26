
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileBarChart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface LiensUsageSummaryProps {
  propertyLiensRequests: number;
  isLoading: boolean;
}

export const LiensUsageSummary = ({
  propertyLiensRequests,
  isLoading
}: LiensUsageSummaryProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Today's Property Liens Requests
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
          Total liens retrieved today
        </p>
      </CardContent>
    </Card>
  );
};
