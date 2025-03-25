
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useDashboardRefresh } from "@/components/dashboard/DashboardRefresh";

interface DashboardContextType {
  isLoading: boolean;
  isRefreshing: boolean;
  handleRefresh: () => Promise<void>;
  dailyUsageData: any[];
  monthlyUsageData: any[];
  endpointUsage: any[];
  recentActivity: any[];
  usageDistributionData: any[];
  totalApiCalls: number;
  totalRecords: number;
  recordsPercentage: number;
  monthlyApiCalls: number;
  monthlyRecords: number;
  monthlyRecordsPercentage: number;
  currentTimePeriod: 'daily' | 'monthly';
  setCurrentTimePeriod: (period: 'daily' | 'monthly') => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
  dailyUsageData: any[];
  monthlyUsageData: any[];
  endpointUsage: any[];
  recentActivity: any[];
  usageDistributionData: any[];
  onTimePeriodChange?: (period: 'daily' | 'monthly') => void;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ 
  children, 
  dailyUsageData, 
  monthlyUsageData, 
  endpointUsage, 
  recentActivity,
  usageDistributionData,
  onTimePeriodChange
}) => {
  const { isLoading, isRefreshing, handleRefresh } = useDashboardRefresh();
  const [currentTimePeriod, setCurrentTimePeriod] = useState<'daily' | 'monthly'>('daily');
  
  // Notify parent component when time period changes
  useEffect(() => {
    if (onTimePeriodChange) {
      onTimePeriodChange(currentTimePeriod);
    }
  }, [currentTimePeriod, onTimePeriodChange]);
  
  // Calculate derived values
  const totalApiCalls = dailyUsageData.reduce((sum, day) => sum + day.calls, 0);
  const totalRecords = dailyUsageData.reduce((sum, day) => sum + day.records, 0);
  const recordsPercentage = (totalRecords / 10000) * 100;

  const monthlyApiCalls = monthlyUsageData.reduce((sum, month) => sum + month.calls, 0);
  const monthlyRecords = monthlyUsageData.reduce((sum, month) => sum + month.records, 0);
  const monthlyRecordsPercentage = (monthlyRecords / 300000) * 100;

  return (
    <DashboardContext.Provider value={{
      isLoading,
      isRefreshing,
      handleRefresh,
      dailyUsageData,
      monthlyUsageData,
      endpointUsage,
      recentActivity,
      usageDistributionData,
      totalApiCalls,
      totalRecords,
      recordsPercentage,
      monthlyApiCalls,
      monthlyRecords,
      monthlyRecordsPercentage,
      currentTimePeriod,
      setCurrentTimePeriod
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
