
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

// Import wizard components
import { WizardHeader } from "@/components/billing/wizard/WizardHeader";
import { WizardFooter } from "@/components/billing/wizard/WizardFooter";
import { WizardContent } from "@/components/billing/wizard/WizardContent";

// Import the refactored useWizardState hook
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
        <Card className="border shadow-lg">
          <CardHeader>
            <WizardHeader 
              currentStep={currentStep} 
              steps={steps} 
            />
          </CardHeader>
          
          <CardContent className="py-6">
            <WizardContent
              currentStep={currentStep}
              billingCycle={billingCycle}
              selectedPlan={selectedPlan}
              overageHandling={overageHandling}
              activeAddOns={activeAddOns}
              costs={costs}
              regularPlans={regularPlans}
              enterprisePlan={enterprisePlan}
              addOns={addOns}
              plans={plans}
              isLoading={isLoading}
              onPlanChange={handlePlanChange}
              onToggleAddOn={toggleAddOn}
              onOverageHandlingChange={setOverageHandling}
              onBillingCycleChange={handleBillingCycleChange}
              onSelectEnterprise={handleSelectEnterprise}
              selectedPlanName={plans.find(p => p.id === selectedPlan)?.name || "Selected"}
            />
          </CardContent>
          
          <CardFooter>
            <WizardFooter
              currentStep={currentStep}
              totalSteps={steps.length}
              handleBack={handleBack}
              handleNext={handleNext}
              handleSubmit={handleSubmit}
              isLoading={currentStep === steps.length - 1 ? isSubmitting : isLoading}
            />
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default PlanSignupWizard;
