
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

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
          
          {/* Right Side - Social Proof */}
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
            
            <div className="flex flex-col items-center gap-8 mb-8">
              <div className="flex justify-center items-center gap-8">
                <img 
                  src="/lovable-uploads/7056603f-fc89-4cdc-8044-e8d1703e42b3.png" 
                  alt="G2 High Performer Winter 2025" 
                  className="h-24 w-auto"
                />
              </div>
              
              <div className="flex justify-center items-center gap-8 mt-4">
                <img 
                  src="/lovable-uploads/a3dafc7a-6f43-4b35-8e74-361e8b0cf22e.png" 
                  alt="G2 Best Support Winter 2025" 
                  className="h-24 w-auto"
                />
              </div>
              
              <div className="flex justify-center items-center gap-8 mt-4">
                <img 
                  src="/lovable-uploads/be315e6a-52ff-476d-9da2-a17bd28d5a50.png" 
                  alt="G2 Easiest To Do Business With Winter 2025" 
                  className="h-24 w-auto"
                />
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="text-center">
              <p className="text-base font-medium">TRUSTED BY +25,000 BUSINESSES</p>
              <div className="flex justify-center items-center gap-8 mt-4">
                <div className="w-20 h-6 bg-gray-400 rounded opacity-70"></div>
                <div className="w-20 h-6 bg-gray-400 rounded opacity-70"></div>
                <div className="w-20 h-6 bg-gray-400 rounded opacity-70"></div>
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
  );
};

export default Onboarding;
