
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useBillingCycleManagement = () => {
  const { toast } = useToast();
  
  // Initialize billing cycle from localStorage or default to monthly
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(() => {
    const storedCycle = localStorage.getItem('billingCycle');
    return (storedCycle === 'annual' || storedCycle === 'monthly') 
      ? storedCycle as 'monthly' | 'annual' 
      : 'monthly';
  });

  // Save billing cycle to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('billingCycle', billingCycle);
  }, [billingCycle]);

  // Handle billing cycle change with annual plan restriction
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

  return { 
    billingCycle, 
    handleBillingCycleChange 
  };
};
