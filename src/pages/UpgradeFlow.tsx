
import { useEffect } from "react";
import { motion } from "framer-motion";
import { plans, addOns } from "@/data/billingData";
import { useUpgradeFlowState } from "@/hooks/useUpgradeFlowState";
import { UpgradeWizardProgress } from "@/components/billing/upgrade/UpgradeWizardProgress";
import { UpgradeFlowLoading } from "@/components/billing/upgrade/UpgradeFlowLoading";
import { UpgradeStepContent } from "@/components/billing/upgrade/UpgradeStepContent";

const UpgradeFlow = () => {
  const {
    currentStep,
    isLoadingSubscription,
    currentPlan,
    activeAddOnsData,
    overageHandling,
    billingCycle,
    termsAccepted,
    getStepIndex,
    goToStep,
    goBack,
    handleTermsAccepted,
    handleFinalizePlan,
    handleBillingCycleChange,
    handleSubmitChanges,
    setSelectedPlan,
    setOverageHandling,
    toggleAddOn,
    activeAddOns,
    costs,
    selectedPlan
  } = useUpgradeFlowState();

  // Show loading state while fetching subscription data
  if (isLoadingSubscription) {
    return <UpgradeFlowLoading />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container max-w-4xl mx-auto"
    >
      {/* Progress Bar - Only show if not on the first step and not on the confirmation step */}
      {currentStep !== 'manage' && currentStep !== 'confirmation' && (
        <UpgradeWizardProgress currentStepIndex={getStepIndex()} />
      )}

      {/* Step Content */}
      <UpgradeStepContent 
        currentStep={currentStep}
        currentPlan={currentPlan}
        activeAddOnsData={activeAddOnsData}
        overageHandling={overageHandling}
        billingCycle={billingCycle}
        plans={plans}
        addOns={addOns}
        termsAccepted={termsAccepted}
        selectedPlan={selectedPlan}
        activeAddOns={activeAddOns}
        costs={costs}
        
        // Handlers for the different steps
        onChangePlan={() => goToStep('plan')}
        onChangeAddOns={() => goToStep('addons')}
        onChangeOverage={() => goToStep('overage')}
        onFinalizePlan={handleFinalizePlan}
        onBack={goBack}
        onComplete={() => goToStep('manage')}
        onBillingCycleChange={handleBillingCycleChange}
        onSelectPlan={setSelectedPlan}
        onTermsAccepted={handleTermsAccepted}
        onSubmitChanges={handleSubmitChanges}
        onToggleAddOn={toggleAddOn}
        onOverageChange={setOverageHandling}
      />
    </motion.div>
  );
};

export default UpgradeFlow;
