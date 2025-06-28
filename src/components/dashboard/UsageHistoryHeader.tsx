
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface UsageHistoryHeaderProps {
  dateRange: DateRange | undefined;
  endpoint: string;
  onBackToUsage: () => void;
  onExport: () => void;
}

export const UsageHistoryHeader = ({ 
  dateRange, 
  endpoint, 
  onBackToUsage, 
  onExport 
}: UsageHistoryHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">API Usage History</h2>
        <p className="text-muted-foreground">
          View detailed history of your API usage over time
        </p>
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <Button onClick={onBackToUsage} variant="outline" className="w-full sm:w-auto">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Usage
        </Button>
      </div>
    </div>
  );
};
