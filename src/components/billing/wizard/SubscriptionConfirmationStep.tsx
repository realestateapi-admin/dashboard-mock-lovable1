
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanData, AddOnData } from "@/types/billing";
import { Skeleton } from "@/components/ui/skeleton";
import { format, addMonths, differenceInMonths } from "date-fns";

// Import our new components
import { ConfirmationHeader } from "./confirmation/ConfirmationHeader";
import { EarlyTerminationWarning } from "./confirmation/EarlyTerminationWarning";
import { SubscriptionDetails } from "./confirmation/SubscriptionDetails";
import { CostSummary } from "./confirmation/CostSummary";
import { ServiceLevelAgreement } from "./confirmation/ServiceLevelAgreement";
import { NextStepsSection } from "./confirmation/NextStepsSection";

interface SubscriptionConfirmationStepProps {
  selectedPlan: string;
  plans: PlanData[];
  activeAddOns: string[];
  addOns: AddOnData[];
  overageHandling: string | null;
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  billingCycle: 'monthly' | 'annual';
  isLoading: boolean;
  paymentMethodType?: 'card' | 'ach';
}

export const SubscriptionConfirmationStep = ({
  selectedPlan,
  plans,
  activeAddOns,
  addOns,
  overageHandling,
  costs,
  billingCycle,
  isLoading,
  paymentMethodType = 'card' // Default to card
}: SubscriptionConfirmationStepProps) => {
  // Find the selected plan data from the plans array
  const selectedPlanData = useMemo(() => 
    plans.find(p => p.id === selectedPlan),
    [plans, selectedPlan]
  );
  
  // Calculate financial values with useMemo to prevent recalculations
  const financialInfo = useMemo(() => {
    const totalAmount = parseFloat(costs.total.replace(/[$,]/g, ''));
    const transactionFeeRate = 0.03; // 3%
    const transactionFee = paymentMethodType === 'card' ? totalAmount * transactionFeeRate : 0;
    const totalWithFee = totalAmount + transactionFee;
    
    const today = new Date();
    const nextMonth = addMonths(today, 1);
    const firstPaymentDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);
    
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const remainingDays = daysInMonth - today.getDate();
    const proratedAmount = (totalWithFee / daysInMonth) * remainingDays;
    
    return {
      totalAmount,
      transactionFee,
      totalWithFee,
      firstPaymentDate,
      remainingDays,
      proratedAmount
    };
  }, [costs.total, paymentMethodType]);
  
  // Format currency helper
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };
  
  // Calculate early termination fee for annual contracts
  const earlyTerminationInfo = useMemo(() => {
    if (billingCycle !== 'annual') return null;
    
    const contractStartDate = new Date(new Date().setMonth(new Date().getMonth() - 3));
    const contractEndDate = new Date(contractStartDate);
    contractEndDate.setFullYear(contractEndDate.getFullYear() + 1);
    
    const remainingMonths = Math.ceil(differenceInMonths(contractEndDate, new Date()));
    const totalMonthsInContract = 12;
    const monthsCompleted = totalMonthsInContract - remainingMonths;
    
    const monthlyAmount = parseFloat(costs.total.replace(/[$,]/g, ''));
    const remainingContractValue = monthlyAmount * remainingMonths;
    const earlyTerminationFee = remainingContractValue * 0.5;
    
    return {
      contractStartDate,
      contractEndDate,
      remainingMonths,
      monthsCompleted,
      earlyTerminationFee: formatCurrency(earlyTerminationFee),
      remainingContractValue: formatCurrency(remainingContractValue)
    };
  }, [billingCycle, costs.total]);
  
  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription Confirmation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Confirmation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Confirmation Header */}
        <ConfirmationHeader billingCycle={billingCycle} />
        
        {/* Early Termination Warning (Only for Annual Billing) */}
        {billingCycle === 'annual' && earlyTerminationInfo && (
          <EarlyTerminationWarning earlyTerminationInfo={earlyTerminationInfo} />
        )}
        
        <div className="space-y-4">
          {/* Subscription Details Section */}
          <SubscriptionDetails
            selectedPlanData={selectedPlanData}
            billingCycle={billingCycle}
            financialInfo={financialInfo}
            overageHandling={overageHandling}
            paymentMethodType={paymentMethodType}
            activeAddOns={activeAddOns}
            addOns={addOns}
          />
          
          {/* Cost Summary Section */}
          <CostSummary
            costs={costs}
            financialInfo={financialInfo}
            formatCurrency={formatCurrency}
            paymentMethodType={paymentMethodType}
            billingCycle={billingCycle}
          />
          
          {/* Service Level Agreement */}
          <ServiceLevelAgreement selectedPlanData={selectedPlanData} />
          
          {/* Next Steps */}
          <NextStepsSection />
        </div>
      </CardContent>
    </Card>
  );
};
