
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UsageHistoryTable } from "@/components/dashboard/UsageHistoryTable";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { UsageHistoryEntry } from "@/types/usage";

interface UsageHistoryContentProps {
  dateRange: DateRange | undefined;
  data: UsageHistoryEntry[];
}

export const UsageHistoryContent = ({ dateRange, data }: UsageHistoryContentProps) => {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Usage Data</CardTitle>
          <CardDescription>
            {dateRange?.from && dateRange?.to
              ? `From ${format(dateRange.from, 'MMM d, yyyy')} to ${format(dateRange.to, 'MMM d, yyyy')}`
              : 'Select a date range'}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <UsageHistoryTable data={data} />
      </CardContent>
    </Card>
  );
};
