
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
  isUpgradeFlow?: boolean; // Add flag to determine which flow we're in
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
  onSelectEnterprise,
  isUpgradeFlow = true // Default to true for upgrade flow
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
  
  // Set accent color based on flow
  const accentColor = isUpgradeFlow 
    ? "bg-gradient-to-r from-purple-600 to-indigo-600" 
    : "bg-gradient-to-r from-[#04c8c8] to-teal-500";
  
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
            isUpgradeFlow={isUpgradeFlow}
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
            isUpgradeFlow={isUpgradeFlow}
          />
        </CardContent>
        
        <CardFooter>
          <WizardActionButtons 
            currentStep={currentStep}
            totalSteps={steps.length}
            isLoading={isLoading}
            handleBack={handleBack}
            handleNext={handleNext}
            isUpgradeFlow={isUpgradeFlow}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
};
