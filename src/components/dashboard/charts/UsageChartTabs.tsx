
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { DailyUsageChart } from "./DailyUsageChart";
import { MonthlyUsageChart } from "./MonthlyUsageChart";
import { ChartSkeleton } from "./ChartSkeleton";

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
  return (
    <>
      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <>
          <TabsContent value="daily" className="pt-4">
            <DailyUsageChart dailyUsageData={dailyUsageData} />
          </TabsContent>
          <TabsContent value="monthly" className="pt-4">
            <MonthlyUsageChart monthlyUsageData={monthlyUsageData} />
          </TabsContent>
        </>
      )}
    </>
  );
};
