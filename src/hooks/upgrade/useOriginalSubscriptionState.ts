
import { useRef, useEffect } from "react";
import { useSubscriptionData } from "@/hooks/useSubscriptionData";
import { plans } from "@/data/billingData";

export const useOriginalSubscriptionState = () => {
  // Store original subscription state for comparison - never mutated after initial setup
  const originalSubscriptionRef = useRef({
    planId: '',
    addOns: [] as string[],
    overageHandling: '',
    billingCycle: 'monthly' as 'monthly' | 'annual'
  });
  
  // Track if we've initialized the original subscription state
  const hasInitializedRef = useRef(false);
  
  // Fetch subscription data
  const {
    subscription,
    isLoading: isLoadingSubscription
  } = useSubscriptionData();

  // Effect to initialize original subscription state ONCE
  useEffect(() => {
    if (subscription && !hasInitializedRef.current) {
      // Find the plan ID that matches the subscription plan name
      const planId = plans.find(p => 
        p.name.toLowerCase() === subscription.plan_name.toLowerCase()
      )?.id || '';
      
      // Save the original state for comparison - this never changes during the session
      originalSubscriptionRef.current = {
        planId,
        addOns: subscription.add_ons || [],
        overageHandling: subscription.overage_handling || 'cut-off',
        billingCycle: Boolean(subscription.contract_end_date) ? 'annual' : 'monthly'
      };
      
      hasInitializedRef.current = true;
      console.log("Initialized original subscription state:", originalSubscriptionRef.current);
    }
  }, [subscription]);

  return {
    originalSubscription: originalSubscriptionRef.current,
    subscription,
    isLoadingSubscription
  };
};
