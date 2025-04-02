
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
  subscriptionStartDate?: string;
  subscriptionRenewalDate?: string;
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
  isOnPaidPlan = false,
  subscriptionStartDate,
  subscriptionRenewalDate
}: DashboardSummaryProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Cards reordered as requested: Property Records, Monthly Usage, API Calls, Billing */}
      <PropertyRecordsCard 
        totalRecords={totalRecords} 
        recordsPercentage={recordsPercentage} 
      />
      
      <MonthlyUsageCard 
        monthlyApiCalls={monthlyApiCalls}
        monthlyRecords={monthlyRecords}
        monthlyRecordsPercentage={monthlyRecordsPercentage}
      />
      
      <ApiCallsCard 
        totalApiCalls={totalApiCalls} 
        increasePercentage={18.2} 
      />
      
      <BillingCard 
        isTrialActive={isTrialActive}
        trialDaysLeft={trialDaysLeft}
        isOnPaidPlan={isOnPaidPlan}
        subscriptionStartDate={subscriptionStartDate}
        subscriptionRenewalDate={subscriptionRenewalDate}
      />
    </div>
  );
};
