
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/dashboard/DateRangePicker";
import { TieredEndpointSelector } from "@/components/dashboard/TieredEndpointSelector";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";

interface UsageHistoryFiltersProps {
  dateRange: DateRange | undefined;
  endpoint: string;
  onDateRangeChange: (dateRange: DateRange | undefined) => void;
  onEndpointChange: (endpoint: string) => void;
  onSelectLastWeek: () => void;
  onSelectLastMonth: () => void;
  onSelectMTD: () => void;
}

export const UsageHistoryFilters = ({
  dateRange,
  endpoint,
  onDateRangeChange,
  onEndpointChange,
  onSelectLastWeek,
  onSelectLastMonth,
  onSelectMTD
}: UsageHistoryFiltersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Filter your usage history by date range and endpoint</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="w-full lg:w-auto">
            <DatePickerWithRange 
              date={dateRange}
              onDateChange={onDateRangeChange}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={onSelectLastWeek}>
              Last 7 Days
            </Button>
            <Button variant="outline" size="sm" onClick={onSelectLastMonth}>
              Last 30 Days
            </Button>
            <Button variant="outline" size="sm" onClick={onSelectMTD}>
              MTD
            </Button>
          </div>
          
          <div className="w-full lg:w-auto">
            <TieredEndpointSelector 
              value={endpoint} 
              onChange={onEndpointChange} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
