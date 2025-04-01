
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const Onboarding = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleStartTrial = () => {
    setIsLoading(true);
    
    // Mock API call to set up free trial
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome to your free trial!",
        description: "Your account has been set up successfully.",
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-3xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
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
                    <span>No credit card required to start</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleStartTrial}
                className="w-full"
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
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;
