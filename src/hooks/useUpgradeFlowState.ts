
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Import hooks and services
import { useSubscriptionData } from "@/hooks/useSubscriptionData";
import { useSubscriptionCalculator } from "@/hooks/useSubscriptionCalculator";
import { plans, addOns } from "@/data/billingData";

// Wizard step type
export type UpgradeStep = 'manage' | 'plan' | 'addons' | 'overage' | 'terms' | 'confirmation';

export const useUpgradeFlowState = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Wizard state
  const [currentStep, setCurrentStep] = useState<UpgradeStep>('manage');
  const [previousStep, setPreviousStep] = useState<UpgradeStep | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Store original subscription state for comparison - never mutated after initial setup
  const originalSubscriptionRef = useRef({
    planId: '',
    addOns: [] as string[],
    overageHandling: '',
    billingCycle: 'monthly' as 'monthly' | 'annual'
  });
  
  // Track if we've initialized the original subscription state
  const hasInitializedRef = useRef(false);
  
  // Initialize billing cycle from localStorage or default to monthly
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(() => {
    const storedCycle = localStorage.getItem('billingCycle');
    return (storedCycle === 'annual' || storedCycle === 'monthly') 
      ? storedCycle as 'monthly' | 'annual' 
      : 'monthly';
  });
  
  // Fetch subscription data
  const {
    subscription,
    isLoading: isLoadingSubscription
  } = useSubscriptionData();

  // Use the subscription calculator hook for proposed changes
  const {
    selectedPlan,
    setSelectedPlan,
    overageHandling,
    setOverageHandling,
    activeAddOns,
    toggleAddOn,
    calculateMonthlyCost
  } = useSubscriptionCalculator(plans, addOns, subscription);

  // Calculate costs based on billing cycle
  const costs = calculateMonthlyCost(billingCycle);

  // Effect to initialize original subscription state ONCE
  useEffect(() => {
    if (subscription && !hasInitializedRef.current) {
      // Find the plan ID that matches the subscription plan name
      const planId = plans.find(p => 
        p.name.toLowerCase() === subscription.plan_name.toLowerCase()
      )?.id || selectedPlan;
      
      // Save the original state for comparison - this never changes during the session
      originalSubscriptionRef.current = {
        planId,
        addOns: subscription.add_ons || [],
        overageHandling: subscription.overage_handling || 'cut-off',
        billingCycle: Boolean(subscription.contract_end_date) ? 'annual' : 'monthly'
      };
      
      hasInitializedRef.current = true;
      console.log("Initialized original subscription state:", originalSubscriptionRef.current);
    }
  }, [subscription, selectedPlan]);

  // Effect to set billing cycle based on subscription data
  useEffect(() => {
    if (subscription && !hasInitializedRef.current) {
      // Check if subscription has a contract end date (which indicates annual billing)
      const isAnnual = Boolean(subscription.contract_end_date);
      setBillingCycle(isAnnual ? 'annual' : 'monthly');
      
      // Set the overage handling from the subscription if available
      if (subscription.overage_handling) {
        setOverageHandling(subscription.overage_handling);
      }
    }
  }, [subscription]);

  // Effect to set initial add-ons based on the subscription data
  useEffect(() => {
    if (subscription && subscription.add_ons && subscription.add_ons.length > 0 && !hasInitializedRef.current) {
      // Set the active add-ons from the subscription
      subscription.add_ons.forEach(addOnId => {
        if (!activeAddOns.includes(addOnId)) {
          toggleAddOn(addOnId);
        }
      });
    }
  }, [subscription, activeAddOns, toggleAddOn]);

  // Save billing cycle to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('billingCycle', billingCycle);
  }, [billingCycle]);

  // Get the current plan object (for proposed changes)
  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[0];
  
  // Get active add-ons as full objects (for proposed changes)
  const activeAddOnsData = addOns.filter(addon => 
    activeAddOns.includes(addon.id)
  );

  // Navigation handlers
  const goToStep = (step: UpgradeStep) => {
    setPreviousStep(currentStep);
    setCurrentStep(step);
  };

  const goBack = () => {
    if (previousStep) {
      setCurrentStep(previousStep);
      setPreviousStep(null);
    } else {
      // If no previous step is recorded, go to the manage step
      setCurrentStep('manage');
    }
  };

  // Calculate current step index for progress bar
  const getStepIndex = () => {
    const stepOrder: UpgradeStep[] = ['manage', 'plan', 'addons', 'overage', 'terms', 'confirmation'];
    return stepOrder.indexOf(currentStep);
  }

  // Handle terms acceptance
  const handleTermsAccepted = (accepted: boolean) => {
    setTermsAccepted(accepted);
  };

  // Handle plan finalization
  const handleFinalizePlan = () => {
    goToStep('terms');
  };

  // Handle billing cycle change with annual plan restriction
  const handleBillingCycleChange = (cycle: 'monthly' | 'annual') => {
    // If user is on annual plan, don't allow switching to monthly
    if (billingCycle === 'annual' && cycle === 'monthly') {
      toast({
        title: "Cannot change to monthly billing",
        description: "Annual plans require a 12-month commitment. You cannot switch back to monthly billing until your contract ends.",
        variant: "destructive"
      });
      return;
    }
    
    setBillingCycle(cycle);
    localStorage.setItem('billingCycle', cycle);
  };

  // Handle submission after terms acceptance
  const handleSubmitChanges = () => {
    if (termsAccepted) {
      goToStep('confirmation');
    } else {
      toast({
        title: "Terms of Service Required",
        description: "Please accept the Terms of Service to continue.",
        variant: "destructive"
      });
    }
  };

  return {
    currentStep,
    setCurrentStep,
    isLoadingSubscription,
    currentPlan,
    activeAddOnsData,
    overageHandling,
    billingCycle,
    termsAccepted,
    getStepIndex,
    goToStep,
    goBack,
    handleTermsAccepted,
    handleFinalizePlan,
    handleBillingCycleChange,
    handleSubmitChanges,
    setSelectedPlan,
    setOverageHandling,
    toggleAddOn,
    activeAddOns,
    costs,
    selectedPlan
  };
};
