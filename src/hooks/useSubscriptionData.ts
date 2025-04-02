
import { useState, useEffect, useCallback } from 'react';
import { SubscriptionData } from '@/types/billing';
import { fetchSubscription, calculateRenewalDate } from '@/services/subscriptionService';

// Import useTrialAlert conditionally
let useTrialAlert: any;
try {
  // Try to import the hook, but don't throw if it fails
  useTrialAlert = require('@/contexts/TrialAlertContext').useTrialAlert;
} catch (e) {
  // Create a fallback if the import fails
  useTrialAlert = () => ({ isOnPaidPlan: false });
}

export function useSubscriptionData(accountId?: number) {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [renewalDate, setRenewalDate] = useState<string | null>(null);
  
  // We need to handle the case where the context might not be available
  let contextIsOnPaidPlan = false;
  try {
    const context = useTrialAlert();
    contextIsOnPaidPlan = context.isOnPaidPlan;
  } catch (e) {
    console.warn("TrialAlertContext not available, defaulting to not on paid plan");
  }

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchSubscription(accountId);
      
      // Calculate renewal date based on subscription start date or contract start date
      const startDate = data.subscription_start_date || data.contract_start_date;
      const calculatedRenewalDate = calculateRenewalDate(startDate);
      
      setSubscription(data);
      setRenewalDate(calculatedRenewalDate);
      
      // Update the trial context if the subscription indicates a paid plan
      // This would be handled by the backend in a real app
    } catch (err) {
      console.error("Error fetching subscription data:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch subscription data"));
    } finally {
      setIsLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    subscription,
    isLoading,
    error,
    renewalDate,
    refetch: fetchData
  };
}
