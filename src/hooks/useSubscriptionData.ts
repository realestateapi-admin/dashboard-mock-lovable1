
import { useState, useEffect, useCallback } from 'react';
import { SubscriptionData } from '@/types/billing';
import { fetchSubscription } from '@/services/subscriptionService';

export function useSubscriptionData(accountId?: number) {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchSubscription(accountId);
      setSubscription(data);
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
