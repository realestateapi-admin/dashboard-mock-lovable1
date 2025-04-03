
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

// Import plan data
import { plans, addOns } from "@/data/billingData";
import { useSubscriptionCalculator } from "@/hooks/useSubscriptionCalculator";

export const useWizardState = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { startFreeTrial } = useTrialAlert();
  
  // Step management
  const [currentStep, setCurrentStep] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  }, []);
  
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
  
  // Simulate loading when moving between steps
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(prevStep => prevStep + 1);
        setIsLoading(false);
      }, 500);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(prevStep => prevStep - 1);
        setIsLoading(false);
      }, 500);
    }
  };
  
  const handleBillingCycleChange = (cycle: 'monthly' | 'annual') => {
    setBillingCycle(cycle);
  };
  
  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
  };
  
  const handleSubmit = () => {
    // Simulate submission loading
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      
      // In a real application, this would process the payment via Stripe
      toast({
        title: "Subscription Successful",
        description: "Your subscription has been successfully processed.",
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    }, 2000);
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
    handleSelectEnterprise,
    handleNext,
    handleBack,
    handleBillingCycleChange,
    handlePlanChange,
    handleSubmit
  };
};
