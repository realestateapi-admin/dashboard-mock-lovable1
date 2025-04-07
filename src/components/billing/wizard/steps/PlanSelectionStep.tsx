
import { BillingCycleSelector } from "@/components/billing/BillingCycleSelector";
import { PlansList } from "@/components/billing/PlansList";
import { PlanData } from "@/types/billing";
import { Skeleton } from "@/components/ui/skeleton";

interface PlanSelectionStepProps {
  selectedPlan: string;
  billingCycle: 'monthly' | 'annual';
  regularPlans: PlanData[];
  enterprisePlan?: PlanData;
  onPlanChange: (planId: string) => void;
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  onSelectEnterprise: () => void;
  isLoading: boolean;
}

export const PlanSelectionStep = ({
  selectedPlan,
  billingCycle,
  regularPlans,
  enterprisePlan,
  onPlanChange,
  onBillingCycleChange,
  onSelectEnterprise,
  isLoading
}: PlanSelectionStepProps) => {
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <BillingCycleSelector 
        billingCycle={billingCycle}
        onBillingCycleChange={onBillingCycleChange}
      />
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Select Your Plan</h3>
        <PlansList 
          plans={regularPlans} 
          selectedPlan={selectedPlan} 
          onPlanChange={onPlanChange}
          billingCycle={billingCycle}
        />
      </div>
      
      {enterprisePlan && (
        <div className="mt-6 p-4 border rounded-lg bg-slate-50">
          <h3 className="text-lg font-medium">Need an Enterprise Plan?</h3>
          <p className="text-sm text-muted-foreground my-2">
            For large organizations with complex needs, our Enterprise plan offers custom API quotas, 
            dedicated support, and SLA guarantees.
          </p>
          <button 
            onClick={onSelectEnterprise}
            className="text-purple-600 font-medium text-sm hover:underline mt-2"
          >
            Learn more about Enterprise plans
          </button>
        </div>
      )}
    </div>
  );
};
