
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, FileDown } from "lucide-react";
import { ApiUsageSummary } from '@/components/dashboard/ApiUsageSummary';
import { UsageCharts } from '@/components/dashboard/UsageCharts';
import { EndpointUsageSection } from '@/components/dashboard/EndpointUsageSection';
import { RecordUsageBreakdown } from '@/components/dashboard/RecordUsageBreakdown';
import { CardSkeleton, UsageBreakdownSkeleton, EndpointUsageSkeleton } from '@/components/dashboard/LoadingState';
import { EndpointUsageItem, UsageDistributionItem } from '@/types/usage';

// Temporary mock data fetching
const fetchApiUsageData = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    totalApiCalls: 14285,
    totalRecords: 8340,
    recordsLimit: 10000,
    increasePercentage: 12,
    dailyUsageData: [
      { date: '2023-06-01', calls: 420, records: 290 },
      { date: '2023-06-02', calls: 380, records: 250 },
      { date: '2023-06-03', calls: 300, records: 200 },
      { date: '2023-06-04', calls: 350, records: 220 },
      { date: '2023-06-05', calls: 410, records: 280 },
      { date: '2023-06-06', calls: 490, records: 320 },
      { date: '2023-06-07', calls: 520, records: 370 },
    ],
    monthlyUsageData: [
      { date: 'Jan', calls: 9000, records: 6200 },
      { date: 'Feb', calls: 8500, records: 5800 },
      { date: 'Mar', calls: 9800, records: 6700 },
      { date: 'Apr', calls: 10200, records: 7100 },
      { date: 'May', calls: 11500, records: 7800 },
      { date: 'Jun', calls: 13200, records: 8200 },
    ],
    endpointUsage: [
      {
        endpoint: 'Property Search',
        description: 'Search for properties by location, price, features, etc.',
        calls: 6428,
        records: 6428,
        percentage: 45,
        creditCost: "1 credit per record"
      },
      {
        endpoint: 'Property Detail',
        description: 'Get detailed information about a specific property',
        calls: 3572,
        records: 3572,
        percentage: 25,
        creditCost: "1 credit per record"
      },
      {
        endpoint: 'Property Comps',
        description: 'Get comparable properties for a given property',
        calls: 2143,
        records: 2143,
        percentage: 15,
        creditCost: "1 credit per record"
      },
      {
        endpoint: 'Autocomplete',
        description: 'Get address suggestions as the user types',
        calls: 2142,
        records: 0,
        percentage: 0,
        creditCost: "Free"
      },
    ],
    usageDistributionData: [
      { name: 'Property Search', value: 4820, fill: '#1d4ed8' },
      { name: 'Property Detail', value: 2340, fill: '#047857' },
      { name: 'Property Comps', value: 1180, fill: '#b45309' },
    ]
  };
};

const ApiUsage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['apiUsage'],
    queryFn: fetchApiUsageData,
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">API Usage</h2>
            <p className="text-muted-foreground">
              Monitor your API usage and consumption
            </p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> Failed to load API usage data. Please try again later.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">API Usage</h2>
          <p className="text-muted-foreground">
            Monitor your API usage and consumption
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link to="/dashboard/usage/history">
              <History className="mr-2 h-4 w-4" />
              Usage History
            </Link>
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <FileDown className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <ApiUsageSummary
          totalApiCalls={safeData.totalApiCalls}
          totalRecords={safeData.totalRecords}
          recordsLimit={safeData.recordsLimit}
          increasePercentage={safeData.increasePercentage}
        />
      )}

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {isLoading ? (
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>
                  API calls vs. property records used
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="daily">
                  <TabsList>
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <UsageCharts
              dailyUsageData={safeData.dailyUsageData}
              monthlyUsageData={safeData.monthlyUsageData}
              isLoading={isLoading}
            />
          )}
        </div>
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Record Usage Breakdown</CardTitle>
              <CardDescription>
                Distribution by endpoint
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <UsageBreakdownSkeleton />
              ) : (
                <RecordUsageBreakdown 
                  usageDistributionData={safeData.usageDistributionData} 
                  isLoading={isLoading}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Endpoint Usage Details</CardTitle>
            <CardDescription>
              Request breakdown by API endpoints
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <EndpointUsageSkeleton />
            ) : (
              <EndpointUsageSection 
                endpointUsage={safeData.endpointUsage} 
                isLoading={isLoading}
              />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/20 border rounded-lg p-4 space-y-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-sm font-medium">Need more detailed usage analytics?</h3>
            <p className="text-sm text-muted-foreground">
              View your detailed API usage history with advanced filtering options.
            </p>
          </div>
          <Button asChild variant="default" className="bg-[#5014d0] hover:bg-[#5014d0]/90 w-full sm:w-auto">
            <Link to="/dashboard/usage/history">
              <History className="mr-2 h-4 w-4" />
              View Full Usage History
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApiUsage;
