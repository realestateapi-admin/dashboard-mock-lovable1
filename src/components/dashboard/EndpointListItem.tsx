
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { EndpointUsageItem } from "@/types/usage";

interface EndpointListItemProps {
  endpoint: EndpointUsageItem;
}

export const EndpointListItem = ({ endpoint }: EndpointListItemProps) => {
  const isMobile = useIsMobile();

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
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
        <div>
          <div className="flex items-center gap-2">
            {getEndpointIcon(endpoint.endpoint) && (
              <img 
                src={getEndpointIcon(endpoint.endpoint)}
                alt={endpoint.endpoint}
                className="h-5 w-5"
                loading="lazy"
              />
            )}
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>{endpoint.endpoint}</p>
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
          <div className={`flex ${isMobile ? 'flex-col' : 'gap-4'}`}>
            <div className="flex gap-2 items-baseline">
              <span className="text-xs text-muted-foreground">Calls:</span>
              <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>{endpoint.calls.toLocaleString()}</span>
            </div>
            <div className="flex gap-2 items-baseline">
              <span className="text-xs text-muted-foreground">Records:</span>
              <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>{endpoint.records.toLocaleString()}</span>
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
            className="h-full bg-[#04c8c8] rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${endpoint.percentage}%` }}
          />
        </div>
      )}
    </div>
  );
};
