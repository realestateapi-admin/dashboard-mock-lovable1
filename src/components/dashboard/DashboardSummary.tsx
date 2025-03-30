
import React from 'react';
import { ApiCallsCard } from "@/components/dashboard/summary/ApiCallsCard";
import { PropertyRecordsCard } from "@/components/dashboard/summary/PropertyRecordsCard";
import { MonthlyUsageCard } from "@/components/dashboard/summary/MonthlyUsageCard";
import { BillingCard } from "@/components/dashboard/summary/BillingCard";

interface DashboardSummaryProps {
  totalApiCalls: number;
  totalRecords: number;
  recordsPercentage: number;
  monthlyApiCalls: number;
  monthlyRecords: number;
  monthlyRecordsPercentage: number;
  isTrialActive: boolean;
  trialDaysLeft: number;
  isOnPaidPlan?: boolean;
}

export const DashboardSummary = ({
  totalApiCalls,
  totalRecords,
  recordsPercentage,
  monthlyApiCalls,
  monthlyRecords,
  monthlyRecordsPercentage,
  isTrialActive,
  trialDaysLeft,
  isOnPaidPlan = false
}: DashboardSummaryProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <PropertyRecordsCard 
        totalRecords={totalRecords} 
        recordsPercentage={recordsPercentage} 
      />
      
      <ApiCallsCard 
        totalApiCalls={totalApiCalls} 
        increasePercentage={18.2} 
      />
      
      <MonthlyUsageCard 
        monthlyApiCalls={monthlyApiCalls}
        monthlyRecords={monthlyRecords}
        monthlyRecordsPercentage={monthlyRecordsPercentage}
      />
      
      <BillingCard 
        isTrialActive={isTrialActive}
        trialDaysLeft={trialDaysLeft}
        isOnPaidPlan={isOnPaidPlan}
      />
    </div>
  );
};
