
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

interface ActiveEndUsersCardProps {
  activeEndUsers: number | null;
  isLoading: boolean;
}

export const ActiveEndUsersCard = ({
  activeEndUsers,
  isLoading
}: ActiveEndUsersCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Active End Users (Today)</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <div className="text-2xl font-bold">
            {activeEndUsers !== null ? activeEndUsers.toLocaleString() : "N/A"}
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          {activeEndUsers !== null 
            ? "Unique end users today" 
            : "No end user data available"}
        </p>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="mt-4 flex items-center gap-2">
                {activeEndUsers !== null ? (
                  <Badge variant="outline" className="bg-primary-teal/5 text-primary-teal">Active</Badge>
                ) : (
                  <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Missing X-User ID</Badge>
                )}
                <p className="text-xs text-muted-foreground">
                  {activeEndUsers !== null 
                    ? "X-User ID is being passed correctly" 
                    : "Include X-User ID in requests to track"}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[250px]">
              <p className="text-xs">
                {activeEndUsers !== null 
                  ? "You're successfully passing X-User ID in your API requests, which allows tracking end user activity." 
                  : "To track end user activity, you must include an X-User ID header in your API requests. This helps identify unique users and provides valuable analytics."}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};
