
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { useToast } from "@/hooks/use-toast";
import { plans, addOns } from "@/data/billingData";
import { StepOne } from "@/components/onboarding/StepOne";
import { StepTwo } from "@/components/onboarding/StepTwo";
import { useAuth } from "@/contexts/AuthContext";

const Onboarding = () => {
  const [selectedPlan, setSelectedPlan] = useState("starter");
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
        
        // Set authentication state
        setIsAuthenticated(true);
        setCurrentRole('admin'); // Default role for new signups
        
        toast({
          title: "Your trial is ready!",
          description: `You've selected the ${plans.find(p => p.id === selectedPlan)?.name} plan with ${selectedAddOns.length} add-ons. Your free trial has started.`,
        });
        
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
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {step === 1 ? "Choose your plan" : "Complete your setup"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {step === 1 
              ? "Start with a 14-day free trial. No credit card required." 
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
