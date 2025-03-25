
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { DailyUsageChart } from "./DailyUsageChart";
import { MonthlyUsageChart } from "./MonthlyUsageChart";
import { ChartSkeleton } from "./ChartSkeleton";
import { useDashboard } from "@/contexts/DashboardContext";

interface UsageChartTabsProps {
  isLoading: boolean;
  dailyUsageData: any[];
  monthlyUsageData: any[];
}

export const UsageChartTabs = ({ 
  isLoading,
  dailyUsageData,
  monthlyUsageData
}: UsageChartTabsProps) => {
  const { setCurrentTimePeriod } = useDashboard();

  // Handle tab changes and update the context
  const handleTabChange = (value: string) => {
    if (value === 'daily' || value === 'monthly') {
      setCurrentTimePeriod(value);
    }
  };

  return (
    <>
      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <>
          <TabsContent 
            value="daily" 
            className="pt-4" 
            onFocus={() => handleTabChange('daily')}
          >
            <DailyUsageChart dailyUsageData={dailyUsageData} />
          </TabsContent>
          <TabsContent 
            value="monthly" 
            className="pt-4"
            onFocus={() => handleTabChange('monthly')}
          >
            <MonthlyUsageChart monthlyUsageData={monthlyUsageData} />
          </TabsContent>
        </>
      )}
    </>
  );
};
