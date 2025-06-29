
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleUsageClick = () => {
    navigate('/dashboard/usage?category=property');
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-6 min-w-max">
        {/* Cards reordered as requested: Property Records, Monthly Usage, API Calls, Billing */}
        <div className="w-72 flex-shrink-0">
          <PropertyRecordsCard 
            totalRecords={totalRecords} 
            recordsPercentage={recordsPercentage}
            onClick={handleUsageClick}
          />
        </div>
        
        <div className="w-72 flex-shrink-0">
          <MonthlyUsageCard 
            monthlyApiCalls={monthlyApiCalls}
            monthlyRecords={monthlyRecords}
            monthlyRecordsPercentage={monthlyRecordsPercentage}
            onClick={handleUsageClick}
          />
        </div>
        
        <div className="w-72 flex-shrink-0">
          <ApiCallsCard 
            totalApiCalls={totalApiCalls} 
            increasePercentage={18.2}
            onClick={handleUsageClick}
          />
        </div>
        
        <div className="w-72 flex-shrink-0">
          <BillingCard 
            isTrialActive={isTrialActive}
            trialDaysLeft={trialDaysLeft}
            isOnPaidPlan={isOnPaidPlan}
            subscriptionStartDate={subscriptionStartDate}
            subscriptionRenewalDate={subscriptionRenewalDate}
          />
        </div>
      </div>
    </div>
  );
};
