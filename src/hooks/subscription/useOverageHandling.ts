
import { useState, useEffect } from "react";
import { SubscriptionData } from "@/types/billing";

export interface OverageHandlingReturn {
  overageHandling: string;
  setOverageHandling: (value: string) => void;
}

export const useOverageHandling = (
  subscription?: SubscriptionData | null
): OverageHandlingReturn => {
  // Initialize overage handling from localStorage or default to "cut-off"
  const getInitialOverageHandling = () => {
    const storedOverageHandling = localStorage.getItem('overageHandling');
    return storedOverageHandling || "cut-off";
  };
  
  const [overageHandling, setOverageHandlingState] = useState(getInitialOverageHandling());
  
  // Wrapper for setOverageHandling to validate "unlimited" option against plan type
  const setOverageHandling = (value: string) => {
    // Get the current selected plan from localStorage
    const selectedPlan = localStorage.getItem('selectedPlan') || '';
    
    // Prevent setting "unlimited" for Starter plans
    if (value === "unlimited" && selectedPlan === "starter") {
      console.warn("Unlimited overage is not available for Starter plans");
      return;
    }
    
    setOverageHandlingState(value);
  };
  
  // Persist overage handling to localStorage
  useEffect(() => {
    localStorage.setItem('overageHandling', overageHandling);
  }, [overageHandling]);

  // Update overage handling when subscription changes
  useEffect(() => {
    if (subscription && subscription.overage_handling) {
      setOverageHandlingState(subscription.overage_handling);
    }
  }, [subscription]);

  return {
    overageHandling,
    setOverageHandling
  };
};
