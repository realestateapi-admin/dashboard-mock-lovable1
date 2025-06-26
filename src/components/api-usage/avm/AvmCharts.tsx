
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardSkeleton } from '@/components/dashboard/LoadingState';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { UsageChartTabs } from '@/components/dashboard/charts/UsageChartTabs';

interface AvmChartsProps {
  dailyUsageData: any[];
  monthlyUsageData: any[];
  isLoading: boolean;
}

export const AvmCharts = ({ 
  dailyUsageData, 
  monthlyUsageData, 
  isLoading 
}: AvmChartsProps) => {
  const [currentTimePeriod, setCurrentTimePeriod] = useState<'daily' | 'monthly'>('daily');
  
  const handleTabsChange = (value: string) => {
    if (value === 'daily' || value === 'monthly') {
      setCurrentTimePeriod(value);
    }
  };

  if (isLoading) {
    return <CardSkeleton />;
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Usage Analytics</CardTitle>
        <CardDescription>
          API calls vs. AVM records
        </CardDescription>
        <Tabs 
          defaultValue={currentTimePeriod} 
          value={currentTimePeriod}
          onValueChange={handleTabsChange}
          className="mt-3"
        >
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <DashboardProvider 
            dailyUsageData={dailyUsageData}
            monthlyUsageData={monthlyUsageData}
            endpointUsage={[]}
            recentActivity={[]}
            usageDistributionData={[]}
          >
            <UsageChartTabs 
              isLoading={isLoading}
              dailyUsageData={dailyUsageData}
              monthlyUsageData={monthlyUsageData}
            />
          </DashboardProvider>
        </Tabs>
      </CardHeader>
    </Card>
  );
};
