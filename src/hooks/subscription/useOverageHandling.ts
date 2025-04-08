
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
  
  const [overageHandling, setOverageHandling] = useState(getInitialOverageHandling());
  
  // Persist overage handling to localStorage
  useEffect(() => {
    localStorage.setItem('overageHandling', overageHandling);
  }, [overageHandling]);

  // Update overage handling when subscription changes
  useEffect(() => {
    if (subscription && subscription.overage_handling) {
      setOverageHandling(subscription.overage_handling);
    }
  }, [subscription]);

  return {
    overageHandling,
    setOverageHandling
  };
};
