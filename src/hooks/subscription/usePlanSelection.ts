
import { useState, useEffect } from "react";
import { PlanData, SubscriptionData } from "@/types/billing";

export interface PlanSelectionReturn {
  selectedPlan: string;
  setSelectedPlan: (planId: string) => void;
}

export const usePlanSelection = (
  plans: PlanData[],
  subscription?: SubscriptionData | null
): PlanSelectionReturn => {
  // Initialize selected plan from localStorage or default to "growth"
  const getInitialPlan = () => {
    const storedPlan = localStorage.getItem('selectedPlan') || sessionStorage.getItem('selectedPlan');
    return storedPlan && plans.some(p => p.id === storedPlan) ? storedPlan : "growth";
  };

  const [selectedPlan, setSelectedPlan] = useState(getInitialPlan());
  
  // Persist selected plan to localStorage
  useEffect(() => {
    localStorage.setItem('selectedPlan', selectedPlan);
  }, [selectedPlan]);

  // Update selected plan when subscription changes
  useEffect(() => {
    if (subscription) {
      const planId = plans.find(p => 
        p.name.toLowerCase() === subscription.plan_name.toLowerCase()
      )?.id;
      
      if (planId) {
        setSelectedPlan(planId);
      }
    }
  }, [subscription, plans]);

  return {
    selectedPlan,
    setSelectedPlan
  };
};
