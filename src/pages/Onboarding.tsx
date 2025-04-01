
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { useToast } from "@/hooks/use-toast";
import { plans, addOns } from "@/data/billingData";
import { StepOne } from "@/components/onboarding/StepOne";
import { StepTwo } from "@/components/onboarding/StepTwo";
import { useAuth } from "@/contexts/AuthContext";

const Onboarding = () => {
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setIsAuthenticated, setCurrentRole } = useAuth();

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleContinue = async () => {
    setIsLoading(true);
    
    // Simulate processing
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (step === 1) {
        setStep(2);
      } else {
        // In a real app, handle subscription creation here
        // This is where we would also associate the Solutions Engineer with the user account
        
        // For a real implementation, we would store the SE data in the user metadata
        const userMetadata = {
          solutionsEngineer: {
            id: "alex-grant",
            name: "Alex Grant",
            email: "alex@realestateapi.com",
            calendly: "https://calendly.com/alex-reapi",
          },
          plan: selectedPlan,
          addOns: selectedAddOns,
        };
        
        console.log("User onboarding completed with metadata:", userMetadata);
        
        // Set authentication state
        setIsAuthenticated(true);
        setCurrentRole('admin'); // Default role for new signups
        
        // Different messaging depending on selected plan
        if (selectedPlan === 'free') {
          toast({
            title: "Your free plan is ready!",
            description: "You have 14 days to explore our API features. Add a payment method to continue after the free period.",
          });
        } else {
          toast({
            title: "Your account is ready!",
            description: `You've selected the ${plans.find(p => p.id === selectedPlan)?.name} plan with ${selectedAddOns.length} add-ons.`,
          });
        }
        
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6 w-full">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {step === 1 ? "Choose your plan" : "Complete your setup"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {step === 1 
              ? "Start with a free plan or choose a paid option with more features" 
              : "Just a few more steps to get you started."}
          </p>
        </div>
        
        {step === 1 ? (
          <StepOne
            plans={plans}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            isLoading={isLoading}
            handleContinue={handleContinue}
          />
        ) : (
          <StepTwo
            plans={plans}
            addOns={addOns}
            selectedPlan={selectedPlan}
            selectedAddOns={selectedAddOns}
            toggleAddOn={toggleAddOn}
            isLoading={isLoading}
            handleContinue={handleContinue}
          />
        )}
      </div>
    </AuthLayout>
  );
};

export default Onboarding;
