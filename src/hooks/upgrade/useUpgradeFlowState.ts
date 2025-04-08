
import { useNavigate } from "react-router-dom";
import { plans, addOns } from "@/data/billingData";
import { useSubscriptionCalculator } from "@/hooks/useSubscriptionCalculator";
import { useWizardStepManagement } from "./useWizardStepManagement";
import { useBillingCycleManagement } from "./useBillingCycleManagement";
import { useOriginalSubscriptionState } from "./useOriginalSubscriptionState";

// Re-export the UpgradeStep type from useWizardStepManagement
export type { UpgradeStep } from "./useWizardStepManagement";

export const useUpgradeFlowState = () => {
  const navigate = useNavigate();
  
  // Use the specialized hooks
  const { 
    currentStep, 
    termsAccepted, 
    getStepIndex, 
    goToStep, 
    goBack, 
    handleTermsAccepted, 
    handleFinalizePlan, 
    handleSubmitChanges 
  } = useWizardStepManagement();
  
  const { 
    billingCycle, 
    handleBillingCycleChange 
  } = useBillingCycleManagement();
  
  const { 
    originalSubscription,
    subscription, 
    isLoadingSubscription 
  } = useOriginalSubscriptionState();

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

  // Get the current plan object (for proposed changes)
  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[0];
  
  // Get active add-ons as full objects (for proposed changes)
  const activeAddOnsData = addOns.filter(addon => 
    activeAddOns.includes(addon.id)
  );
  
  return {
    // Step management
    currentStep,
    termsAccepted,
    getStepIndex,
    goToStep,
    goBack,
    handleTermsAccepted,
    handleFinalizePlan,
    handleSubmitChanges,
    
    // Billing cycle management
    billingCycle,
    handleBillingCycleChange,
    
    // Original state and loading state
    isLoadingSubscription,
    
    // Current state (for proposed changes)
    currentPlan,
    selectedPlan,
    setSelectedPlan,
    activeAddOnsData,
    activeAddOns,
    overageHandling,
    setOverageHandling,
    toggleAddOn,
    
    // Cost calculations
    costs
  };
};
