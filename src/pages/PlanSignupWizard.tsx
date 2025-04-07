
import { motion } from "framer-motion";
import { plans, addOns } from "@/data/billingData";
import { useWizardState } from "@/hooks/useWizardState";
import { SubscriptionWizard } from "@/components/billing/wizard/SubscriptionWizard";
import { useNavigate } from "react-router-dom";

const PlanSignupWizard = () => {
  const navigate = useNavigate();
  
  const {
    selectedPlan,
    overageHandling,
    setOverageHandling,
    activeAddOns,
    toggleAddOn,
    costs,
    billingCycle,
    enterprisePlan,
    handleBillingCycleChange,
    handlePlanChange,
    handleSubmit,
    handleSelectEnterprise,
    isLoading,
    isSubmitting,
  } = useWizardState();
  
  const handleFinish = () => {
    // Navigate back to the dashboard after completing the wizard
    navigate("/dashboard/billing");
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto my-8 px-4"
    >
      <SubscriptionWizard
        plans={plans}
        addOns={addOns}
        selectedPlan={selectedPlan}
        activeAddOns={activeAddOns}
        overageHandling={overageHandling}
        costs={costs}
        billingCycle={billingCycle}
        isLoadingSubscription={isLoading}
        onPlanChange={handlePlanChange}
        onToggleAddOn={toggleAddOn}
        onOverageHandlingChange={setOverageHandling}
        onBillingCycleChange={handleBillingCycleChange}
        onSaveBillingPreferences={handleSubmit}
        onFinish={handleFinish}
        enterprisePlan={enterprisePlan}
        onSelectEnterprise={handleSelectEnterprise}
      />
    </motion.div>
  );
};

export default PlanSignupWizard;
