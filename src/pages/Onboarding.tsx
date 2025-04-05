
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote as QuoteIcon, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { useDashboardRefresh } from "@/components/dashboard/DashboardRefresh";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [showVerifyDemo, setShowVerifyDemo] = useState(false);
  
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
  
  const handleResendEmail = () => {
    // In a real app, you would call an API to resend the verification email
    toast({
      title: "Verification email sent",
      description: `We've sent another verification email to ${userEmail}`,
    });

    // For demo - show the verification button
    setShowVerifyDemo(true);
  };

  const handleDemoVerify = () => {
    // This simulates clicking the verification link in the email
    setEmailVerified(true);
    toast({
      title: "Email verified successfully!",
      description: "You can now proceed with your free trial.",
    });
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
              
              {!emailVerified && userEmail && (
                <Alert className="bg-amber-50 border-amber-200">
                  <Mail className="h-4 w-4 text-amber-600 mr-2" />
                  <AlertDescription className="text-amber-800">
                    <p className="font-medium">Please verify your email to continue</p>
                    <p className="mt-1">We've sent a verification link to <span className="font-semibold">{userEmail}</span>. Please check your inbox and click the link to verify your email.</p>
                    <div className="mt-3 flex flex-col space-y-2">
                      <button 
                        onClick={handleResendEmail}
                        className="text-sm text-amber-800 underline hover:text-amber-900"
                      >
                        Didn't receive the email? Click here to resend
                      </button>
                      
                      {/* Demo-only verification button */}
                      {showVerifyDemo && (
                        <div className="mt-2 pt-2 border-t border-amber-200">
                          <p className="text-xs text-amber-700 mb-2">Demo: Simulate email verification</p>
                          <Button 
                            onClick={handleDemoVerify}
                            variant="outline" 
                            className="bg-white text-amber-800 border-amber-300 hover:bg-amber-50 text-sm py-1 h-auto"
                            size="sm"
                          >
                            Click here to verify your email
                          </Button>
                        </div>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              
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
                </ul>
              </div>
              
              <Button
                onClick={handleStartTrial}
                className="w-full bg-[#04c8c8] hover:bg-[#04c8c8]/90 mt-2"
                disabled={isLoading || !emailVerified}
                size="lg"
              >
                {isLoading ? (
                  "Setting up your account..."
                ) : !emailVerified ? (
                  "Verify your email to continue"
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
                    width="125"
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
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Onboarding;
