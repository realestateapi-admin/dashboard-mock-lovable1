
import { useEffect } from "react";
import { PlanData, AddOnData, SubscriptionData } from "@/types/billing";
import { isPaidPlan } from "@/services/subscriptionService";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { usePlanSelection } from "./subscription/usePlanSelection";
import { useAddOnManagement } from "./subscription/useAddOnManagement";
import { useOverageHandling } from "./subscription/useOverageHandling";
import { usePriceCalculator } from "./subscription/usePriceCalculator";

interface SubscriptionCalculatorReturn {
  selectedPlan: string;
  setSelectedPlan: (planId: string) => void;
  overageHandling: string;
  setOverageHandling: (value: string) => void;
  activeAddOns: string[];
  setActiveAddOns: (addOns: string[]) => void;
  toggleAddOn: (addOnId: string) => void;
  calculateMonthlyCost: (billingCycle?: 'monthly' | 'annual') => {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
}

export const useSubscriptionCalculator = (
  plans: PlanData[],
  addOns: AddOnData[],
  subscription?: SubscriptionData | null
): SubscriptionCalculatorReturn => {
  // Use smaller focused hooks
  const { selectedPlan, setSelectedPlan } = usePlanSelection(plans, subscription);
  const { activeAddOns, setActiveAddOns, toggleAddOn } = useAddOnManagement(addOns, subscription);
  const { overageHandling, setOverageHandling } = useOverageHandling(subscription);
  const { calculateMonthlyCost: calculatePrice } = usePriceCalculator(plans, addOns);
  
  // Trial context integration
  let trialContext;
  try {
    trialContext = useTrialAlert();
  } catch (e) {
    console.warn("TrialAlertContext not available, using default values");
    trialContext = { isOnPaidPlan: false };
  }
  
  // Wrap the price calculator to use current state values
  const calculateMonthlyCost = (billingCycle: 'monthly' | 'annual' = 'monthly') => {
    return calculatePrice(selectedPlan, activeAddOns, billingCycle);
  };

  return {
    selectedPlan,
    setSelectedPlan,
    overageHandling,
    setOverageHandling,
    activeAddOns,
    setActiveAddOns,
    toggleAddOn,
    calculateMonthlyCost
  };
};
