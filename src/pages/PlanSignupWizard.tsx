
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

// Import wizard components
import { WizardHeader } from "@/components/billing/wizard/WizardHeader";
import { WizardFooter } from "@/components/billing/wizard/WizardFooter";
import { WizardSidebar } from "@/components/billing/wizard/WizardSidebar";
import { BillingOptionStep } from "@/components/billing/wizard/BillingOptionStep";

// Import billing components
import { AddOnsList } from "@/components/billing/AddOnsList";
import { OverageHandling } from "@/components/billing/OverageHandling";
import { PaymentMethodForm } from "@/components/billing/PaymentMethodForm";

// Import plan data
import { plans, addOns, annualPlanPrices } from "@/data/billingData";
import { useSubscriptionCalculator } from "@/hooks/useSubscriptionCalculator";

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
  
  // Find the enterprise plan
  const enterprisePlan = plans.find(p => p.id === "enterprise");
  // Filter out enterprise plan from the regular plans list for display
  const regularPlans = plans.filter(p => p.id !== "enterprise");
  
  // Apply annual pricing to plans when annual billing is selected
  const adjustedPlans = regularPlans.map(plan => {
    if (billingCycle === 'annual' && plan.price !== 'Custom' && annualPlanPrices[plan.id as keyof typeof annualPlanPrices]) {
      return {
        ...plan,
        price: annualPlanPrices[plan.id as keyof typeof annualPlanPrices],
        originalPrice: plan.price
      };
    }
    return plan;
  });
  
  // Handle selecting enterprise plan
  const handleSelectEnterprise = () => {
    if (enterprisePlan) {
      setSelectedPlan(enterprisePlan.id);
    }
  };
  
  const steps = [
    {
      title: "Choose Your Billing Option",
      description: ""
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
    
    // Redirect to dashboard
    navigate("/dashboard");
  };
  
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
            <WizardHeader 
              currentStep={currentStep} 
              steps={steps} 
            />
          </CardHeader>
          
          <CardContent className="py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left side - Current step content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Step 1: Choose Billing Option */}
                {currentStep === 0 && (
                  <BillingOptionStep
                    billingCycle={billingCycle}
                    onBillingCycleChange={handleBillingCycleChange}
                    adjustedPlans={adjustedPlans}
                    selectedPlan={selectedPlan}
                    onPlanChange={handlePlanChange}
                    enterprisePlan={enterprisePlan}
                    onSelectEnterprise={handleSelectEnterprise}
                  />
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
              
              {/* Right side - Subscription Summary and Enterprise Card */}
              <div>
                <WizardSidebar 
                  currentStep={currentStep}
                  selectedPlan={selectedPlan}
                  plans={plans}
                  activeAddOns={activeAddOns}
                  addOns={addOns}
                  costs={costs}
                  billingCycle={billingCycle}
                  enterprisePlan={enterprisePlan}
                  onSelectEnterprise={handleSelectEnterprise}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <WizardFooter
              currentStep={currentStep}
              totalSteps={steps.length}
              handleBack={handleBack}
              handleNext={handleNext}
              handleSubmit={handleSubmit}
            />
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default PlanSignupWizard;
