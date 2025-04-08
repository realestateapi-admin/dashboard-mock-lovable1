
import { useState, useEffect } from "react";

export const useBillingCycleStorage = () => {
  // Initialize from localStorage or default to monthly
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(() => {
    const storedCycle = localStorage.getItem('billingCycle');
    return (storedCycle === 'annual' || storedCycle === 'monthly') 
      ? storedCycle as 'monthly' | 'annual' 
      : 'monthly';
  });
  
  // Sync with localStorage when billing cycle changes
  useEffect(() => {
    localStorage.setItem('billingCycle', billingCycle);
  }, [billingCycle]);
  
  return {
    billingCycle,
    setBillingCycle,
  };
};
