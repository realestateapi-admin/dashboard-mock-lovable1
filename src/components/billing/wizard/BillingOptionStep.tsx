
import { BillingCycleSelector } from "@/components/billing/BillingCycleSelector";
import { PlansList } from "@/components/billing/PlansList";
import { PlanData } from "@/types/billing";
import { EnterpriseCompactCard } from "@/components/billing/EnterpriseCompactCard";

interface BillingOptionStepProps {
  billingCycle: 'monthly' | 'annual';
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  adjustedPlans: PlanData[];
  selectedPlan: string;
  onPlanChange: (planId: string) => void;
  enterprisePlan: PlanData | undefined;
  onSelectEnterprise: () => void;
}

export const BillingOptionStep = ({
  billingCycle,
  onBillingCycleChange,
  adjustedPlans,
  selectedPlan,
  onPlanChange,
  enterprisePlan,
  onSelectEnterprise
}: BillingOptionStepProps) => {
  return (
    <div className="space-y-8">
      <BillingCycleSelector 
        billingCycle={billingCycle}
        onBillingCycleChange={onBillingCycleChange}
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
