
import { useState, useEffect } from "react";

export const useBillingCycle = () => {
  // Initialize from localStorage or default to monthly
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(() => {
    const storedCycle = localStorage.getItem('billingCycle');
    return (storedCycle === 'annual' || storedCycle === 'monthly') 
      ? storedCycle as 'monthly' | 'annual' 
      : 'monthly';
  });
  
  const handleBillingCycleChange = (cycle: 'monthly' | 'annual') => {
    setBillingCycle(cycle);
    localStorage.setItem('billingCycle', cycle);
  };

  // Update localStorage when billing cycle changes
  useEffect(() => {
    localStorage.setItem('billingCycle', billingCycle);
  }, [billingCycle]);
  
  return {
    billingCycle,
    handleBillingCycleChange
  };
};
