
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface UsageProgressBarProps {
  usage: number;
  limit?: number;
  label: string;
  icon: React.ReactNode;
  color: string;
  isMetered?: boolean;
}

export const UsageProgressBar = ({ 
  usage, 
  limit, 
  label, 
  icon,
  color,
  isMetered = false
}: UsageProgressBarProps) => {
  // Only calculate percentage if it's not a metered endpoint and limit exists
  const percentage = (!isMetered && limit) ? (usage / limit) * 100 : 0;
  const isNearLimit = percentage > 90;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        <div className="flex items-center">
          {isMetered ? (
            // For metered endpoints, just show the usage count
            <span className="text-sm">
              {usage.toLocaleString()}
            </span>
          ) : (
            // For limited endpoints, show usage/limit and percentage
            <>
              <span className="text-sm">
                {usage.toLocaleString()} / {limit?.toLocaleString()}
              </span>
              <Badge 
                variant="outline" 
                className={`ml-2 ${isNearLimit ? 'bg-red-50 text-red-600 border-red-200' : `bg-${color}/5 text-${color}`}`}
              >
                {percentage.toFixed(1)}%
              </Badge>
            </>
          )}
        </div>
      </div>
      
      <Progress 
        value={percentage} 
        indicatorClassName={isNearLimit ? 'bg-red-500' : `bg-${color}`}
        showProgressBar={!isMetered}
      />
      
      {isMetered && (
        <div className="text-xs text-muted-foreground mt-1">
          Metered endpoint - charged per usage
        </div>
      )}
    </div>
  );
};
