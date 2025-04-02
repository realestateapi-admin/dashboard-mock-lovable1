
import { PlanData } from "@/types/billing";
import { PlanCard } from "./PlanCard";

interface PlansListProps {
  plans: PlanData[];
  selectedPlan: string;
  onPlanChange: (planId: string) => void;
  billingCycle?: 'monthly' | 'annual';
}

export const PlansList = ({ plans, selectedPlan, onPlanChange, billingCycle = 'monthly' }: PlansListProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          isSelected={selectedPlan === plan.id}
          onSelect={() => onPlanChange(plan.id)}
          billingCycle={billingCycle}
        />
      ))}
    </div>
  );
};
