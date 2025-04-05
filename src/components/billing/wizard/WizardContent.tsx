
import { BillingOptionStep } from "./BillingOptionStep";
import { AddOnsList } from "@/components/billing/AddOnsList";
import { OverageHandling } from "@/components/billing/OverageHandling";
import { PaymentMethodForm } from "@/components/billing/PaymentMethodForm";
import { SubscriptionSummary } from "@/components/billing/SubscriptionSummary";
import { TermsOfServiceStep } from "@/components/billing/wizard/TermsOfServiceStep";
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
  creditCardInfo?: any;
  termsAccepted: boolean;
  setOverageHandling: (option: string) => void;
  toggleAddOn: (addOnId: string) => void;
  onSelectEnterprise: () => void;
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  onPlanChange: (planId: string) => void;
  onTermsAccepted: (accepted: boolean) => void;
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
  creditCardInfo,
  termsAccepted,
  setOverageHandling,
  toggleAddOn,
  onSelectEnterprise,
  onBillingCycleChange,
  onPlanChange,
  onTermsAccepted,
  onSubmit
}: WizardContentProps) {
  // Find the name of the selected plan for the OverageHandling component
  const selectedPlanName = plans.find(p => p.id === selectedPlan)?.name || 'Selected';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-8">
        {/* Step 1: Choose Billing Option */}
        {currentStep === 0 && (
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
            selectedPlanName={selectedPlanName}
            overageHandling={overageHandling || ''}
            onOverageHandlingChange={setOverageHandling}
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
        
        {/* Step 5: Terms of Service */}
        {currentStep === 4 && (
          <TermsOfServiceStep 
            isLoading={isLoading}
            termsAccepted={termsAccepted}
            onTermsAccepted={onTermsAccepted}
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
          onSubmit={onSubmit}
          billingCycle={billingCycle}
          showSubmitButton={false} // Always set to false to remove the button
        />
      </div>
    </div>
  );
}
