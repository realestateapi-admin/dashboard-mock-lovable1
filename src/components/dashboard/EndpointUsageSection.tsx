
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

interface EndpointUsage {
  endpoint: string;
  calls: number;
  records: number;
  percentage: number;
  description: string;
  creditCost: string;
}

interface EndpointUsageSectionProps {
  endpointUsage: EndpointUsage[];
}

export const EndpointUsageSection = ({ endpointUsage }: EndpointUsageSectionProps) => {
  // Helper function to get icon path based on endpoint
  const getEndpointIcon = (endpoint: string) => {
    if (endpoint.includes("Autocomplete")) {
      return "/icons/address-auto.svg";
    } else if (endpoint.includes("Comps")) {
      return "/icons/ps3.svg";
    } else if (endpoint.includes("Search")) {
      return "/icons/ps.svg";
    } else if (endpoint.includes("Detail")) {
      return "/icons/ps2.svg";
    } else if (endpoint.includes("Count") || endpoint.includes("Pin")) {
      return "/icons/map-pin.svg";
    }
    return "";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Endpoint Usage</CardTitle>
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
        <CardDescription>
          Breakdown by endpoint with credit usage details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {endpointUsage.map((endpoint) => (
          <div key={endpoint.endpoint} className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
              <div>
                <div className="flex items-center gap-2">
                  {getEndpointIcon(endpoint.endpoint) && (
                    <img 
                      src={getEndpointIcon(endpoint.endpoint)}
                      alt={endpoint.endpoint}
                      className="h-5 w-5"
                    />
                  )}
                  <p className="text-sm font-medium">{endpoint.endpoint}</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                          <Info className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{endpoint.description}</p>
                        <p className="text-xs font-medium mt-1">{endpoint.creditCost}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-xs text-muted-foreground">{endpoint.description}</p>
              </div>
              <div className="flex flex-col sm:items-end gap-1 mt-1 sm:mt-0">
                <div className="flex gap-4">
                  <div className="flex gap-2 items-baseline">
                    <span className="text-xs text-muted-foreground">Calls:</span>
                    <span className="text-sm">{endpoint.calls.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2 items-baseline">
                    <span className="text-xs text-muted-foreground">Records:</span>
                    <span className="text-sm">{endpoint.records.toLocaleString()}</span>
                  </div>
                </div>
                {endpoint.records > 0 && (
                  <Badge variant="outline" className="text-xs bg-primary-teal/10 text-primary-teal">
                    {endpoint.percentage}% of record usage
                  </Badge>
                )}
              </div>
            </div>
            {endpoint.records > 0 && (
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#04c8c8] rounded-full"
                  style={{ width: `${endpoint.percentage}%` }}
                />
              </div>
            )}
          </div>
        ))}
        
        <div className="pt-2">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/dashboard/usage">
              View Detailed Usage Analytics
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
