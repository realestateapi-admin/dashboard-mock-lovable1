
import React, { useState } from 'react';
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
import { ApiUsageCategorySelector, DataCategory } from '@/components/api-usage/ApiUsageCategorySelector';
import { DemographicUsageSummary } from '@/components/api-usage/demographic/DemographicUsageSummary';
import { fetchSkiptraceData } from '@/components/api-usage/demographic/SkiptraceService';
import { DemographicEndpointCharts } from '@/components/api-usage/demographic/DemographicEndpointCharts';

const ApiUsage = () => {
  // State to track which data category the user is viewing
  const [dataCategory, setDataCategory] = useState<DataCategory>('property');

  // Property data query
  const { 
    data, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ['apiUsage'],
    queryFn: fetchApiUsageData,
  });

  // End user data query
  const { 
    data: endUserData, 
    isLoading: isEndUserLoading 
  } = useQuery({
    queryKey: ['endUserAnalytics'],
    queryFn: fetchEndUserAnalytics,
  });

  // Skiptrace/demographic data query
  const {
    data: skiptraceData,
    isLoading: isSkiptraceLoading
  } = useQuery({
    queryKey: ['skiptraceData'],
    queryFn: fetchSkiptraceData,
  });

  // Initialize default empty values for property data
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

  // Handle category change
  const handleCategoryChange = (category: DataCategory) => {
    setDataCategory(category);
  };

  return (
    <div className="space-y-6">
      <ApiUsageHeader />
      
      <ApiUsageCategorySelector 
        value={dataCategory} 
        onChange={handleCategoryChange}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dataCategory === 'property' ? (
          // Property Data View
          isLoading ? (
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
                displayPropertyRecordsFirst={true}
              />
              <ActiveEndUsersCard 
                activeEndUsers={endUserData?.activeEndUsers || null}
                isLoading={isEndUserLoading}
              />
            </>
          )
        ) : (
          // Demographic Data View
          isSkiptraceLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            <>
              <DemographicUsageSummary 
                skipTraceHits={skiptraceData?.skipTraceHits || 0}
                skipTraceRequests={skiptraceData?.skipTraceRequests || 0}
                isLoading={isSkiptraceLoading}
              />
              <ActiveEndUsersCard 
                activeEndUsers={endUserData?.activeEndUsers || null}
                isLoading={isEndUserLoading}
              />
            </>
          )
        )}
      </div>

      {/* Charts Section - Conditional rendering based on data category */}
      {dataCategory === 'property' ? (
        // Property Data Charts
        <ApiUsageCharts 
          dailyUsageData={safeData.dailyUsageData}
          monthlyUsageData={safeData.monthlyUsageData}
          usageDistributionData={safeData.usageDistributionData}
          isLoading={isLoading}
        />
      ) : (
        // Demographic Data Charts
        <DemographicEndpointCharts isLoading={isSkiptraceLoading} />
      )}

      {/* Only show endpoint usage section for property data */}
      {dataCategory === 'property' && (
        <div>
          <EndpointUsageSection 
            endpointUsage={safeData.endpointUsage} 
            isLoading={isLoading}
          />
        </div>
      )}

      <ApiUsageFooter />
    </div>
  );
};

export default ApiUsage;
