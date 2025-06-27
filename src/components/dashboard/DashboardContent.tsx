
import React, { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDashboard } from "@/contexts/DashboardContext";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSummary } from "@/components/dashboard/DashboardSummary";
import { UpdatesSection } from "@/components/dashboard/UpdatesSection";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { useSubscriptionData } from "@/hooks/useSubscriptionData";
import { calculateRenewalDate } from "@/services/subscriptionService";

interface DashboardContentProps {
  trialBanner?: ReactNode; // Made the prop optional by adding '?'
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

  const { isTrialActive, trialDaysLeft, isFreeUser, isOnPaidPlan } = useTrialAlert();
  
  // Fetch subscription data
  const { subscription, renewalDate } = useSubscriptionData();

  return (
    <>
      <DashboardHeader 
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
      
      {/* Only render the passed trialBanner if it exists */}
      {trialBanner}
      
      <div className="mb-8">
        <DashboardSummary 
          totalApiCalls={totalApiCalls}
          totalRecords={totalRecords}
          recordsPercentage={recordsPercentage}
          monthlyApiCalls={monthlyApiCalls}
          monthlyRecords={monthlyRecords}
          monthlyRecordsPercentage={monthlyRecordsPercentage}
          isTrialActive={isTrialActive}
          trialDaysLeft={trialDaysLeft}
          isOnPaidPlan={isOnPaidPlan}
          subscriptionStartDate={subscription?.subscription_start_date}
          subscriptionRenewalDate={renewalDate || undefined}
        />
      </div>
      
      {/* Updates section now takes full width and is the only content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <UpdatesSection 
          isLoading={isLoading}
        />
      </motion.div>
      
      {/* Removed the Endpoint Usage and Record Usage Breakdown grid section */}
      
      {/* Removed the API Access section */}
    </>
  );
};
