
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useDashboardRefresh = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(loadingTimer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    setIsLoading(false);
    toast({
      title: "Dashboard refreshed",
      description: "Your data has been updated with the latest information.",
    });
  };

  return {
    isRefreshing,
    isLoading,
    handleRefresh
  };
};
