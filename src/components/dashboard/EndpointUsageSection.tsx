
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EndpointList } from "./EndpointList";
import { EndpointUsageItem } from "@/types/usage";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface EndpointUsageSectionProps {
  endpointUsage: EndpointUsageItem[];
  isLoading?: boolean;
}

type TimePeriod = 'mtd' | 'ytd' | 'all';

export const EndpointUsageSection = ({ endpointUsage = [], isLoading = false }: EndpointUsageSectionProps) => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('mtd');
  
  // Calculate total records for correct percentage calculations
  const totalRecords = endpointUsage.reduce((sum, endpoint) => sum + endpoint.records, 0);

  // Update percentages based on the total
  const endpointUsageWithCorrectPercentages = endpointUsage.map(endpoint => ({
    ...endpoint,
    percentage: totalRecords > 0 ? Math.round((endpoint.records / totalRecords) * 100 * 10) / 10 : 0
  }));

  // Get time period display text
  const getTimePeriodText = () => {
    switch (timePeriod) {
      case 'mtd': return 'Month to Date';
      case 'ytd': return 'Year to Date';
      case 'all': return 'All Time';
      default: return 'Month to Date';
    }
  };

  // If data is empty, show an appropriate message
  if (endpointUsageWithCorrectPercentages?.length === 0 && !isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Endpoint Usage</CardTitle>
          </div>
          <CardDescription>
            Breakdown by endpoint with credit usage details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-12 text-muted-foreground">
            No endpoint usage data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Endpoint Usage</CardTitle>
            <CardDescription>
              Breakdown by endpoint with credit usage details ({getTimePeriodText()})
            </CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">Only property records fetched count toward your plan limit. Some endpoints like Autocomplete and Count-only queries are free and don't consume credits.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex justify-start mt-2">
          <ToggleGroup type="single" value={timePeriod} onValueChange={(value) => value && setTimePeriod(value as TimePeriod)}>
            <ToggleGroupItem value="mtd" aria-label="Month to Date">
              Month to Date
            </ToggleGroupItem>
            <ToggleGroupItem value="ytd" aria-label="Year to Date">
              Year to Date
            </ToggleGroupItem>
            <ToggleGroupItem value="all" aria-label="All Time">
              All Time
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <EndpointList 
          endpoints={endpointUsageWithCorrectPercentages} 
          isLoading={isLoading} 
        />
      </CardContent>
    </Card>
  );
};
