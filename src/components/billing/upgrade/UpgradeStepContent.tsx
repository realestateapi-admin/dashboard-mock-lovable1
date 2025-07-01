import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UpgradeStep } from "@/hooks/useUpgradeFlowState";
import { PlanData, AddOnData } from "@/types/billing";

// Import step components
import { ManageSubscriptionStep } from "./ManageSubscriptionStep";
import { ChangePlanStep } from "./ChangePlanStep";
import { ModifyAddOnsStep } from "./ModifyAddOnsStep";
import { UpdateOverageStep } from "./UpdateOverageStep";
import { TermsOfServiceStep } from "../wizard/TermsOfServiceStep";
import { SubscriptionConfirmationStep } from "../wizard/SubscriptionConfirmationStep";

interface UpgradeStepContentProps {
  currentStep: UpgradeStep;
  currentPlan: PlanData;
  activeAddOnsData: AddOnData[];
  overageHandling: string;
  billingCycle: 'monthly' | 'annual';
  plans: PlanData[];
  addOns: AddOnData[];
  termsAccepted: boolean;
  selectedPlan: string;
  activeAddOns: string[];
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  
  // Handlers
  onChangePlan: () => void;
  onChangeAddOns: () => void;
  onChangeOverage: () => void;
  onFinalizePlan: () => void;
  onBack: () => void;
  onComplete: () => void;
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  onSelectPlan: (planId: string) => void;
  onTermsAccepted: (accepted: boolean) => void;
  onSubmitChanges: () => void;
  onToggleAddOn: (addOnId: string) => void;
  onOverageChange: (value: string) => void;
}

const UpgradeConfirmationWrapper: React.FC<{
  selectedPlan: string;
  plans: PlanData[];
  activeAddOns: string[];
  addOns: AddOnData[];
  overageHandling: string;
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  billingCycle: 'monthly' | 'annual';
}> = ({
  selectedPlan,
  plans,
  activeAddOns,
  addOns,
  overageHandling,
  costs,
  billingCycle
}) => {
  const navigate = useNavigate();

  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="space-y-8">
      <SubscriptionConfirmationStep
        selectedPlan={selectedPlan}
        plans={plans}
        activeAddOns={activeAddOns}
        addOns={addOns}
        overageHandling={overageHandling}
        costs={costs}
        billingCycle={billingCycle}
        isLoading={false}
        paymentMethodType="card"
        showDashboardButton={false}
      />
      
      <div className="text-center pt-6">
        <Button 
          onClick={handleReturnToDashboard}
          size="lg"
          className="px-8"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export const UpgradeStepContent: React.FC<UpgradeStepContentProps> = ({
  currentStep,
  currentPlan,
  activeAddOnsData,
  overageHandling,
  billingCycle,
  plans,
  addOns,
  termsAccepted,
  selectedPlan,
  activeAddOns,
  costs,
  
  // Handlers
  onChangePlan,
  onChangeAddOns,
  onChangeOverage,
  onFinalizePlan,
  onBack,
  onComplete,
  onBillingCycleChange,
  onSelectPlan,
  onTermsAccepted,
  onSubmitChanges,
  onToggleAddOn,
  onOverageChange
}) => {
  switch (currentStep) {
    case 'manage':
      return (
        <ManageSubscriptionStep 
          currentPlan={currentPlan}
          activeAddOns={activeAddOnsData}
          overageHandling={overageHandling}
          billingCycle={billingCycle}
          onChangePlan={onChangePlan}
          onChangeAddOns={onChangeAddOns}
          onChangeOverage={onChangeOverage}
          onFinalizePlan={onFinalizePlan}
        />
      );
      
    case 'plan':
      return (
        <ChangePlanStep
          plans={plans}
          currentPlan={currentPlan}
          billingCycle={billingCycle}
          onBillingCycleChange={onBillingCycleChange}
          onSelectPlan={onSelectPlan}
          onBack={onBack}
          onComplete={onComplete}
        />
      );
      
    case 'addons':
      return (
        <ModifyAddOnsStep
          addOns={addOns}
          selectedPlan={selectedPlan}
          activeAddOns={activeAddOns}
          onToggleAddOn={onToggleAddOn}
          onBack={onBack}
          onComplete={onComplete}
        />
      );
      
    case 'overage':
      return (
        <UpdateOverageStep
          overageHandling={overageHandling}
          onOverageChange={onOverageChange}
          onBack={onBack}
          onComplete={onComplete}
          selectedPlan={selectedPlan}
        />
      );

    case 'terms':
      return (
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
              <p className="text-muted-foreground mt-2">
                Please review and accept our terms of service to finalize your plan changes
              </p>
            </div>
          </div>
          
          <TermsOfServiceStep
            isLoading={false}
            termsAccepted={termsAccepted}
            onTermsAccepted={onTermsAccepted}
          />
          
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={onBack}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={onSubmitChanges}
              disabled={!termsAccepted}
              className={`px-4 py-2 rounded-md bg-primary text-white ${!termsAccepted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`}
            >
              Continue
            </button>
          </div>
        </div>
      );
      
    case 'confirmation':
      return (
        <UpgradeConfirmationWrapper
          selectedPlan={selectedPlan}
          plans={plans}
          activeAddOns={activeAddOns}
          addOns={addOns}
          overageHandling={overageHandling}
          costs={costs}
          billingCycle={billingCycle}
        />
      );
      
    default:
      return null;
  }
};
