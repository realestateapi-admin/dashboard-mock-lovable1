
import React from 'react';
import { Info, Database, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UsageProgressBar } from './UsageProgressBar';
import { UsageReport } from '@/types/usage';

interface CurrentUsageTabProps {
  currentUsage: UsageReport | null;
  isLoading: boolean;
  formatDate: (dateString: string) => string;
  limits: {
    property: number;
    skiptrace: number;
  };
}

export const CurrentUsageTab = ({ 
  currentUsage, 
  isLoading, 
  formatDate,
  limits
}: CurrentUsageTabProps) => {
  const { toast } = useToast();
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin text-primary-teal mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">Loading usage data...</p>
      </div>
    );
  } 
  
  if (!currentUsage) {
    return <p>No usage data available</p>;
  }

  return (
    <>
      <div className="space-y-5">
        <UsageProgressBar
          usage={currentUsage.property_usage}
          limit={limits.property}
          label="Property Records"
          icon={<Database className="h-4 w-4 text-primary-teal" />}
          color="primary-teal"
        />
        
        <UsageProgressBar
          usage={currentUsage.skiptrace_usage}
          limit={limits.skiptrace}
          label="Skiptrace Records"
          icon={<Database className="h-4 w-4 text-indigo-500" />}
          color="indigo-500"
        />
      </div>
      
      <div className="bg-muted/50 rounded-lg p-4 flex items-start gap-2 mt-4">
        <Info className="h-5 w-5 text-primary-teal flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">Usage Information</p>
          <p className="text-sm text-muted-foreground mt-1">
            These usage statistics show your consumption for the current billing period. Property records include all property search, detail, and comps API calls. Skiptrace records include all person and contact lookups.
          </p>
          <Button 
            variant="link" 
            size="sm" 
            className="px-0 h-auto text-primary-teal" 
            onClick={() => {
              toast({
                title: "Usage Metrics Information",
                description: "A usage report is generated every day. Record counts and API calls are accurate as of the last update date shown above.",
              });
            }}
          >
            Learn more about usage metrics <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground mt-2 text-right italic">
        Last updated: {currentUsage.last_update_date ? formatDate(currentUsage.last_update_date) : 'Unknown'}
      </div>
    </>
  );
};
