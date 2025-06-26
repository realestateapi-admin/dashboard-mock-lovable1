
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Database } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AvmUsageSummaryProps {
  totalApiCalls: number;
  totalRecords: number;
  recordsLimit: number;
  increasePercentage: number;
  isLoading?: boolean;
}

export const AvmUsageSummary = ({
  totalApiCalls,
  totalRecords,
  recordsLimit,
  increasePercentage,
  isLoading = false
}: AvmUsageSummaryProps) => {
  const recordsPercentage = (totalRecords / recordsLimit) * 100;
  
  if (isLoading) {
    return (
      <>
        <div className="animate-pulse">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        </div>
        <div className="animate-pulse">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Today's AVM Records Used</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRecords.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            +{increasePercentage}% from yesterday
          </p>
          <div className="mt-4 h-1 w-full bg-secondary">
            <div
              className="h-1 bg-primary-teal"
              style={{ width: `${recordsPercentage}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{recordsPercentage.toFixed(1)}% of monthly limit used MTD</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-500 border-yellow-200">Credits</Badge>
                  <p className="text-xs text-muted-foreground">Counts against your plan</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[200px]">Only AVM records actually fetched count against your monthly plan allowance. Each record costs 1 credit.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
      
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Today's API Calls</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalApiCalls.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            +{increasePercentage}% from yesterday
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary-teal/5 text-primary-teal">Info</Badge>
                  <p className="text-xs text-muted-foreground">Includes all API requests</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[200px]">API calls include all requests for AVM data and related services.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
    </>
  );
};
