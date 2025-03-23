
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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
}

export const RecentActivityList = ({ activities }: RecentActivityListProps) => {
  return (
    <ScrollArea className="h-[240px] px-6">
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
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.endpoint}
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.timestamp}
              </p>
              <div className="flex items-center gap-2 pt-1">
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
    </ScrollArea>
  );
};
