
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { UsageCharts } from '@/components/dashboard/UsageCharts';
import { CardSkeleton } from '@/components/dashboard/LoadingState';
import { DashboardProvider } from '@/contexts/DashboardContext';

interface ApiUsageChartsProps {
  dailyUsageData: any[];
  monthlyUsageData: any[];
  usageDistributionData: any[];
  isLoading: boolean;
}

export const ApiUsageCharts = ({ 
  dailyUsageData, 
  monthlyUsageData, 
  usageDistributionData, 
  isLoading 
}: ApiUsageChartsProps) => {
  // Track the currently selected time period
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<'daily' | 'monthly'>('daily');
  
  // Handler for when time period changes in the Usage Charts component
  const handleTimePeriodChange = (period: 'daily' | 'monthly') => {
    setSelectedTimePeriod(period);
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <DashboardProvider 
          dailyUsageData={dailyUsageData}
          monthlyUsageData={monthlyUsageData}
          endpointUsage={[]}
          recentActivity={[]}
          usageDistributionData={usageDistributionData}
          onTimePeriodChange={handleTimePeriodChange}
        >
          <UsageCharts isLoading={isLoading} />
        </DashboardProvider>
      )}
    </div>
  );
};
