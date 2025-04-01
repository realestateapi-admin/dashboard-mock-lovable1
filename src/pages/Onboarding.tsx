
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote as QuoteIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { useDashboardRefresh } from "@/components/dashboard/DashboardRefresh";

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
  const [isLoading, setIsLoading] = useState(false);
  
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col space-y-6"
            >
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to RealEstateAPI</h1>
                <p className="text-lg text-muted-foreground">Start your 14-day free trial and explore our property data platform.</p>
              </div>
              
              <div className="rounded-lg bg-primary-teal/5 p-6 border border-primary-teal/20">
                <h3 className="font-medium text-primary-teal text-lg mb-4">What's included in your trial:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 mt-0.5">✓</span>
                    <span>Access to all API endpoints including Property Search, Auto-Complete, and more</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-0.5">✓</span>
                    <span>Up to 5,000 property records</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-0.5">✓</span>
                    <span>Full access to documentation and support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-0.5">✓</span>
                    <span>No credit card required for the trial</span>
                  </li>
                </ul>
              </div>
              
              <Button
                onClick={handleStartTrial}
                className="w-full bg-[#04c8c8] hover:bg-[#04c8c8]/90 mt-2"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  "Setting up your account..."
                ) : (
                  <>
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.div>
            
            {/* Right Side - Social Proof */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold">Join thousands of satisfied customers</h2>
                <p className="text-lg text-muted-foreground">See what our users are saying about us</p>
              </div>
              
              {/* SourceForge Badge - Using direct image URL */}
              <div className="flex justify-center mb-10">
                <a href="https://sourceforge.net/software/product/RealEstateAPI/" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://sourceforge.net/cdn/syndication/badge_img/3819142/customers-love-us-white?&variant_id=sf&r=https://sourceforge.net/s/realestateapi/admin/ext/commercial_badges/" 
                    alt="SourceForge Badge"
                    width="250"
                    height="auto"
                  />
                </a>
              </div>
              
              <Separator className="my-6" />
              
              {/* Customer Quote */}
              <div className="bg-muted/50 rounded-lg p-6 mb-8 relative max-w-md">
                <QuoteIcon className="h-8 w-8 text-primary/20 absolute top-3 left-3" />
                <div className="pl-6 pt-4">
                  <p className="text-lg italic">
                    "Great team, great product. What's not to like! Very committed to your success..."
                  </p>
                  <p className="text-right mt-3 font-medium">— Satisfied Customer</p>
                </div>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-base font-medium">TRUSTED BY +25,000 BUSINESSES</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Onboarding;
