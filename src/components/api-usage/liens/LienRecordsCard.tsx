
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface LienRecordsCardProps {
  lienRecords: number;
  isLoading: boolean;
}

export const LienRecordsCard = ({
  lienRecords,
  isLoading
}: LienRecordsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Today's Lien Records
        </CardTitle>
        <FileText className="h-4 w-4 text-green-500" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <div className="text-2xl font-bold">{lienRecords.toLocaleString()}</div>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Number of liens retrieved across today's requests
        </p>
      </CardContent>
    </Card>
  );
};
