
import { SubscriptionSummary } from "@/components/billing/SubscriptionSummary";
import { EnterpriseCompactCard } from "@/components/billing/EnterpriseCompactCard";
import { PlanData, AddOnData } from "@/types/billing";
import { SummarySkeleton } from "./SkeletonLoading";

interface WizardSidebarProps {
  currentStep: number;
  selectedPlan: string;
  plans: PlanData[];
  activeAddOns: string[];
  addOns: AddOnData[];
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  billingCycle: 'monthly' | 'annual';
  enterprisePlan: PlanData | undefined;
  onSelectEnterprise: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export const WizardSidebar = ({
  currentStep,
  selectedPlan,
  plans,
  activeAddOns,
  addOns,
  costs,
  billingCycle,
  enterprisePlan,
  onSelectEnterprise,
  onSubmit,
  isLoading = false
}: WizardSidebarProps) => {
  
  if (isLoading) {
    return <SummarySkeleton />;
  }
  
  return (
    <div className="space-y-4">
      <SubscriptionSummary
        selectedPlan={selectedPlan}
        plans={plans}
        activeAddOns={activeAddOns}
        addOns={addOns}
        costs={costs}
        subscription={null}
        isLoading={false}
        onSubmit={onSubmit}
        billingCycle={billingCycle}
      />
      
      {/* Show the Enterprise compact card only on step 1 and when enterprise is not selected */}
      {currentStep === 0 && enterprisePlan && selectedPlan !== enterprisePlan.id && (
        <EnterpriseCompactCard onSelectEnterprise={onSelectEnterprise} />
      )}
    </div>
  );
};
