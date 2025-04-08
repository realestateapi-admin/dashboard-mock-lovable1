
import { useState, useEffect } from "react";
import { PlanData, AddOnData, SubscriptionData } from "@/types/billing";
import { isPaidPlan } from "@/services/subscriptionService";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { annualPlanPrices } from "@/data/plans";

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
  // Get initial plan from localStorage or default to "growth"
  const getInitialPlan = () => {
    const storedPlan = localStorage.getItem('selectedPlan') || sessionStorage.getItem('selectedPlan');
    return storedPlan && plans.some(p => p.id === storedPlan) ? storedPlan : "growth";
  };
  
  // Get initial add-ons from localStorage or default to empty array
  const getInitialAddOns = () => {
    try {
      // Try first from localStorage - this would be from the signup flow
      const storedAddOns = localStorage.getItem('activeAddOns');
      if (storedAddOns) {
        const parsed = JSON.parse(storedAddOns);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log("Loaded add-ons from localStorage:", parsed);
          return parsed;
        }
      }
      
      // Try from selectedAddOns - this could be from the StepTwo component
      const selectedAddOns = localStorage.getItem('selectedAddOns');
      if (selectedAddOns) {
        const parsed = JSON.parse(selectedAddOns);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log("Loaded add-ons from selectedAddOns:", parsed);
          // Also store in activeAddOns for consistency
          localStorage.setItem('activeAddOns', selectedAddOns);
          return parsed;
        }
      }
      
      // Default to empty array if nothing found
      return [];
    } catch (e) {
      console.error("Error parsing stored add-ons:", e);
      return [];
    }
  };
  
  // Get initial overage handling from localStorage or default to "cut-off"
  const getInitialOverageHandling = () => {
    const storedOverageHandling = localStorage.getItem('overageHandling');
    return storedOverageHandling || "cut-off";
  };
  
  const [selectedPlan, setSelectedPlan] = useState(getInitialPlan());
  const [overageHandling, setOverageHandling] = useState(getInitialOverageHandling());
  const [activeAddOns, setActiveAddOns] = useState<string[]>(getInitialAddOns());
  
  // Get access to the trial context
  let trialContext;
  try {
    trialContext = useTrialAlert();
  } catch (e) {
    console.warn("TrialAlertContext not available, using default values");
    trialContext = { isOnPaidPlan: false };
  }
  const { isOnPaidPlan } = trialContext;

  // Store plan choices in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('selectedPlan', selectedPlan);
  }, [selectedPlan]);
  
  useEffect(() => {
    localStorage.setItem('overageHandling', overageHandling);
  }, [overageHandling]);
  
  useEffect(() => {
    localStorage.setItem('activeAddOns', JSON.stringify(activeAddOns));
  }, [activeAddOns]);

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
      
      // Set overage handling if provided in subscription
      if (subscription.overage_handling) {
        setOverageHandling(subscription.overage_handling);
      }
      
      // Set active add-ons if provided in subscription
      if (subscription.add_ons && subscription.add_ons.length > 0) {
        setActiveAddOns(subscription.add_ons);
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
