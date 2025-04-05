
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { useDashboardRefresh } from "@/components/dashboard/DashboardRefresh";
import WelcomeSection from "@/components/onboarding/WelcomeSection";
import SocialProofSection from "@/components/onboarding/SocialProofSection";

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

const Onboarding = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  
  // Check for email verification status on component mount and from URL params
  useEffect(() => {
    // Get email from sessionStorage (saved during sign up)
    const email = sessionStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
    
    // Check for verification token in URL (this would be added when user clicks the email link)
    const searchParams = new URLSearchParams(location.search);
    const verificationToken = searchParams.get("token");
    
    if (verificationToken) {
      // In a real app, you would validate this token with your backend
      // For this demo, we'll simulate a successful verification
      setEmailVerified(true);
      toast({
        title: "Email verified successfully!",
        description: "You can now proceed with your free trial.",
      });
      
      // Remove the token from the URL
      navigate("/onboarding", { replace: true });
    }
  }, [location, navigate, toast]);
  
  const handleVerify = () => {
    setEmailVerified(true);
  };
  
  const handleStartTrial = () => {
    setIsLoading(true);
    
    // Short timeout to show loading state, then navigate to the wizard
    setTimeout(() => {
      setIsLoading(false);
      navigate("/onboarding-wizard");
    }, 500);
  };

  const { handleRefresh } = useDashboardRefresh();
  
  return (
    <DashboardProvider
      dailyUsageData={mockDailyUsageData}
      monthlyUsageData={mockMonthlyUsageData}
      endpointUsage={mockEndpointUsage}
      recentActivity={mockRecentActivity}
      usageDistributionData={mockUsageDistributionData}
    >
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-6xl mx-auto p-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Welcome Message */}
            <WelcomeSection 
              emailVerified={emailVerified}
              userEmail={userEmail}
              isLoading={isLoading}
              onVerify={handleVerify}
              onStartTrial={handleStartTrial}
            />
            
            {/* Right Side - Social Proof */}
            <SocialProofSection />
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Onboarding;
