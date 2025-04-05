
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Mock data to satisfy the DashboardProvider props requirements
const mockDailyUsageData = [
  { date: '2023-06-01', calls: 0, records: 0 }
];

const mockMonthlyUsageData = [
  { date: 'Jun', calls: 0, records: 0 }
];

const mockEndpointUsage = [
  {
    endpoint: 'Property Search',
    description: 'Search for properties by location',
    calls: 0,
    records: 0,
    percentage: 0,
    creditCost: "1 credit per record"
  }
];

const mockRecentActivity = [];

const mockUsageDistributionData = [
  { name: 'Property Search', value: 0, fill: '#1d4ed8' }
];

const OnboardingWizardPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  // Get the user's name from sessionStorage
  useEffect(() => {
    const storedName = sessionStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // If the user already completed onboarding, send them to the dashboard
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (hasCompletedOnboarding && isAuthenticated) {
      navigate("/dashboard");
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
      <OnboardingWizard userName={userName} />
    </DashboardProvider>
  );
};

export default OnboardingWizardPage;
