
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivitySkeleton } from "./LoadingState";
import { useIsMobile } from "@/hooks/use-mobile";

interface ActivityItem {
  id: number;
  type: string;
  endpoint: string;
  timestamp: string;
  status: string;
  recordsFetched: number;
  creditCost: number;
}

interface RecentActivityListProps {
  activities: ActivityItem[];
  isLoading?: boolean;
}

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

export const RecentActivityList = ({ activities, isLoading = false }: RecentActivityListProps) => {
  const isMobile = useIsMobile();
  
  return (
    <ScrollArea className={`h-[240px] ${isMobile ? 'px-2' : 'px-6'}`}>
      {isLoading ? (
        <ActivitySkeleton />
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className={`mt-1.5 h-2 w-2 rounded-full ${
                activity.status === "success" ? "bg-green-500" :
                activity.status === "warning" ? "bg-yellow-500" :
                "bg-red-500"
              }`} />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  {getEndpointIcon(activity.endpoint) && (
                    <img 
                      src={getEndpointIcon(activity.endpoint)} 
                      alt={activity.endpoint} 
                      className="h-5 w-5" 
                      loading="lazy"
                    />
                  )}
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium leading-none`}>
                    {activity.endpoint}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Badge variant="outline" className="text-xs">
                    {activity.type === "api_call" ? "API Call" :
                     activity.type === "rate_limit" ? "Rate Limited" :
                     "Error"}
                  </Badge>
                  {activity.recordsFetched > 0 && (
                    <Badge className="text-xs bg-primary-teal">
                      {activity.recordsFetched} {activity.recordsFetched === 1 ? 'Record' : 'Records'}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
};
