
import { useState } from "react";

export const useBillingCycle = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  const handleBillingCycleChange = (cycle: 'monthly' | 'annual') => {
    setBillingCycle(cycle);
  };
  
  return {
    billingCycle,
    handleBillingCycleChange
  };
};
