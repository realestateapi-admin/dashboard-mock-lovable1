
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

// Import the UpgradeWizard component that includes all steps
import { UpgradeWizard } from "@/components/billing/wizard/UpgradeWizard";
import { useWizardState } from "@/hooks/useWizardState";
import { plans, addOns } from "@/data/billingData";

const PlanSignupWizard = () => {
  const {
    currentStep,
    billingCycle,
    isLoading,
    isSubmitting,
    selectedPlan,
    overageHandling,
    setOverageHandling,
    activeAddOns,
    toggleAddOn,
    costs,
    steps,
    enterprisePlan,
    regularPlans,
    creditCardInfo,
    termsAccepted,
    handleTermsAccepted,
    handleSelectEnterprise,
    handleNext,
    handleBack,
    handleBillingCycleChange,
    handlePlanChange,
    handleSubmit
  } = useWizardState();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl"
      >
        <UpgradeWizard
          plans={plans}
          addOns={addOns}
          selectedPlan={selectedPlan}
          billingCycle={billingCycle}
          activeAddOns={activeAddOns}
          overageHandling={overageHandling}
          costs={costs}
          onPlanChange={handlePlanChange}
          onToggleAddOn={toggleAddOn}
          onOverageHandlingChange={setOverageHandling}
          onBillingCycleChange={handleBillingCycleChange}
          onSaveBillingPreferences={handleSubmit}
          onFinish={() => {}}
          enterprisePlan={enterprisePlan}
          onSelectEnterprise={handleSelectEnterprise}
        />
      </motion.div>
    </div>
  );
};

export default PlanSignupWizard;
