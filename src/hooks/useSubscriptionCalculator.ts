import { useState, useEffect } from "react";
import { PlanData, AddOnData, SubscriptionData } from "@/types/billing";
import { isPaidPlan } from "@/services/subscriptionService";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { annualPlanPrices } from "@/data/billingData";

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
  const [selectedPlan, setSelectedPlan] = useState("growth");
  const [overageHandling, setOverageHandling] = useState("stop");
  const [activeAddOns, setActiveAddOns] = useState<string[]>([]);
  
  // Get access to the trial context
  let trialContext;
  try {
    trialContext = useTrialAlert();
  } catch (e) {
    console.warn("TrialAlertContext not available, using default values");
    trialContext = { isOnPaidPlan: false };
  }
  const { isOnPaidPlan } = trialContext;

  const toggleAddOn = (addOnId: string) => {
    setActiveAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  // Calculate estimated monthly cost for UI purposes when no subscription is available
  const calculateMonthlyCost = (billingCycle: 'monthly' | 'annual' = 'monthly') => {
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
    
    // Use annual pricing if selected
    let basePrice = 0;
    if (billingCycle === 'annual' && annualPlanPrices[selectedPlan as keyof typeof annualPlanPrices]) {
      // Extract numeric price from annual plan price (removing $ and ,)
      const annualPriceStr = annualPlanPrices[selectedPlan as keyof typeof annualPlanPrices];
      basePrice = parseInt(annualPriceStr.replace(/\$|,/g, ""));
    } else {
      // Extract numeric price from base plan (removing $ and ,)
      basePrice = parseInt((basePlan.price || "$0").replace(/\$|,/g, ""));
    }
    
    // Calculate add-on costs - only include subscription add-ons (not metered)
    let addOnTotal = 0;
    activeAddOns.forEach(addOnId => {
      const addon = addOns.find(a => a.id === addOnId);
      if (!addon) return;
      
      const priceStr = addon.prices[selectedPlan as keyof typeof addon.prices];
      // Skip if price is not defined or is "Included"
      if (!priceStr || priceStr === "Included") return;
      
      // Only include subscription add-ons and parse their price
      if (addon.billingType === 'subscription') {
        // Handle both formats: "$X/month" or just "$X"
        const numericPrice = parseInt(priceStr.replace(/\$|,|\/month/g, ""));
        if (!isNaN(numericPrice)) {
          // REMOVED: No longer apply 20% discount for add-ons if annual billing
          // Add-on prices remain the same regardless of billing cycle
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
