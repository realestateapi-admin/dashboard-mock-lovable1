
import { BillingOptionStep } from "@/components/billing/wizard/BillingOptionStep";
import { AddOnsList } from "@/components/billing/AddOnsList";
import { OverageHandling } from "@/components/billing/OverageHandling";
import { PaymentMethodForm } from "@/components/billing/PaymentMethodForm";
import { WizardSidebar } from "@/components/billing/wizard/WizardSidebar";
import { PlanData, AddOnData } from "@/types/billing";
import { annualPlanPrices } from "@/data/billingData";

interface WizardContentProps {
  currentStep: number;
  billingCycle: 'monthly' | 'annual';
  isLoading: boolean;
  selectedPlan: string;
  overageHandling: string;
  setOverageHandling: (value: string) => void;
  activeAddOns: string[];
  toggleAddOn: (addOnId: string) => void;
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  regularPlans: PlanData[];
  enterprisePlan: PlanData | undefined;
  addOns: AddOnData[];
  plans: PlanData[];
  onSelectEnterprise: () => void;
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  onPlanChange: (planId: string) => void;
  onSubmit: () => void;
}

export const WizardContent = ({
  currentStep,
  billingCycle,
  isLoading,
  selectedPlan,
  overageHandling,
  setOverageHandling,
  activeAddOns,
  toggleAddOn,
  costs,
  regularPlans,
  enterprisePlan,
  addOns,
  plans,
  onSelectEnterprise,
  onBillingCycleChange,
  onPlanChange,
  onSubmit
}: WizardContentProps) => {
  
  // Apply annual pricing to plans when annual billing is selected
  const adjustedPlans = regularPlans.map(plan => {
    if (billingCycle === 'annual' && plan.price !== 'Custom' && annualPlanPrices[plan.id as keyof typeof annualPlanPrices]) {
      return {
        ...plan,
        price: annualPlanPrices[plan.id as keyof typeof annualPlanPrices],
        originalPrice: plan.price
      };
    }
    return plan;
  });
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left side - Current step content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Step 1: Choose Billing Option */}
        {currentStep === 0 && (
          <BillingOptionStep
            billingCycle={billingCycle}
            onBillingCycleChange={onBillingCycleChange}
            adjustedPlans={adjustedPlans}
            selectedPlan={selectedPlan}
            onPlanChange={onPlanChange}
            enterprisePlan={enterprisePlan}
            onSelectEnterprise={onSelectEnterprise}
            isLoading={isLoading}
          />
        )}
        
        {/* Step 2: Add-Ons */}
        {currentStep === 1 && (
          <AddOnsList
            addOns={addOns}
            selectedPlan={selectedPlan}
            activeAddOns={activeAddOns}
            onToggleAddOn={toggleAddOn}
            isLoading={isLoading}
          />
        )}
        
        {/* Step 3: Overage Handling */}
        {currentStep === 2 && (
          <OverageHandling 
            selectedPlanName={plans.find(p => p.id === selectedPlan)?.name || "selected plan"}
            overageHandling={overageHandling}
            onOverageHandlingChange={setOverageHandling}
            isLoading={isLoading}
          />
        )}
        
        {/* Step 4: Payment */}
        {currentStep === 3 && (
          <PaymentMethodForm isLoading={isLoading} />
        )}
      </div>
      
      {/* Right side - Subscription Summary and Enterprise Card */}
      <div>
        <WizardSidebar 
          currentStep={currentStep}
          selectedPlan={selectedPlan}
          plans={plans}
          activeAddOns={activeAddOns}
          addOns={addOns}
          costs={costs}
          billingCycle={billingCycle}
          enterprisePlan={enterprisePlan}
          onSelectEnterprise={onSelectEnterprise}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
