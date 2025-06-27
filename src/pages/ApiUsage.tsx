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
import { AvmUsageSummary } from '@/components/api-usage/avm/AvmUsageSummary';
import { fetchAvmData } from '@/components/api-usage/avm/AvmService';
import { AvmCharts } from '@/components/api-usage/avm/AvmCharts';
import { LiensUsageSummary } from '@/components/api-usage/liens/LiensUsageSummary';
import { fetchLiensData } from '@/components/api-usage/liens/LiensService';
import { LiensEndpointCharts } from '@/components/api-usage/liens/LiensEndpointCharts';

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

  // AVM data query
  const {
    data: avmData,
    isLoading: isAvmLoading
  } = useQuery({
    queryKey: ['avmData'],
    queryFn: fetchAvmData,
  });

  // Liens data query
  const {
    data: liensData,
    isLoading: isLiensLoading
  } = useQuery({
    queryKey: ['liensData'],
    queryFn: fetchLiensData,
  });

  // Mock user scopes - in a real app this would come from the user's API key data  
  const userScopes = [
    "Property Search",
    "Property Detail",
    "Property Comps",
    "PropGPT",
    "Address Verification",
    "Property Portfolio",
    "Property Boundary",
    "Auto Complete",
    "Skip Trace",
    "Lender Grade AVM",
    "Mapping (Pins)"
  ];

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

  // Initialize default empty values for AVM data
  const safeAvmData = {
    totalApiCalls: avmData?.totalApiCalls || 0,
    totalRecords: avmData?.totalRecords || 0,
    recordsLimit: avmData?.recordsLimit || 0,
    increasePercentage: avmData?.increasePercentage || 0,
    dailyUsageData: avmData?.dailyUsageData || [],
    monthlyUsageData: avmData?.monthlyUsageData || [],
    endpointUsage: avmData?.endpointUsage || []
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
        ) : dataCategory === 'demographic' ? (
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
        ) : dataCategory === 'avm' ? (
          // AVM Data View
          <>
            <AvmUsageSummary
              totalApiCalls={safeAvmData.totalApiCalls}
              totalRecords={safeAvmData.totalRecords}
              recordsLimit={safeAvmData.recordsLimit}
              increasePercentage={safeAvmData.increasePercentage}
              isLoading={isAvmLoading}
            />
            <ActiveEndUsersCard 
              activeEndUsers={endUserData?.activeEndUsers || null}
              isLoading={isEndUserLoading}
            />
          </>
        ) : (
          // Liens Data View
          <>
            <LiensUsageSummary
              lienRecords={liensData?.lienRecords || 0}
              propertyLiensRequests={liensData?.propertyLiensRequests || 0}
              isLoading={isLiensLoading}
            />
            <ActiveEndUsersCard 
              activeEndUsers={endUserData?.activeEndUsers || null}
              isLoading={isEndUserLoading}
            />
          </>
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
      ) : dataCategory === 'demographic' ? (
        // Demographic Data Charts
        <DemographicEndpointCharts isLoading={isSkiptraceLoading} />
      ) : dataCategory === 'avm' ? (
        // AVM Data Charts
        <AvmCharts 
          dailyUsageData={safeAvmData.dailyUsageData}
          monthlyUsageData={safeAvmData.monthlyUsageData}
          isLoading={isAvmLoading}
        />
      ) : (
        // Liens Data Charts
        <LiensEndpointCharts isLoading={isLiensLoading} />
      )}

      {/* Endpoint usage section - only for property and AVM data */}
      {(dataCategory === 'property' || dataCategory === 'avm') && (
        <div>
          <EndpointUsageSection 
            endpointUsage={dataCategory === 'property' ? safeData.endpointUsage : safeAvmData.endpointUsage} 
            isLoading={dataCategory === 'property' ? isLoading : isAvmLoading}
            userScopes={userScopes}
            dataCategory={dataCategory}
          />
        </div>
      )}

      <ApiUsageFooter />
    </div>
  );
};

export default ApiUsage;
