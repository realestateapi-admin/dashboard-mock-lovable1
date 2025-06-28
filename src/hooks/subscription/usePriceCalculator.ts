
import { PlanData, AddOnData } from "@/types/billing";
import { annualPlanPrices } from "@/data/plans";

export interface PriceCalculatorReturn {
  calculateMonthlyCost: (
    selectedPlan: string,
    activeAddOns: string[],
    billingCycle?: 'monthly' | 'annual'
  ) => {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
}

export const usePriceCalculator = (
  plans: PlanData[],
  addOns: AddOnData[]
): PriceCalculatorReturn => {
  const calculateMonthlyCost = (
    selectedPlan: string,
    activeAddOns: string[],
    billingCycle: 'monthly' | 'annual' = 'monthly'
  ) => {
    const basePlan = plans.find(p => p.id === selectedPlan);
    if (!basePlan) return { basePrice: "$0", totalAddOns: "$0", total: "$0" };
    
    if (selectedPlan === "enterprise") {
      return {
        basePrice: "Custom",
        totalAddOns: "Custom",
        total: "Custom pricing"
      };
    }
    
    // Calculate base plan price with discount for annual billing
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
    
    // Calculate add-ons total (NO DISCOUNT APPLIED TO ADD-ONS)
    let addOnTotal = 0;
    activeAddOns.forEach(addOnId => {
      const addon = addOns.find(a => a.id === addOnId);
      if (!addon) return;
      
      const priceStr = addon.prices[selectedPlan as keyof typeof addon.prices];
      if (!priceStr || priceStr === "Included") return;
      
      if (addon.billingType === 'subscription') {
        const numericPrice = parseInt(priceStr.replace(/\$|,|\/month/g, ""));
        if (!isNaN(numericPrice)) {
          // Add-ons are NOT discounted for annual billing
          addOnTotal += numericPrice;
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

  return {
    calculateMonthlyCost
  };
};
