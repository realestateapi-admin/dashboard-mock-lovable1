
import { useBillingCycleStorage } from "./useBillingCycleStorage";
import { useBillingCycleValidation } from "./useBillingCycleValidation";

export const useBillingCycleManagement = () => {
  // Use storage hook for billing cycle
  const { billingCycle, setBillingCycle } = useBillingCycleStorage();
  
  // Use validation hook for billing cycle changes
  const { validateBillingCycleChange } = useBillingCycleValidation({ 
    currentBillingCycle: billingCycle 
  });

  // Handle billing cycle change with validation
  const handleBillingCycleChange = (cycle: 'monthly' | 'annual') => {
    // Validate the change first
    if (!validateBillingCycleChange(cycle)) {
      return;
    }
    
    // If validation passes, update the billing cycle
    setBillingCycle(cycle);
  };

  return { 
    billingCycle, 
    handleBillingCycleChange 
  };
};
