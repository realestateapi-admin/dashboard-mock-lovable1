
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboard } from "@/contexts/DashboardContext";
import { UsageChartTabs } from "./charts/UsageChartTabs";

interface UsageChartsProps {
  isLoading?: boolean;
}

export const UsageCharts = ({ 
  isLoading = false 
}: UsageChartsProps) => {
  const { dailyUsageData, monthlyUsageData } = useDashboard();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Usage Analytics</CardTitle>
        <CardDescription>
          API calls vs. property records used
        </CardDescription>
        <Tabs defaultValue="daily" className="mt-3">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <UsageChartTabs 
            isLoading={isLoading}
            dailyUsageData={dailyUsageData}
            monthlyUsageData={monthlyUsageData}
          />
        </Tabs>
      </CardHeader>
    </Card>
  );
};
