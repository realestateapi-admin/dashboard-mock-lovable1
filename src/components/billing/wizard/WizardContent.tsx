
import { BillingOptionStep } from "./BillingOptionStep";
import { AddOnsList } from "@/components/billing/AddOnsList";
import { OverageHandling } from "@/components/billing/OverageHandling";
import { PaymentMethodForm } from "@/components/billing/PaymentMethodForm";
import { SubscriptionSummary } from "@/components/billing/SubscriptionSummary";
import { PlanData, AddOnData } from "@/types/billing";

interface WizardContentProps {
  currentStep: number;
  billingCycle: 'monthly' | 'annual';
  isLoading: boolean;
  selectedPlan: string;
  overageHandling: string | null;
  activeAddOns: string[];
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  regularPlans: PlanData[];
  enterprisePlan: PlanData | undefined;
  addOns: AddOnData[];
  plans: PlanData[];
  creditCardInfo?: any; // Add credit card info
  setOverageHandling: (option: string) => void;
  toggleAddOn: (addOnId: string) => void;
  onSelectEnterprise: () => void;
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  onPlanChange: (planId: string) => void;
  onSubmit: () => void;
}

export function WizardContent({
  currentStep,
  billingCycle,
  isLoading,
  selectedPlan,
  overageHandling,
  activeAddOns,
  costs,
  regularPlans,
  enterprisePlan,
  addOns,
  plans,
  creditCardInfo, // Add credit card info
  setOverageHandling,
  toggleAddOn,
  onSelectEnterprise,
  onBillingCycleChange,
  onPlanChange,
  onSubmit
}: WizardContentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-8">
        {/* Step 1: Choose Billing Option */}
        {currentStep === 0 && (
          <BillingOptionStep 
            selectedPlan={selectedPlan}
            billingCycle={billingCycle}
            regularPlans={regularPlans}
            enterprisePlan={enterprisePlan}
            onPlanChange={onPlanChange}
            onBillingCycleChange={onBillingCycleChange}
            onSelectEnterprise={onSelectEnterprise}
            isLoading={isLoading}
          />
        )}
        
        {/* Step 2: Select Add-Ons */}
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
            selectedOption={overageHandling}
            onChange={setOverageHandling}
            isLoading={isLoading}
          />
        )}
        
        {/* Step 4: Payment Information */}
        {currentStep === 3 && (
          <PaymentMethodForm 
            isLoading={isLoading} 
            creditCardInfo={creditCardInfo}
          />
        )}
      </div>
      
      <div className="md:col-span-4">
        <SubscriptionSummary 
          selectedPlan={selectedPlan}
          plans={plans}
          activeAddOns={activeAddOns}
          addOns={addOns}
          costs={costs}
          subscription={null}
          isLoading={isLoading}
          onSubmit={currentStep === 3 ? onSubmit : undefined}
          billingCycle={billingCycle}
          showSubmitButton={currentStep === 3}
        />
      </div>
    </div>
  );
}
