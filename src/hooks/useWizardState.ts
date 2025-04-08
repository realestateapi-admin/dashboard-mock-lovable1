
import { useEffect, useState } from "react";
import { useAccountExecutive } from "@/contexts/AccountExecutiveContext";

// Import plan data from the new location
import { plans, addOns } from "@/data/billingData";
import { useSubscriptionCalculator } from "@/hooks/useSubscriptionCalculator";

// Import the new modular hooks
import { useWizardSteps } from "./wizard/useWizardSteps";
import { useBillingCycle } from "./wizard/useBillingCycle";
import { useCreditCardInfo } from "./wizard/useCreditCardInfo";
import { useSubscriptionSubmit } from "./wizard/useSubscriptionSubmit";

export const useWizardState = () => {
  const { setIsEnterprisePlan } = useAccountExecutive();
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Use the step management hook
  const { 
    currentStep, 
    steps, 
    isLoading, 
    setIsLoading, 
    handleNext: nextStep, 
    handleBack: prevStep 
  } = useWizardSteps();
  
  // Initialize billing cycle from localStorage
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(() => {
    const storedCycle = localStorage.getItem('billingCycle');
    return (storedCycle === 'annual' || storedCycle === 'monthly') 
      ? storedCycle as 'monthly' | 'annual' 
      : 'monthly';
  });
  
  // Use the credit card info hook
  const { 
    creditCardInfo 
  } = useCreditCardInfo();
  
  // Use the submission hook
  const { 
    isSubmitting, 
    handleSubmit: submitSubscription 
  } = useSubscriptionSubmit();
  
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
  
  // Calculate costs based on current billing cycle
  const costs = calculateMonthlyCost(billingCycle);
  
  // Find the enterprise plan
  const enterprisePlan = plans.find(p => p.id === "enterprise");
  // Filter out enterprise plan from the regular plans list for display
  const regularPlans = plans.filter(p => p.id !== "enterprise");
  
  // Simulate data loading on initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // Update enterprise plan status when the selected plan changes
  useEffect(() => {
    // Check if the selected plan is the enterprise plan
    const isEnterprisePlan = selectedPlan === 'enterprise';
    
    // Update the enterprise status in the AccountExecutiveContext
    setIsEnterprisePlan(isEnterprisePlan);
    
    // Store the selected plan in localStorage
    if (selectedPlan) {
      localStorage.setItem('selectedPlan', selectedPlan);
    }
  }, [selectedPlan, setIsEnterprisePlan]);
  
  // Handle selecting enterprise plan
  const handleSelectEnterprise = () => {
    if (enterprisePlan) {
      setSelectedPlan(enterprisePlan.id);
    }
  };
  
  // Handle next step with validation
  const handleNext = () => {
    nextStep(overageHandling, termsAccepted);
  };
  
  // Handle back step
  const handleBack = () => {
    prevStep();
  };
  
  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
  };
  
  const handleTermsAccepted = (accepted: boolean) => {
    setTermsAccepted(accepted);
  };
  
  const handleBillingCycleChange = (cycle: 'monthly' | 'annual') => {
    setBillingCycle(cycle);
    localStorage.setItem('billingCycle', cycle);
  };
  
  const handleSubmit = () => {
    // Only allow submission if terms have been accepted
    if (termsAccepted) {
      // Save billing cycle to localStorage
      localStorage.setItem('billingCycle', billingCycle);
      submitSubscription(selectedPlan);
    }
  };
  
  return {
    currentStep,
    billingCycle,
    isLoading,
    isSubmitting,
    selectedPlan,
    overageHandling,
    setOverageHandling,
    activeAddOns,
    toggleAddOn,
    costs,
    steps,
    enterprisePlan,
    regularPlans,
    creditCardInfo,
    termsAccepted,
    handleTermsAccepted,
    handleSelectEnterprise,
    handleNext,
    handleBack,
    handleBillingCycleChange,
    handlePlanChange,
    handleSubmit
  };
};
