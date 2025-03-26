
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsageReport } from '@/types/usage';
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { CurrentUsageTab } from './usage/CurrentUsageTab';
import { HistoryUsageTab } from './usage/HistoryUsageTab';

interface UsageTrackingProps {
  currentUsage: UsageReport | null;
  usageHistory: UsageReport[] | null;
  isLoading: boolean;
  error: Error | null;
  onRefresh: () => void;
  limits?: {
    property: number;
    skiptrace: number;
  };
}

const UsageTracking: React.FC<UsageTrackingProps> = ({
  currentUsage,
  usageHistory,
  isLoading,
  error,
  onRefresh,
  limits = { property: 150000, skiptrace: 5000 }
}) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM d, yyyy');
  };
  
  // Handle error
  if (error) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="h-5 w-5" />
            <p>Failed to load usage data. Please try again.</p>
          </div>
          <Button variant="outline" size="sm" className="mt-4" onClick={onRefresh}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">API Usage Tracking</CardTitle>
            <CardDescription>
              {currentUsage 
                ? `Billing period: ${formatDate(currentUsage.billing_period_start)} - ${formatDate(currentUsage.billing_period_end)}`
                : 'Loading your current usage data...'
              }
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh} 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </div>
            ) : null}
            Refresh
          </Button>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="current">
        <CardContent>
          <TabsList className="mb-4">
            <TabsTrigger value="current">Current Usage</TabsTrigger>
            <TabsTrigger value="history">Historical Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-6">
            <CurrentUsageTab 
              currentUsage={currentUsage}
              isLoading={isLoading}
              formatDate={formatDate}
              limits={limits}
            />
          </TabsContent>
          
          <TabsContent value="history">
            <HistoryUsageTab 
              usageHistory={usageHistory}
              isLoading={isLoading}
            />
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        <div className="w-full flex justify-end">
          <span>Account ID: {currentUsage?.account_id || 'Unknown'}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UsageTracking;
