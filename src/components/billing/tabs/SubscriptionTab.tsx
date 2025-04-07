
import { BillingPlans } from "@/components/billing/BillingPlans";
import { SubscriptionSummary } from "@/components/billing/SubscriptionSummary";
import { EnterpriseCompactCard } from "@/components/billing/EnterpriseCompactCard";
import { PlanData, AddOnData, SubscriptionData } from "@/types/billing";

interface SubscriptionTabProps {
  plans: PlanData[];
  addOns: AddOnData[];
  selectedPlan: string;
  activeAddOns: string[];
  overageHandling: string;
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  billingCycle: 'monthly' | 'annual';
  subscription?: SubscriptionData | null;
  isLoadingSubscription: boolean;
  onPlanChange: (planId: string) => void;
  onToggleAddOn: (addOnId: string) => void;
  onOverageHandlingChange: (value: string) => void;
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  onSaveBillingPreferences: () => void;
  handleSelectEnterprise: () => void;
  onStartUpgradeFlow?: () => void; // Keep this prop for future use if needed
}

export const SubscriptionTab = ({
  plans,
  addOns,
  selectedPlan,
  activeAddOns,
  overageHandling,
  costs,
  billingCycle,
  subscription,
  isLoadingSubscription,
  onPlanChange,
  onToggleAddOn,
  onOverageHandlingChange,
  onBillingCycleChange,
  onSaveBillingPreferences,
  handleSelectEnterprise,
  onStartUpgradeFlow
}: SubscriptionTabProps) => {
  // Filter out enterprise plan for regular plans list
  const regularPlans = plans.filter(p => p.id !== "enterprise");
  const enterprisePlan = plans.find(p => p.id === "enterprise");

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <BillingPlans 
          plans={regularPlans}
          addOns={addOns}
          selectedPlan={selectedPlan}
          activeAddOns={activeAddOns}
          overageHandling={overageHandling}
          onPlanChange={onPlanChange}
          onToggleAddOn={onToggleAddOn}
          onOverageHandlingChange={onOverageHandlingChange}
          onSaveBillingPreferences={onSaveBillingPreferences}
          billingCycle={billingCycle}
          onBillingCycleChange={onBillingCycleChange}
        />
      </div>
      
      <div className="md:col-span-1">
        <SubscriptionSummary 
          selectedPlan={selectedPlan}
          plans={plans}
          activeAddOns={activeAddOns}
          addOns={addOns}
          costs={costs}
          subscription={subscription}
          isLoading={isLoadingSubscription}
          onSubmit={onSaveBillingPreferences}
          billingCycle={billingCycle}
        />
        
        {enterprisePlan && selectedPlan !== enterprisePlan.id && (
          <EnterpriseCompactCard onSelectEnterprise={handleSelectEnterprise} />
        )}
      </div>
    </div>
  );
};
