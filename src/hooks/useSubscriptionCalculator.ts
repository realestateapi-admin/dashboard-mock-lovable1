
import { useState, useEffect } from "react";
import { PlanData, AddOnData, SubscriptionData } from "@/types/billing";
import { isPaidPlan } from "@/services/subscriptionService";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

interface SubscriptionCalculatorReturn {
  selectedPlan: string;
  setSelectedPlan: (planId: string) => void;
  overageHandling: string;
  setOverageHandling: (value: string) => void;
  activeAddOns: string[];
  setActiveAddOns: (addOns: string[]) => void;
  toggleAddOn: (addOnId: string) => void;
  calculateMonthlyCost: () => {
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
  const [selectedPlan, setSelectedPlan] = useState("growth");
  const [overageHandling, setOverageHandling] = useState("stop");
  const [activeAddOns, setActiveAddOns] = useState<string[]>(["premium-avm"]);
  
  // Get access to the trial context
  const { isOnPaidPlan } = useTrialAlert();

  const toggleAddOn = (addOnId: string) => {
    setActiveAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  // Calculate estimated monthly cost for UI purposes when no subscription is available
  const calculateMonthlyCost = () => {
    const basePlan = plans.find(p => p.id === selectedPlan);
    if (!basePlan) return { basePrice: "$0", totalAddOns: "$0", total: "$0" };
    
    // For Enterprise plan, we don't show pricing
    if (selectedPlan === "enterprise") {
      return {
        basePrice: "Custom",
        totalAddOns: "Custom",
        total: "Custom pricing"
      };
    }
    
    // Extract numeric price from base plan (removing $ and ,)
    const basePrice = parseInt(basePlan.price.replace(/\$|,/g, ""));
    
    // Calculate add-on costs - only include subscription add-ons (not metered)
    let addOnTotal = 0;
    activeAddOns.forEach(addOnId => {
      const addon = addOns.find(a => a.id === addOnId);
      if (!addon) return;
      
      const priceStr = addon.prices[selectedPlan as keyof typeof addon.prices];
      if (priceStr === "Included") return;
      
      // Only include subscription add-ons and parse their price
      if (addon.billingType === 'subscription') {
        // Handle both formats: "$X/month" or just "$X"
        const numericPrice = parseInt(priceStr.replace(/\$|,|\/month/g, ""));
        if (!isNaN(numericPrice)) {
          addOnTotal += numericPrice;
        }
      }
    });
    
    // Calculate total (base + add-ons)
    const total = basePrice + addOnTotal;
    
    return {
      basePrice: `$${basePrice.toLocaleString()}`,
      totalAddOns: `$${addOnTotal.toLocaleString()}`,
      total: `$${total.toLocaleString()}`
    };
  };

  // If we have a subscription, set the selected plan to match
  useEffect(() => {
    if (subscription) {
      // Find the plan that matches the subscription plan_name
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
    setSelectedPlan,
    overageHandling,
    setOverageHandling,
    activeAddOns,
    setActiveAddOns,
    toggleAddOn,
    calculateMonthlyCost
  };
};
