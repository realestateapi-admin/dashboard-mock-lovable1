
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import WizardProgress from "@/components/onboarding/wizard/WizardProgress";

// Import hooks and services
import { useSubscriptionData } from "@/hooks/useSubscriptionData";
import { useSubscriptionCalculator } from "@/hooks/useSubscriptionCalculator";

// Import data
import { plans, addOns } from "@/data/billingData";

// Import components
import { ManageSubscriptionStep } from "@/components/billing/upgrade/ManageSubscriptionStep";
import { ChangePlanStep } from "@/components/billing/upgrade/ChangePlanStep";
import { ModifyAddOnsStep } from "@/components/billing/upgrade/ModifyAddOnsStep";
import { UpdateOverageStep } from "@/components/billing/upgrade/UpdateOverageStep";

// Wizard step type
type UpgradeStep = 'manage' | 'plan' | 'addons' | 'overage';

const UpgradeFlow = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Wizard state
  const [currentStep, setCurrentStep] = useState<UpgradeStep>('manage');
  const [previousStep, setPreviousStep] = useState<UpgradeStep | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  // Fetch subscription data
  const {
    subscription,
    isLoading: isLoadingSubscription
  } = useSubscriptionData();

  // Use the subscription calculator hook
  const {
    selectedPlan,
    setSelectedPlan,
    overageHandling,
    setOverageHandling,
    activeAddOns,
    toggleAddOn,
    calculateMonthlyCost
  } = useSubscriptionCalculator(plans, addOns, subscription);

  // Calculate costs based on billing cycle
  const costs = calculateMonthlyCost(billingCycle);

  // Effect to set billing cycle based on subscription data
  useEffect(() => {
    if (subscription) {
      // Check if subscription has a contract end date (which indicates annual billing)
      const isAnnual = Boolean(subscription.contract_end_date);
      setBillingCycle(isAnnual ? 'annual' : 'monthly');
    }
  }, [subscription]);

  // Get the current plan object
  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[0];
  
  // Get active add-ons as full objects
  const activeAddOnsData = addOns.filter(addon => 
    activeAddOns.includes(addon.id)
  );

  // Navigation handlers
  const goToStep = (step: UpgradeStep) => {
    setPreviousStep(currentStep);
    setCurrentStep(step);
  };

  const goBack = () => {
    if (previousStep) {
      setCurrentStep(previousStep);
      setPreviousStep(null);
    } else {
      // If no previous step is recorded, go to the manage step
      setCurrentStep('manage');
    }
  };

  // Calculate current step index for progress bar
  const getStepIndex = () => {
    const stepOrder: UpgradeStep[] = ['manage', 'plan', 'addons', 'overage'];
    return stepOrder.indexOf(currentStep);
  }

  // Show loading state while fetching subscription data
  if (isLoadingSubscription) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container max-w-4xl mx-auto"
    >
      {/* Progress Bar - Only show if not on the first step */}
      {currentStep !== 'manage' && (
        <div className="mb-8">
          <WizardProgress step={getStepIndex()} totalSteps={4} />
        </div>
      )}

      {/* Step 1: Manage Subscription */}
      {currentStep === 'manage' && (
        <ManageSubscriptionStep 
          currentPlan={currentPlan}
          activeAddOns={activeAddOnsData}
          overageHandling={overageHandling}
          billingCycle={billingCycle}
          onChangePlan={() => goToStep('plan')}
          onChangeAddOns={() => goToStep('addons')}
          onChangeOverage={() => goToStep('overage')}
        />
      )}
      
      {/* Step 2: Change Plan */}
      {currentStep === 'plan' && (
        <ChangePlanStep
          plans={plans}
          currentPlan={currentPlan}
          billingCycle={billingCycle}
          onBillingCycleChange={setBillingCycle}
          onSelectPlan={setSelectedPlan}
          onBack={goBack}
          onComplete={() => goToStep('manage')}
        />
      )}
      
      {/* Step 3: Modify Add-ons */}
      {currentStep === 'addons' && (
        <ModifyAddOnsStep
          addOns={addOns}
          selectedPlan={selectedPlan}
          activeAddOns={activeAddOns}
          onToggleAddOn={toggleAddOn}
          onBack={goBack}
          onComplete={() => goToStep('manage')}
        />
      )}
      
      {/* Step 4: Update Overage Handling */}
      {currentStep === 'overage' && (
        <UpdateOverageStep
          overageHandling={overageHandling}
          onOverageChange={setOverageHandling}
          onBack={goBack}
          onComplete={() => goToStep('manage')}
          selectedPlan={selectedPlan}
        />
      )}
    </motion.div>
  );
};

export default UpgradeFlow;
