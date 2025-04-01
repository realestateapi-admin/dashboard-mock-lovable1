
import { useEffect } from "react";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { TrialDashboardBanner } from "@/components/dashboard/TrialDashboardBanner";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { DashboardProvider } from "@/contexts/DashboardContext";

// Mock data for the DashboardProvider
const mockDailyUsageData = [
  { date: '2023-06-01', calls: 124, records: 687 },
  { date: '2023-06-02', calls: 145, records: 721 },
  { date: '2023-06-03', calls: 132, records: 698 },
  { date: '2023-06-04', calls: 156, records: 812 },
  { date: '2023-06-05', calls: 178, records: 903 }
];

const mockMonthlyUsageData = [
  { date: 'Jan', calls: 1240, records: 6870 },
  { date: 'Feb', calls: 1450, records: 7210 },
  { date: 'Mar', calls: 1320, records: 6980 },
  { date: 'Apr', calls: 1560, records: 8120 },
  { date: 'May', calls: 1780, records: 9030 },
  { date: 'Jun', calls: 1920, records: 9540 }
];

const mockEndpointUsage = [
  {
    endpoint: 'Property Search',
    description: 'Search for properties by location',
    calls: 342,
    records: 1245,
    percentage: 42,
    creditCost: "1 credit per record"
  },
  {
    endpoint: 'Property Detail',
    description: 'Get detailed information about a property',
    calls: 215,
    records: 865,
    percentage: 29,
    creditCost: "1 credit per record"
  },
  {
    endpoint: 'Comps',
    description: 'Find comparable properties',
    calls: 128,
    records: 512,
    percentage: 17,
    creditCost: "1 credit per record"
  }
];

const mockRecentActivity = [
  {
    id: '1',
    type: 'api_call',
    endpoint: '/v2/PropertySearch',
    timestamp: '2023-06-05T14:32:45Z',
    status: 'success',
    recordsFetched: 42,
    creditCost: 42
  },
  {
    id: '2',
    type: 'api_call',
    endpoint: '/v2/PropertyDetail',
    timestamp: '2023-06-05T14:30:12Z',
    status: 'success',
    recordsFetched: 1,
    creditCost: 1
  },
  {
    id: '3',
    type: 'api_call',
    endpoint: '/v2/Comps',
    timestamp: '2023-06-05T14:28:55Z',
    status: 'success',
    recordsFetched: 10,
    creditCost: 10
  }
];

const mockUsageDistributionData = [
  { name: 'Property Search', value: 1245, fill: '#1d4ed8' },
  { name: 'Property Detail', value: 865, fill: '#8b5cf6' },
  { name: 'Comps', value: 512, fill: '#06b6d4' }
];

const Dashboard = () => {
  const { isTrialActive, isFreeUser } = useTrialAlert();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not authenticated, redirect to sign-in
    if (!isAuthenticated) {
      navigate("/sign-in");
      return;
    }
    
    // Check if the user has completed the onboarding wizard
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    
    // If this is their first time to the dashboard after onboarding,
    // mark onboarding as completed
    if (!hasCompletedOnboarding && isAuthenticated) {
      localStorage.setItem('hasCompletedOnboarding', 'true');
    }
  }, [isAuthenticated, navigate]);

  return (
    <DashboardProvider
      dailyUsageData={mockDailyUsageData}
      monthlyUsageData={mockMonthlyUsageData}
      endpointUsage={mockEndpointUsage}
      recentActivity={mockRecentActivity}
      usageDistributionData={mockUsageDistributionData}
    >
      <DashboardContent 
        trialBanner={isTrialActive && isFreeUser ? <TrialDashboardBanner /> : null}
      />
    </DashboardProvider>
  );
};

export default Dashboard;
