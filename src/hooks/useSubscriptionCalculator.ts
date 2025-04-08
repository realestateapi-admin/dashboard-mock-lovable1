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
  const getInitialPlan = () => {
    const storedPlan = localStorage.getItem('selectedPlan') || sessionStorage.getItem('selectedPlan');
    return storedPlan && plans.some(p => p.id === storedPlan) ? storedPlan : "growth";
  };
  
  const getInitialAddOns = () => {
    try {
      const storedAddOns = localStorage.getItem('activeAddOns');
      if (storedAddOns) {
        const parsed = JSON.parse(storedAddOns);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log("Loaded add-ons from localStorage:", parsed);
          return parsed;
        }
      }
      
      const selectedAddOns = localStorage.getItem('selectedAddOns');
      if (selectedAddOns) {
        const parsed = JSON.parse(selectedAddOns);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log("Loaded add-ons from selectedAddOns:", parsed);
          localStorage.setItem('activeAddOns', selectedAddOns);
          return parsed;
        }
      }
      
      return [];
    } catch (e) {
      console.error("Error parsing stored add-ons:", e);
      return [];
    }
  };
  
  const getInitialOverageHandling = () => {
    const storedOverageHandling = localStorage.getItem('overageHandling');
    return storedOverageHandling || "cut-off";
  };
  
  const [selectedPlan, setSelectedPlan] = useState(getInitialPlan());
  const [overageHandling, setOverageHandling] = useState(getInitialOverageHandling());
  const [activeAddOns, setActiveAddOns] = useState<string[]>(getInitialAddOns());
  
  let trialContext;
  try {
    trialContext = useTrialAlert();
  } catch (e) {
    console.warn("TrialAlertContext not available, using default values");
    trialContext = { isOnPaidPlan: false };
  }
  const { isOnPaidPlan } = trialContext;

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

  const calculateMonthlyCost = (billingCycle: 'monthly' | 'annual' = 'monthly') => {
    const basePlan = plans.find(p => p.id === selectedPlan);
    if (!basePlan) return { basePrice: "$0", totalAddOns: "$0", total: "$0" };
    
    if (selectedPlan === "enterprise") {
      return {
        basePrice: "Custom",
        totalAddOns: "Custom",
        total: "Custom pricing"
      };
    }
    
    let basePrice = 0;
    if (billingCycle === 'annual') {
      const annualPriceStr = annualPlanPrices[selectedPlan as keyof typeof annualPlanPrices];
      if (annualPriceStr) {
        basePrice = parseInt(annualPriceStr.replace(/\$|,/g, ""));
      } else {
        basePrice = parseInt((basePlan.price || "$0").replace(/\$|,/g, "")) * 0.8;
      }
    } else {
      basePrice = parseInt((basePlan.price || "$0").replace(/\$|,/g, ""));
    }
    
    let addOnTotal = 0;
    activeAddOns.forEach(addOnId => {
      const addon = addOns.find(a => a.id === addOnId);
      if (!addon) return;
      
      const priceStr = addon.prices[selectedPlan as keyof typeof addon.prices];
      if (!priceStr || priceStr === "Included") return;
      
      if (addon.billingType === 'subscription') {
        const numericPrice = parseInt(priceStr.replace(/\$|,|\/month/g, ""));
        if (!isNaN(numericPrice)) {
          addOnTotal += billingCycle === 'annual' ? numericPrice * 0.8 : numericPrice;
        }
      }
    });
    
    const total = basePrice + addOnTotal;
    
    return {
      basePrice: `$${basePrice.toLocaleString()}`,
      totalAddOns: `$${addOnTotal.toLocaleString()}`,
      total: `$${total.toLocaleString()}`
    };
  };

  useEffect(() => {
    if (subscription) {
      const planId = plans.find(p => 
        p.name.toLowerCase() === subscription.plan_name.toLowerCase()
      )?.id;
      
      if (planId) {
        setSelectedPlan(planId);
      }
      
      if (subscription.overage_handling) {
        setOverageHandling(subscription.overage_handling);
      }
      
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
