
import { PlansList } from "../PlansList";
import { PlanData } from "@/types/billing";

interface PlansSectionProps {
  plans: PlanData[];
  selectedPlan: string;
  onPlanChange: (planId: string) => void;
  billingCycle: 'monthly' | 'annual';
}

export const PlansSection = ({
  plans,
  selectedPlan,
  onPlanChange,
  billingCycle
}: PlansSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Select Your Plan</h3>
      <PlansList 
        plans={plans} 
        selectedPlan={selectedPlan} 
        onPlanChange={onPlanChange}
        billingCycle={billingCycle}
      />
    </div>
  );
};
