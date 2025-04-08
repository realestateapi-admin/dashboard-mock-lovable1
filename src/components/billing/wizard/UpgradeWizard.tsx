
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { WizardStepIndicator } from "./WizardStepIndicator";
import { WizardStepContent } from "./WizardStepContent";
import { WizardActionButtons } from "./WizardActionButtons";
import { useUpgradeWizardState } from "@/hooks/useUpgradeWizardState";
import { getWizardSteps } from "./WizardStepsConfig";
import { PlanData, AddOnData } from "@/types/billing";

interface UpgradeWizardProps {
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
  onPlanChange: (planId: string) => void;
  onToggleAddOn: (addOnId: string) => void;
  onOverageHandlingChange: (value: string) => void;
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  onSaveBillingPreferences: () => void;
  onFinish: () => void;
  enterprisePlan?: PlanData;
  onSelectEnterprise?: () => void;
}

export const UpgradeWizard = ({
  plans,
  addOns,
  selectedPlan,
  billingCycle,
  activeAddOns,
  overageHandling,
  costs,
  onPlanChange,
  onToggleAddOn,
  onOverageHandlingChange,
  onBillingCycleChange,
  onSaveBillingPreferences,
  onFinish,
  enterprisePlan,
  onSelectEnterprise
}: UpgradeWizardProps) => {
  const steps = getWizardSteps();
  
  const {
    currentStep,
    isLoading,
    termsAccepted,
    paymentMethod,
    formData,
    contentRef,
    handleNext,
    handleBack,
    handleTermsAccepted,
    handlePaymentMethodChange,
    updateFormData
  } = useUpgradeWizardState({
    selectedPlan,
    billingCycle,
    activeAddOns,
    overageHandling,
    onSaveBillingPreferences,
    onFinish
  });
  
  const accentColor = "bg-gradient-to-r from-purple-600 to-indigo-600";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="border shadow-lg overflow-hidden">
        <div className={`${accentColor} h-2 w-full`}></div>
        
        <CardHeader className="pb-0">
          <WizardStepIndicator 
            steps={steps} 
            currentStep={currentStep} 
          />
        </CardHeader>
        
        <CardContent>
          <WizardStepContent 
            currentStep={currentStep}
            contentRef={contentRef}
            plans={plans}
            addOns={addOns}
            selectedPlan={selectedPlan}
            billingCycle={billingCycle}
            activeAddOns={activeAddOns}
            overageHandling={overageHandling}
            costs={costs}
            enterprisePlan={enterprisePlan}
            onSelectEnterprise={onSelectEnterprise}
            isLoading={isLoading}
            termsAccepted={termsAccepted}
            paymentMethod={paymentMethod}
            formData={formData}
            onPlanChange={onPlanChange}
            onToggleAddOn={onToggleAddOn}
            onOverageHandlingChange={onOverageHandlingChange}
            onBillingCycleChange={onBillingCycleChange}
            handleTermsAccepted={handleTermsAccepted}
            handlePaymentMethodChange={handlePaymentMethodChange}
            updateFormData={updateFormData}
          />
        </CardContent>
        
        <CardFooter>
          <WizardActionButtons 
            currentStep={currentStep}
            totalSteps={steps.length}
            isLoading={isLoading}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
};
