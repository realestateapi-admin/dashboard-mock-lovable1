
import { useState, useEffect, useCallback } from 'react';
import { SubscriptionData } from '@/types/billing';
import { fetchSubscription } from '@/services/subscriptionService';
import { useTrialAlert } from '@/contexts/TrialAlertContext';

export function useSubscriptionData(accountId?: number) {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { isOnPaidPlan: contextIsOnPaidPlan } = useTrialAlert();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchSubscription(accountId);
      setSubscription(data);
      
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
    refetch: fetchData
  };
}
