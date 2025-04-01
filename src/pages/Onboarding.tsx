
import { useState } from "react";
import { StepOne } from "@/components/onboarding/StepOne";
import { StepTwo } from "@/components/onboarding/StepTwo";
import { useToast } from "@/components/ui/use-toast";
import { allPlans, addOns } from "@/data/billingData"; // Import addOns as well

const Onboarding = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]); // Add state for selected add-ons
  const [isLoading, setIsLoading] = useState(false);
  
  const handleContinue = () => {
    // Move to next step
    setCurrentStep(2);
  };

  // Add a function to toggle add-ons
  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId) 
        : [...prev, addOnId]
    );
  };
  
  const handleSubscribe = () => {
    setIsLoading(true);
    
    // Mock API call to handle subscription
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success!",
        description: "Your account has been set up successfully.",
      });
      // Normally would redirect to dashboard here
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-5xl mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {currentStep === 1 ? "Choose Your Plan" : "Complete Your Setup"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {currentStep === 1 
              ? "Select the plan that works best for your needs" 
              : "Provide your payment details to get started"}
          </p>
        </div>
        
        {currentStep === 1 ? (
          <StepOne 
            plans={allPlans}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            isLoading={isLoading}
            handleContinue={handleContinue}
          />
        ) : (
          <StepTwo 
            selectedPlan={selectedPlan}
            plans={allPlans}
            addOns={addOns}
            selectedAddOns={selectedAddOns}
            toggleAddOn={toggleAddOn}
            isLoading={isLoading}
            handleSubscribe={handleSubscribe}
            handleBack={() => setCurrentStep(1)}
          />
        )}
      </div>
    </div>
  );
};

export default Onboarding;
