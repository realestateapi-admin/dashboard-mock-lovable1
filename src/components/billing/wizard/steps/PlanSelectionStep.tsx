
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
  onSelectEnterprise?: () => void;
  isLoading: boolean;
  updateFormData: (field: string, value: any) => void;
}

export const PlanSelectionStep = ({
  selectedPlan,
  billingCycle,
  regularPlans,
  enterprisePlan,
  onPlanChange,
  onBillingCycleChange,
  onSelectEnterprise,
  isLoading,
  updateFormData
}: PlanSelectionStepProps) => {
  
  const handlePlanChange = (planId: string) => {
    onPlanChange(planId);
    updateFormData('plan', planId);
  };
  
  const handleBillingCycleChange = (cycle: 'monthly' | 'annual') => {
    onBillingCycleChange(cycle);
    updateFormData('billingCycle', cycle);
  };
  
  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-12 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/4" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
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
          plans={regularPlans} 
          selectedPlan={selectedPlan} 
          onPlanChange={handlePlanChange}
          billingCycle={billingCycle}
        />
      </div>
      
      {enterprisePlan && (
        <div className="mt-8 p-4 border border-purple-200 rounded-lg bg-purple-50">
          <h3 className="text-lg font-medium text-purple-800">Need Enterprise Features?</h3>
          <p className="text-sm text-purple-700 mb-4">
            Contact our sales team for custom pricing and dedicated support.
          </p>
          <button
            onClick={onSelectEnterprise}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Explore Enterprise Plan
          </button>
        </div>
      )}
    </div>
  );
};
