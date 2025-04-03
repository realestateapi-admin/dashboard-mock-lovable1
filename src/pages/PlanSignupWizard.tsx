
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

import { BillingCycleSelector } from "@/components/billing/BillingCycleSelector";
import { PlansList } from "@/components/billing/PlansList";
import { AddOnsList } from "@/components/billing/AddOnsList";
import { OverageHandling } from "@/components/billing/OverageHandling";
import { SubscriptionSummary } from "@/components/billing/SubscriptionSummary";

// Import plan data
import { plans, addOns, annualPlanPrices } from "@/data/billingData";
import { useSubscriptionCalculator } from "@/hooks/useSubscriptionCalculator";

// Payment component placeholder (would be replaced with Stripe Elements)
const PaymentMethodForm = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Payment Information</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Enter your payment details to complete your subscription
      </p>
      <div className="p-6 border rounded-lg bg-slate-50 flex items-center justify-center">
        <p className="text-center text-muted-foreground">
          [Stripe Payment Form Would Be Embedded Here]
        </p>
      </div>
    </div>
  );
};

const PlanSignupWizard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { startFreeTrial } = useTrialAlert();
  
  // Step management
  const [currentStep, setCurrentStep] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  // Use the subscription calculator hook
  const {
    selectedPlan,
    setSelectedPlan,
    overageHandling,
    setOverageHandling,
    activeAddOns,
    toggleAddOn,
    calculateMonthlyCost
  } = useSubscriptionCalculator(plans, addOns);
  
  const costs = calculateMonthlyCost();
  
  // Apply annual pricing to plans when annual billing is selected
  const adjustedPlans = plans.map(plan => {
    if (billingCycle === 'annual' && plan.price !== 'Custom' && annualPlanPrices[plan.id as keyof typeof annualPlanPrices]) {
      return {
        ...plan,
        price: annualPlanPrices[plan.id as keyof typeof annualPlanPrices],
        originalPrice: plan.price
      };
    }
    return plan;
  });
  
  const steps = [
    {
      title: "Choose Your Billing Option",
      description: "Select your preferred billing cycle"
    },
    {
      title: "Select Add-Ons",
      description: "Enhance your subscription with premium features"
    },
    {
      title: "Overage Handling",
      description: "Choose how to handle API calls that exceed your plan limits"
    },
    {
      title: "Payment Information",
      description: "Enter your payment details to complete your subscription"
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };
  
  const handleBillingCycleChange = (cycle: 'monthly' | 'annual') => {
    setBillingCycle(cycle);
  };
  
  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
  };
  
  const handleSubmit = () => {
    // In a real application, this would process the payment via Stripe
    toast({
      title: "Subscription Successful",
      description: "Your subscription has been successfully processed.",
    });
    
    // Update user status to paid user
    // This would typically be done server-side after payment confirmation
    
    // Redirect to dashboard
    navigate("/dashboard");
  };
  
  // Calculate progress percentage
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl"
      >
        <Card className="border shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold tracking-tight">
                  {steps[currentStep].title}
                </CardTitle>
                <CardDescription className="mt-1">
                  {steps[currentStep].description}
                </CardDescription>
              </div>
              <div className="text-sm font-medium">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 mt-4">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </CardHeader>
          
          <CardContent className="py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left side - Current step content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Step 1: Choose Billing Option */}
                {currentStep === 0 && (
                  <div className="space-y-8">
                    <BillingCycleSelector 
                      billingCycle={billingCycle}
                      onBillingCycleChange={handleBillingCycleChange}
                    />
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Select Your Plan</h3>
                      <PlansList 
                        plans={adjustedPlans} 
                        selectedPlan={selectedPlan} 
                        onPlanChange={handlePlanChange}
                        billingCycle={billingCycle}
                      />
                    </div>
                  </div>
                )}
                
                {/* Step 2: Add-Ons */}
                {currentStep === 1 && (
                  <AddOnsList
                    addOns={addOns}
                    selectedPlan={selectedPlan}
                    activeAddOns={activeAddOns}
                    onToggleAddOn={toggleAddOn}
                  />
                )}
                
                {/* Step 3: Overage Handling */}
                {currentStep === 2 && (
                  <OverageHandling 
                    selectedPlanName={plans.find(p => p.id === selectedPlan)?.name || "selected plan"}
                    overageHandling={overageHandling}
                    onOverageHandlingChange={setOverageHandling}
                  />
                )}
                
                {/* Step 4: Payment */}
                {currentStep === 3 && (
                  <PaymentMethodForm />
                )}
              </div>
              
              {/* Right side - Subscription Summary */}
              <div>
                <SubscriptionSummary
                  selectedPlan={selectedPlan}
                  plans={plans}
                  activeAddOns={activeAddOns}
                  addOns={addOns}
                  costs={costs}
                  subscription={null}
                  isLoading={false}
                  onSubmit={handleSubmit}
                  billingCycle={billingCycle}
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>
                Continue
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Complete Subscription
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default PlanSignupWizard;
