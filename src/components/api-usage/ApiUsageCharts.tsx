
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { UsageCharts } from '@/components/dashboard/UsageCharts';
import { RecordUsageBreakdown } from '@/components/dashboard/RecordUsageBreakdown';
import { CardSkeleton, UsageBreakdownSkeleton } from '@/components/dashboard/LoadingState';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { createUsageDistributionData } from './ApiUsageDataService';

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
  
  // Generate the appropriate distribution data based on selected time period
  const currentDistributionData = createUsageDistributionData(
    dailyUsageData, 
    monthlyUsageData,
    selectedTimePeriod
  );
  
  // Handler for when time period changes in the Usage Charts component
  const handleTimePeriodChange = (period: 'daily' | 'monthly') => {
    setSelectedTimePeriod(period);
  };

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      <div className="lg:col-span-2">
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
      <div>
        <Card className="h-full">
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <RecordUsageBreakdown 
              usageDistributionData={currentDistributionData} 
              isLoading={isLoading}
              timePeriod={selectedTimePeriod}
            />
          )}
        </Card>
      </div>
    </div>
  );
};
