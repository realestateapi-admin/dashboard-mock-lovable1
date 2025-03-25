
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApiUsageSummary } from '@/components/dashboard/ApiUsageSummary';
import { CardSkeleton } from '@/components/dashboard/LoadingState';
import { EndpointUsageSection } from '@/components/dashboard/EndpointUsageSection';
import { ApiUsageHeader } from '@/components/api-usage/ApiUsageHeader';
import { ApiUsageError } from '@/components/api-usage/ApiUsageError';
import { ApiUsageCharts } from '@/components/api-usage/ApiUsageCharts';
import { ApiUsageFooter } from '@/components/api-usage/ApiUsageFooter';
import { fetchApiUsageData } from '@/components/api-usage/ApiUsageService';
import { fetchEndUserAnalytics } from '@/components/api-usage/EndUserAnalyticsService';
import { ActiveEndUsersCard } from '@/components/api-usage/ActiveEndUsersCard';

const ApiUsage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['apiUsage'],
    queryFn: fetchApiUsageData,
  });

  const { 
    data: endUserData, 
    isLoading: isEndUserLoading 
  } = useQuery({
    queryKey: ['endUserAnalytics'],
    queryFn: fetchEndUserAnalytics,
  });

  // Initialize default empty values
  const safeData = {
    totalApiCalls: data?.totalApiCalls || 0,
    totalRecords: data?.totalRecords || 0,
    recordsLimit: data?.recordsLimit || 0,
    increasePercentage: data?.increasePercentage || 0,
    dailyUsageData: data?.dailyUsageData || [],
    monthlyUsageData: data?.monthlyUsageData || [],
    endpointUsage: data?.endpointUsage || [],
    usageDistributionData: data?.usageDistributionData || []
  };

  if (isError) {
    return (
      <div className="space-y-6">
        <ApiUsageHeader />
        <ApiUsageError />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ApiUsageHeader />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <ApiUsageSummary
              totalApiCalls={safeData.totalApiCalls}
              totalRecords={safeData.totalRecords}
              recordsLimit={safeData.recordsLimit}
              increasePercentage={safeData.increasePercentage}
            />
            <ActiveEndUsersCard 
              activeEndUsers={endUserData?.activeEndUsers || null}
              isLoading={isEndUserLoading}
            />
          </>
        )}
      </div>

      <ApiUsageCharts 
        dailyUsageData={safeData.dailyUsageData}
        monthlyUsageData={safeData.monthlyUsageData}
        usageDistributionData={safeData.usageDistributionData}
        isLoading={isLoading}
      />

      <div>
        <EndpointUsageSection 
          endpointUsage={safeData.endpointUsage} 
          isLoading={isLoading}
        />
      </div>

      <ApiUsageFooter />
    </div>
  );
};

export default ApiUsage;
