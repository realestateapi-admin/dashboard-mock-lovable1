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
  userScopes?: string[];
  dataCategory?: 'property' | 'avm';
}

type TimePeriod = 'mtd' | 'ytd' | 'all';

export const EndpointUsageSection = ({ 
  endpointUsage = [], 
  isLoading = false,
  userScopes = [],
  dataCategory = 'property'
}: EndpointUsageSectionProps) => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('mtd');
  
  // Define endpoints by category
  const propertyEndpoints = [
    "Property Search",
    "Property Detail", 
    "Property Detail Bulk",
    "Property Comps",
    "CSV Generator",
    "PropGPT",
    "Address Verification",
    "Property Portfolio",
    "Property Boundary"
  ];

  const avmEndpoints = [
    "Lender Grade AVM",
    "Bulk Lender grade AVM"
  ];

  // Get the relevant endpoints for the current data category
  const relevantEndpoints = dataCategory === 'property' ? propertyEndpoints : avmEndpoints;

  // Create a complete list of endpoints for the current category, adding missing ones with zero usage
  const completeEndpointUsage = relevantEndpoints.map(endpoint => {
    const existingEndpoint = endpointUsage.find(item => item.endpoint === endpoint);
    if (existingEndpoint) {
      return {
        ...existingEndpoint,
        isEnabled: userScopes.includes(endpoint)
      };
    }
    
    // Add missing endpoints with zero usage
    return {
      endpoint,
      description: getEndpointDescription(endpoint),
      calls: 0,
      records: 0,
      percentage: 0,
      creditCost: getCreditCost(endpoint),
      isEnabled: userScopes.includes(endpoint)
    };
  });

  // Calculate total records for correct percentage calculations
  const totalRecords = completeEndpointUsage.reduce((sum, endpoint) => sum + endpoint.records, 0);

  // Update percentages based on the total
  const endpointUsageWithCorrectPercentages = completeEndpointUsage.map(endpoint => ({
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

// Helper function to get endpoint description
function getEndpointDescription(endpoint: string): string {
  switch(endpoint) {
    case "Property Search":
      return "Search for properties with various criteria";
    case "Property Detail":
      return "Access detailed property information";
    case "Property Detail Bulk":
      return "Access detailed property information in bulk";
    case "Property Comps":
      return "Access comparable properties data";
    case "CSV Generator":
      return "Export data to CSV format";
    case "PropGPT":
      return "AI-powered property insights and analysis";
    case "Address Verification":
      return "Verify and standardize addresses";
    case "Property Portfolio":
      return "Manage and analyze property portfolios";
    case "Property Boundary":
      return "Access property boundary information";
    case "Auto Complete":
      return "Use address auto-completion";
    case "Lender Grade AVM":
      return "Access automated valuation model for lending";
    case "Bulk Lender grade AVM":
      return "Access bulk automated valuation model for lending";
    default:
      return "Additional API functionality";
  }
}

// Helper function to get credit cost
function getCreditCost(endpoint: string): string {
  switch(endpoint) {
    case "Auto Complete":
      return "Free";
    case "Property Boundary":
      return "2 credits per record";
    case "Property Maps":
      return "3 credits per record";
    default:
      return "1 credit per record";
  }
}
