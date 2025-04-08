
import { useEffect } from "react";
import { BillingCycleSelector } from "@/components/billing/BillingCycleSelector";
import { PlansList } from "@/components/billing/PlansList";
import { PlanData } from "@/types/billing";
import { PlanOptionSkeleton } from "./SkeletonLoading";

interface BillingOptionStepProps {
  billingCycle: 'monthly' | 'annual';
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  adjustedPlans: PlanData[];
  selectedPlan: string;
  onPlanChange: (planId: string) => void;
  enterprisePlan: PlanData | undefined;
  onSelectEnterprise: () => void;
  isLoading?: boolean;
}

export const BillingOptionStep = ({
  billingCycle,
  onBillingCycleChange,
  adjustedPlans,
  selectedPlan,
  onPlanChange,
  enterprisePlan,
  onSelectEnterprise,
  isLoading = false
}: BillingOptionStepProps) => {
  // Check localStorage for billing cycle on component mount
  useEffect(() => {
    const storedCycle = localStorage.getItem('billingCycle');
    if (storedCycle === 'annual' || storedCycle === 'monthly') {
      if (storedCycle !== billingCycle) {
        onBillingCycleChange(storedCycle as 'monthly' | 'annual');
      }
    }
  }, []);
  
  // Handle billing cycle change and update localStorage
  const handleBillingCycleChange = (cycle: 'monthly' | 'annual') => {
    onBillingCycleChange(cycle);
    localStorage.setItem('billingCycle', cycle);
  };
  
  if (isLoading) {
    return <PlanOptionSkeleton />;
  }
  
  return (
    <div className="space-y-8">
      <BillingCycleSelector 
        billingCycle={billingCycle}
        onBillingCycleChange={handleBillingCycleChange}
      />
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Select Your Plan</h3>
        <PlansList 
          plans={adjustedPlans} 
          selectedPlan={selectedPlan} 
          onPlanChange={onPlanChange}
          billingCycle={billingCycle}
        />
      </div>
    </div>
  );
};
