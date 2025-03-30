
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { useDashboard } from "@/contexts/DashboardContext";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSummary } from "@/components/dashboard/DashboardSummary";
import { UsageCharts } from "@/components/dashboard/UsageCharts";
import { RecentActivityList } from "@/components/dashboard/RecentActivityList";
import { EndpointUsageSection } from "@/components/dashboard/EndpointUsageSection";
import { RecordUsageBreakdown } from "@/components/dashboard/RecordUsageBreakdown";
import { ApiAccessSection } from "@/components/dashboard/ApiAccessSection";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

interface DashboardContentProps {
  trialBanner: ReactNode;
}

export const DashboardContent = ({ trialBanner }: DashboardContentProps) => {
  const { 
    isLoading, 
    isRefreshing, 
    handleRefresh,
    totalApiCalls,
    totalRecords,
    recordsPercentage,
    monthlyApiCalls,
    monthlyRecords,
    monthlyRecordsPercentage,
    recentActivity,
    endpointUsage,
    usageDistributionData
  } = useDashboard();

  const { isTrialActive, trialDaysLeft, isFreeUser } = useTrialAlert();

  return (
    <>
      <DashboardHeader 
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
      
      {trialBanner}
      
      <DashboardSummary 
        totalApiCalls={totalApiCalls}
        totalRecords={totalRecords}
        recordsPercentage={recordsPercentage}
        monthlyApiCalls={monthlyApiCalls}
        monthlyRecords={monthlyRecords}
        monthlyRecordsPercentage={monthlyRecordsPercentage}
        isTrialActive={isTrialActive}
        trialDaysLeft={trialDaysLeft}
      />
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="lg:col-span-2"
        >
          <UsageCharts 
            isLoading={isLoading}
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest API calls and record usage
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <RecentActivityList 
                activities={recentActivity}
                isLoading={isLoading} 
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          className="lg:col-span-2"
        >
          <EndpointUsageSection 
            endpointUsage={endpointUsage}
            isLoading={isLoading}
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <RecordUsageBreakdown 
            usageDistributionData={usageDistributionData}
            isLoading={isLoading}
          />
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.3 }}
      >
        <ApiAccessSection 
          isTrialActive={isTrialActive}
          isLoading={isLoading}
          isFreeUser={isFreeUser}
          trialDaysLeft={trialDaysLeft}
        />
      </motion.div>
    </>
  );
};
