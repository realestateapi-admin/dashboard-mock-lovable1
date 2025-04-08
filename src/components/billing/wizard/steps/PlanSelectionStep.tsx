
import { BillingCycleSelector } from "@/components/billing/BillingCycleSelector";
import { PlansList } from "@/components/billing/PlansList";
import { PlanData } from "@/types/billing";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

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
  isUpgradeFlow?: boolean; // Add the isUpgradeFlow property
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
  updateFormData,
  isUpgradeFlow = false // Default to false
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
  
  // Use different accent color based on the flow
  const accentColor = isUpgradeFlow ? "text-purple-700" : "text-[#04c8c8]";
  const buttonColor = isUpgradeFlow 
    ? "bg-purple-600 hover:bg-purple-700" 
    : "bg-[#04c8c8] hover:bg-teal-600";
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-xl font-semibold mb-1 ${accentColor}`}>Select Your Plan</h3>
        <p className="text-muted-foreground">
          Choose the plan that best fits your needs. You can change or cancel anytime.
        </p>
      </div>
      
      <BillingCycleSelector 
        billingCycle={billingCycle}
        onBillingCycleChange={handleBillingCycleChange}
      />
      
      <div className="mt-6">
        <PlansList 
          plans={regularPlans} 
          selectedPlan={selectedPlan} 
          onPlanChange={handlePlanChange}
          billingCycle={billingCycle}
        />
      </div>
      
      {enterprisePlan && (
        <Card className="mt-6 p-4 border border-purple-200 bg-purple-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-purple-800">Need Enterprise Features?</h3>
              <p className="text-sm text-purple-700">
                Contact our sales team for custom pricing and dedicated support.
              </p>
            </div>
            <button
              onClick={onSelectEnterprise}
              className={`px-4 py-2 text-white rounded-md transition-colors ${buttonColor}`}
            >
              Explore Enterprise Plan
            </button>
          </div>
        </Card>
      )}
    </div>
  );
};
