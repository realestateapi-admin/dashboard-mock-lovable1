
import { PlanData, AddOnData } from "@/types/billing";
import { annualPlanPrices } from "@/data/plans";

export const formatOverageHandling = (value: string): string => {
  switch (value) {
    case 'cut-off':
      return 'Stop API calls when limit is reached';
    case 'allow-25':
      return 'Allow 25% overage';
    case 'allow-100':
      return 'Allow 100% overage';
    case 'unlimited':
      return 'Never cut off API key (mission critical)';
    default:
      return 'Not specified';
  }
};

export const getPlanPrice = (plan: PlanData, billingCycle: 'monthly' | 'annual') => {
  if (billingCycle === 'annual') {
    // Check if this plan has an annual price in the annualPlanPrices object
    const annualPrice = annualPlanPrices[plan.id as keyof typeof annualPlanPrices];
    return annualPrice || plan.price;
  }
  return plan.price;
};

// Check if add-ons have changed
export const addOnsChanged = (originalAddOns: AddOnData[], activeAddOns: AddOnData[]) => {
  if (originalAddOns.length !== activeAddOns.length) return true;
  
  // Check if any add-on IDs are different
  const originalIds = originalAddOns.map(a => a.id).sort();
  const currentIds = activeAddOns.map(a => a.id).sort();
  
  return originalIds.some((id, index) => id !== currentIds[index]);
};

// Helper to check if overage setting has changed
export const overageHandlingChanged = (original: string, current: string) => {
  return original !== current;
};
