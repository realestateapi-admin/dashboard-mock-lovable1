
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

// Import the UpgradeWizard component that includes all steps
import { UpgradeWizard } from "@/components/billing/wizard/UpgradeWizard";
import { useWizardState } from "@/hooks/useWizardState";
import { plans, addOns } from "@/data/billingData";
import OnboardingSteps from "@/components/onboarding/OnboardingSteps";
import { WizardSidebar } from "@/components/billing/wizard/WizardSidebar";

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
  
  // Map steps to the format expected by OnboardingSteps
  const onboardingSteps = steps.map((step, index) => ({
    name: step.title,
    status: index === currentStep ? "current" : index < currentStep ? "completed" : "upcoming"
  }));
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            {/* Main wizard content */}
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
              isUpgradeFlow={false} // Explicitly set to false for signup flow
            />
          </div>
          
          <div className="md:col-span-4">
            {/* Subscription summary sidebar */}
            <WizardSidebar
              currentStep={currentStep}
              selectedPlan={selectedPlan}
              plans={plans}
              activeAddOns={activeAddOns}
              addOns={addOns}
              costs={costs}
              billingCycle={billingCycle}
              enterprisePlan={enterprisePlan}
              onSelectEnterprise={handleSelectEnterprise}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlanSignupWizard;
