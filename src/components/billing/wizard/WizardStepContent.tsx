
import React from "react";
import { PlanSelectionStep } from "./steps/PlanSelectionStep";
import { AddOnsStep } from "./steps/AddOnsStep";
import { OverageHandlingStep } from "./steps/OverageHandlingStep";
import { PaymentInfoStep } from "./steps/PaymentInfoStep";
import { TermsOfServiceStep } from "./steps/TermsOfServiceStep";
import { SummaryStep } from "./steps/SummaryStep";
import { PlanData, AddOnData } from "@/types/billing";

interface WizardStepContentProps {
  currentStep: number;
  contentRef: React.RefObject<HTMLDivElement>;
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
  isUpgradeFlow?: boolean;
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
  updateFormData,
  isUpgradeFlow = false
}: WizardStepContentProps) => {
  // Filter out enterprise plan for display in plan selection
  const regularPlans = plans.filter(p => p.id !== "enterprise");
  
  return (
    <div ref={contentRef} className="min-h-[400px]">
      {currentStep === 0 && (
        <PlanSelectionStep 
          selectedPlan={selectedPlan}
          billingCycle={billingCycle}
          plans={regularPlans}
          enterprisePlan={enterprisePlan}
          onPlanChange={onPlanChange}
          onBillingCycleChange={onBillingCycleChange}
          onSelectEnterprise={onSelectEnterprise}
          isLoading={isLoading}
          isUpgradeFlow={isUpgradeFlow}
        />
      )}
      
      {currentStep === 1 && (
        <AddOnsStep 
          addOns={addOns}
          activeAddOns={activeAddOns}
          onToggleAddOn={onToggleAddOn}
          isLoading={isLoading}
          isUpgradeFlow={isUpgradeFlow}
        />
      )}
      
      {currentStep === 2 && (
        <OverageHandlingStep 
          selectedPlan={selectedPlan}
          plans={plans}
          overageHandling={overageHandling}
          onOverageHandlingChange={onOverageHandlingChange}
          isLoading={isLoading}
          isUpgradeFlow={isUpgradeFlow}
        />
      )}
      
      {currentStep === 3 && (
        <PaymentInfoStep 
          paymentMethod={paymentMethod}
          onPaymentMethodChange={handlePaymentMethodChange}
          formData={formData}
          updateFormData={updateFormData}
          isLoading={isLoading}
          isUpgradeFlow={isUpgradeFlow}
        />
      )}
      
      {currentStep === 4 && (
        <TermsOfServiceStep 
          termsAccepted={termsAccepted}
          handleTermsAccepted={handleTermsAccepted}
          isLoading={isLoading}
          isUpgradeFlow={isUpgradeFlow}
        />
      )}
      
      {currentStep === 5 && (
        <SummaryStep 
          selectedPlan={selectedPlan}
          billingCycle={billingCycle}
          plans={plans}
          activeAddOns={activeAddOns}
          addOns={addOns}
          overageHandling={overageHandling}
          costs={costs}
          isLoading={isLoading}
          isUpgradeFlow={isUpgradeFlow}
        />
      )}
    </div>
  );
};
