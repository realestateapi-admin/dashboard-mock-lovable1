
import { RefObject } from "react";
import { PlanData, AddOnData } from "@/types/billing";
import { PlanSelectionStep } from "./steps/PlanSelectionStep";
import { AddOnsStep } from "./steps/AddOnsStep";
import { OverageHandlingStep } from "./steps/OverageHandlingStep";
import { PaymentInfoStep } from "./steps/PaymentInfoStep";
import { TermsOfServiceStep } from "./steps/TermsOfServiceStep";
import { SummaryStep } from "./steps/SummaryStep";

interface WizardStepContentProps {
  currentStep: number;
  contentRef: RefObject<HTMLDivElement>;
  plans: PlanData[];
  addOns: AddOnData[];
  selectedPlan: string;
  billingCycle: 'monthly' | 'annual';
  activeAddOns: string[];
  overageHandling: string;
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  enterprisePlan?: PlanData;
  onSelectEnterprise?: () => void;
  isLoading: boolean;
  termsAccepted: boolean;
  paymentMethod: 'card' | 'ach';
  formData: any;
  onPlanChange: (planId: string) => void;
  onToggleAddOn: (addOnId: string) => void;
  onOverageHandlingChange: (value: string) => void;
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  handleTermsAccepted: (accepted: boolean) => void;
  handlePaymentMethodChange: (method: 'card' | 'ach') => void;
  updateFormData: (field: string, value: any) => void;
}

export const WizardStepContent = ({
  currentStep,
  contentRef,
  plans,
  addOns,
  selectedPlan,
  billingCycle,
  activeAddOns,
  overageHandling,
  costs,
  enterprisePlan,
  onSelectEnterprise,
  isLoading,
  termsAccepted,
  paymentMethod,
  formData,
  onPlanChange,
  onToggleAddOn,
  onOverageHandlingChange,
  onBillingCycleChange,
  handleTermsAccepted,
  handlePaymentMethodChange,
  updateFormData
}: WizardStepContentProps) => {
  const selectedPlanName = plans.find(p => p.id === selectedPlan)?.name || 'Selected';
  const regularPlans = plans.filter(p => p.id !== "enterprise");

  return (
    <div className="pt-6 pb-2 mt-6" ref={contentRef}>
      {currentStep === 0 && (
        <PlanSelectionStep 
          selectedPlan={selectedPlan}
          billingCycle={billingCycle}
          regularPlans={regularPlans}
          enterprisePlan={enterprisePlan}
          onPlanChange={onPlanChange}
          onBillingCycleChange={onBillingCycleChange}
          onSelectEnterprise={onSelectEnterprise}
          isLoading={isLoading}
          updateFormData={updateFormData}
        />
      )}
      
      {currentStep === 1 && (
        <AddOnsStep 
          addOns={addOns}
          selectedPlan={selectedPlan}
          activeAddOns={activeAddOns}
          onToggleAddOn={onToggleAddOn}
          isLoading={isLoading}
          updateFormData={updateFormData}
        />
      )}
      
      {currentStep === 2 && (
        <OverageHandlingStep 
          selectedPlanName={selectedPlanName}
          overageHandling={overageHandling}
          onOverageHandlingChange={onOverageHandlingChange}
          isLoading={isLoading}
          updateFormData={updateFormData}
        />
      )}
      
      {currentStep === 3 && (
        <PaymentInfoStep 
          paymentMethod={paymentMethod}
          onPaymentMethodChange={handlePaymentMethodChange}
          formData={formData}
          updateFormData={updateFormData}
          isLoading={isLoading}
        />
      )}
      
      {currentStep === 4 && (
        <TermsOfServiceStep 
          termsAccepted={termsAccepted}
          onTermsAccepted={handleTermsAccepted}
          isLoading={isLoading}
          updateFormData={updateFormData}
        />
      )}
      
      {currentStep === 5 && (
        <SummaryStep 
          selectedPlan={selectedPlan}
          plans={plans}
          activeAddOns={activeAddOns}
          addOns={addOns}
          overageHandling={overageHandling}
          costs={costs}
          billingCycle={billingCycle}
          formData={formData}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
