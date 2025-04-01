
import React, { useState, useEffect } from "react";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { TrialDashboardBanner } from "@/components/dashboard/TrialDashboardBanner";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { useToast } from "@/hooks/use-toast";

// Mock data for the dashboard
const mockDailyUsageData = [
  { date: '2023-06-01', calls: 420, records: 290 },
  { date: '2023-06-02', calls: 380, records: 250 },
  { date: '2023-06-03', calls: 300, records: 200 },
  { date: '2023-06-04', calls: 350, records: 220 },
  { date: '2023-06-05', calls: 410, records: 280 },
  { date: '2023-06-06', calls: 490, records: 320 },
  { date: '2023-06-07', calls: 520, records: 370 },
];

const mockMonthlyUsageData = [
  { date: 'Jan', calls: 9000, records: 6200 },
  { date: 'Feb', calls: 8500, records: 5800 },
  { date: 'Mar', calls: 9800, records: 6700 },
  { date: 'Apr', calls: 10200, records: 7100 },
  { date: 'May', calls: 11500, records: 7800 },
  { date: 'Jun', calls: 13200, records: 8200 },
];

const mockEndpointUsage = [
  {
    endpoint: 'Property Search',
    description: 'Search for properties by location, price, features, etc.',
    calls: 6428,
    records: 4238,
    percentage: 50.8,
    creditCost: "1 credit per record"
  },
  {
    endpoint: 'Property Detail',
    description: 'Get detailed information about a specific property',
    calls: 3572,
    records: 3136,
    percentage: 37.6,
    creditCost: "1 credit per record"
  },
  {
    endpoint: 'Property Comps',
    description: 'Get comparable properties for a given property',
    calls: 2143,
    records: 966,
    percentage: 11.6,
    creditCost: "1 credit per record"
  },
];

const mockRecentActivity = [
  {
    id: 1,
    timestamp: new Date(Date.now() - 25 * 60000),
    endpoint: 'Property Search',
    recordsUsed: 128,
    apiKey: 'test_k6ftg5s7d8v9t3f2r1o9p8m7n6b5v4c3x2',
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 45 * 60000),
    endpoint: 'Property Detail',
    recordsUsed: 16,
    apiKey: 'test_k6ftg5s7d8v9t3f2r1o9p8m7n6b5v4c3x2',
  },
  {
    id: 3,
    timestamp: new Date(Date.now() - 2 * 3600000),
    endpoint: 'Property Comps',
    recordsUsed: 24,
    apiKey: 'test_k6ftg5s7d8v9t3f2r1o9p8m7n6b5v4c3x2',
  },
];

// Generate usage distribution data
const mockUsageDistributionData = [
  { name: 'Property Search', value: 4238, fill: '#1d4ed8' },
  { name: 'Property Detail', value: 3136, fill: '#047857' },
  { name: 'Property Comps', value: 966, fill: '#b45309' },
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setIsLoading(true);
    
    // Simulate API call refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsRefreshing(false);
    setIsLoading(false);
    
    toast({
      title: "Dashboard refreshed",
      description: "Your data has been updated with the latest information.",
    });
  };

  return (
    <DashboardProvider
      dailyUsageData={mockDailyUsageData}
      monthlyUsageData={mockMonthlyUsageData}
      endpointUsage={mockEndpointUsage}
      recentActivity={mockRecentActivity}
      usageDistributionData={mockUsageDistributionData}
    >
      <div className="flex flex-col gap-6">
        <DashboardContent trialBanner={<TrialDashboardBanner />} />
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;
