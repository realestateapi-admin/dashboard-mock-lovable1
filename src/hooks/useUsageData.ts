
import { useState, useEffect, useCallback } from 'react';
import { UsageReport } from '@/types/usage';
import { fetchUsageReports, fetchUsageHistory } from '@/services/usageReportService';

export function useUsageData(accountId?: number) {
  const [currentUsage, setCurrentUsage] = useState<UsageReport | null>(null);
  const [usageHistory, setUsageHistory] = useState<UsageReport[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [current, history] = await Promise.all([
        fetchUsageReports(accountId),
        fetchUsageHistory(accountId)
      ]);
      
      setCurrentUsage(current);
      setUsageHistory(history);
    } catch (err) {
      console.error("Error fetching usage data:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch usage data"));
    } finally {
      setIsLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    currentUsage,
    usageHistory,
    isLoading,
    error,
    refetch: fetchData
  };
}
