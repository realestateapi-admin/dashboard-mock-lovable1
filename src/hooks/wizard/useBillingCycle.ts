
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useBillingCycle = () => {
  const { toast } = useToast();
  
  // Initialize from localStorage or default to monthly
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(() => {
    const storedCycle = localStorage.getItem('billingCycle');
    return (storedCycle === 'annual' || storedCycle === 'monthly') 
      ? storedCycle as 'monthly' | 'annual' 
      : 'monthly';
  });
  
  const handleBillingCycleChange = (cycle: 'monthly' | 'annual') => {
    // If user is on annual plan, don't allow switching to monthly
    if (billingCycle === 'annual' && cycle === 'monthly') {
      toast({
        title: "Cannot change to monthly billing",
        description: "Annual plans require a 12-month commitment. You cannot switch back to monthly billing until your contract ends.",
        variant: "destructive"
      });
      return;
    }
    
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
