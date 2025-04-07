
import { BillingOptionStep } from "./BillingOptionStep";
import { AddOnsList } from "@/components/billing/AddOnsList";
import { OverageHandling } from "@/components/billing/OverageHandling";
import { ReviewStep } from "./ReviewStep";
import { PlanData, AddOnData } from "@/types/billing";

interface WizardContentProps {
  currentStep: number;
  selectedPlan: string;
  billingCycle: 'monthly' | 'annual';
  activeAddOns: string[];
  overageHandling: string;
  plans: PlanData[];
  regularPlans: PlanData[];
  enterprisePlan: PlanData | undefined;
  addOns: AddOnData[];
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  selectedPlanName: string;
  isLoading: boolean;
  onPlanChange: (planId: string) => void;
  onToggleAddOn: (addOnId: string) => void;
  onOverageHandlingChange: (value: string) => void;
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  onSelectEnterprise: () => void;
}

export const WizardContent = ({
  currentStep,
  selectedPlan,
  billingCycle,
  activeAddOns,
  overageHandling,
  plans,
  regularPlans,
  enterprisePlan,
  addOns,
  costs,
  selectedPlanName,
  isLoading,
  onPlanChange,
  onToggleAddOn,
  onOverageHandlingChange,
  onBillingCycleChange,
  onSelectEnterprise
}: WizardContentProps) => {
  // Step 1: Choose Plan
  if (currentStep === 0) {
    return (
      <BillingOptionStep 
        selectedPlan={selectedPlan}
        billingCycle={billingCycle}
        adjustedPlans={regularPlans}
        enterprisePlan={enterprisePlan}
        onPlanChange={onPlanChange}
        onBillingCycleChange={onBillingCycleChange}
        onSelectEnterprise={onSelectEnterprise}
        isLoading={isLoading}
      />
    );
  }
  
  // Step 2: Select Add-Ons
  if (currentStep === 1) {
    return (
      <AddOnsList 
        addOns={addOns}
        selectedPlan={selectedPlan}
        activeAddOns={activeAddOns}
        onToggleAddOn={onToggleAddOn}
        isLoading={isLoading}
      />
    );
  }
  
  // Step 3: Overage Handling
  if (currentStep === 2) {
    return (
      <OverageHandling 
        selectedPlanName={selectedPlanName}
        overageHandling={overageHandling}
        onOverageHandlingChange={onOverageHandlingChange}
        isLoading={isLoading}
      />
    );
  }
  
  // Step 4: Review & Confirm
  return (
    <ReviewStep 
      selectedPlan={selectedPlan}
      plans={plans}
      activeAddOns={activeAddOns}
      addOns={addOns}
      overageHandling={overageHandling}
      costs={costs}
      billingCycle={billingCycle}
      isLoading={isLoading}
    />
  );
};
