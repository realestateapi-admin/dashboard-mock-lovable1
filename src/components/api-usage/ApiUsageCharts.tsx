
import React from 'react';
import { Card } from "@/components/ui/card";
import { UsageCharts } from '@/components/dashboard/UsageCharts';
import { RecordUsageBreakdown } from '@/components/dashboard/RecordUsageBreakdown';
import { CardSkeleton, UsageBreakdownSkeleton } from '@/components/dashboard/LoadingState';

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
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <UsageCharts
            dailyUsageData={dailyUsageData}
            monthlyUsageData={monthlyUsageData}
            isLoading={isLoading}
          />
        )}
      </div>
      <div>
        <Card className="h-full">
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <RecordUsageBreakdown 
              usageDistributionData={usageDistributionData} 
              isLoading={isLoading}
            />
          )}
        </Card>
      </div>
    </div>
  );
};
