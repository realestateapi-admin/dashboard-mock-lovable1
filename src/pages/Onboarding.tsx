
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote as QuoteIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DashboardProvider } from "@/contexts/DashboardContext";

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
  
  return (
    <DashboardProvider
      dailyUsageData={mockDailyUsageData}
      monthlyUsageData={mockMonthlyUsageData}
      endpointUsage={mockEndpointUsage}
      recentActivity={mockRecentActivity}
      usageDistributionData={mockUsageDistributionData}
    >
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-5xl mx-auto p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Left Side - Trial Card */}
            <Card className="border shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold tracking-tight">Welcome to your free trial</CardTitle>
                <CardDescription className="text-lg mt-2">
                  Start exploring our platform with full access to all features for the next 14 days
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-primary-teal/5 p-4 border border-primary-teal/20">
                  <h3 className="font-medium text-primary-teal mb-2">What's included in your trial:</h3>
                  <ul className="space-y-2">
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
                      <span>Credit card required for identification purposes only</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleStartTrial}
                  className="w-full bg-[#04c8c8] hover:bg-[#04c8c8]/90"
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? (
                    "Setting up your account..."
                  ) : (
                    <>
                      Get started <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Right Side - Social Proof with SourceForge badge and customer quote */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">We don't like to brag...</h2>
                <p className="text-lg font-medium">But our users do.</p>
              </div>
              
              {/* SourceForge Badge */}
              <div className="flex justify-center mb-8">
                <img 
                  src="/lovable-uploads/cbf1a12f-50dd-479c-936b-f54823350ad1.png" 
                  alt="SourceForge Customers Love Us" 
                  className="h-36 w-auto"
                />
              </div>
              
              {/* Customer Quote */}
              <div className="bg-muted/50 rounded-lg p-5 mb-8 relative">
                <QuoteIcon className="h-8 w-8 text-muted-foreground/40 absolute top-3 left-3" />
                <div className="pl-6 pt-4">
                  <p className="text-lg italic">
                    "Great team, great product what's not to like! Very committed to your success.."
                  </p>
                  <p className="text-right mt-3 font-medium">— Satisfied Customer</p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="text-center">
                <p className="text-base font-medium">TRUSTED BY +25,000 BUSINESSES</p>
                <div className="flex justify-center items-center gap-6 mt-4">
                  <div className="w-20 h-6 bg-gray-300 rounded"></div>
                  <div className="w-20 h-6 bg-gray-300 rounded"></div>
                  <div className="w-20 h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
              
              <div className="mt-8 glass-card rounded-xl p-4 text-center w-full">
                <p className="text-sm font-medium">Join thousands of real estate professionals who trust our API</p>
                <p className="text-xs text-muted-foreground mt-1">⭐⭐⭐⭐⭐ 4.9/5 average rating on G2</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Onboarding;
