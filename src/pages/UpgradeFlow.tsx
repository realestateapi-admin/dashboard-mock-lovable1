
import { useState, useEffect, useRef } from "react";
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
import { TermsOfServiceStep } from "@/components/billing/wizard/TermsOfServiceStep";
import { SubscriptionConfirmationStep } from "@/components/billing/wizard/SubscriptionConfirmationStep";

// Wizard step type
type UpgradeStep = 'manage' | 'plan' | 'addons' | 'overage' | 'terms' | 'confirmation';

const UpgradeFlow = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Wizard state
  const [currentStep, setCurrentStep] = useState<UpgradeStep>('manage');
  const [previousStep, setPreviousStep] = useState<UpgradeStep | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Store original subscription state for comparison - never mutated after initial setup
  const originalSubscriptionRef = useRef({
    planId: '',
    addOns: [] as string[],
    overageHandling: '',
    billingCycle: 'monthly' as 'monthly' | 'annual'
  });
  
  // Track if we've initialized the original subscription state
  const hasInitializedRef = useRef(false);
  
  // Initialize billing cycle from localStorage or default to monthly
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(() => {
    const storedCycle = localStorage.getItem('billingCycle');
    return (storedCycle === 'annual' || storedCycle === 'monthly') 
      ? storedCycle as 'monthly' | 'annual' 
      : 'monthly';
  });
  
  // Fetch subscription data
  const {
    subscription,
    isLoading: isLoadingSubscription
  } = useSubscriptionData();

  // Use the subscription calculator hook for proposed changes
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

  // Effect to initialize original subscription state ONCE
  useEffect(() => {
    if (subscription && !hasInitializedRef.current) {
      // Find the plan ID that matches the subscription plan name
      const planId = plans.find(p => 
        p.name.toLowerCase() === subscription.plan_name.toLowerCase()
      )?.id || selectedPlan;
      
      // Save the original state for comparison - this never changes during the session
      originalSubscriptionRef.current = {
        planId,
        addOns: subscription.add_ons || [],
        overageHandling: subscription.overage_handling || 'cut-off',
        billingCycle: Boolean(subscription.contract_end_date) ? 'annual' : 'monthly'
      };
      
      hasInitializedRef.current = true;
      console.log("Initialized original subscription state:", originalSubscriptionRef.current);
    }
  }, [subscription, selectedPlan]);

  // Effect to set billing cycle based on subscription data
  useEffect(() => {
    if (subscription && !hasInitializedRef.current) {
      // Check if subscription has a contract end date (which indicates annual billing)
      const isAnnual = Boolean(subscription.contract_end_date);
      setBillingCycle(isAnnual ? 'annual' : 'monthly');
      
      // Set the overage handling from the subscription if available
      if (subscription.overage_handling) {
        setOverageHandling(subscription.overage_handling);
      }
    }
  }, [subscription]);

  // Effect to set initial add-ons based on the subscription data
  useEffect(() => {
    if (subscription && subscription.add_ons && subscription.add_ons.length > 0 && !hasInitializedRef.current) {
      // Set the active add-ons from the subscription
      subscription.add_ons.forEach(addOnId => {
        if (!activeAddOns.includes(addOnId)) {
          toggleAddOn(addOnId);
        }
      });
    }
  }, [subscription, activeAddOns, toggleAddOn]);

  // Save billing cycle to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('billingCycle', billingCycle);
  }, [billingCycle]);

  // Get the current plan object (for proposed changes)
  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[0];
  
  // Get active add-ons as full objects (for proposed changes)
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
    const stepOrder: UpgradeStep[] = ['manage', 'plan', 'addons', 'overage', 'terms', 'confirmation'];
    return stepOrder.indexOf(currentStep);
  }

  // Handle terms acceptance
  const handleTermsAccepted = (accepted: boolean) => {
    setTermsAccepted(accepted);
  };

  // Handle plan finalization
  const handleFinalizePlan = () => {
    goToStep('terms');
  };

  // Handle billing cycle change
  const handleBillingCycleChange = (cycle: 'monthly' | 'annual') => {
    setBillingCycle(cycle);
    localStorage.setItem('billingCycle', cycle);
  };

  // Handle submission after terms acceptance
  const handleSubmitChanges = () => {
    if (termsAccepted) {
      goToStep('confirmation');
    } else {
      toast({
        title: "Terms of Service Required",
        description: "Please accept the Terms of Service to continue.",
        variant: "destructive"
      });
    }
  };

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
      {/* Progress Bar - Only show if not on the first step and not on the confirmation step */}
      {currentStep !== 'manage' && currentStep !== 'confirmation' && (
        <div className="mb-8">
          <WizardProgress step={getStepIndex()} totalSteps={6} />
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
          onFinalizePlan={handleFinalizePlan}
        />
      )}
      
      {/* Step 2: Change Plan */}
      {currentStep === 'plan' && (
        <ChangePlanStep
          plans={plans}
          currentPlan={currentPlan}
          billingCycle={billingCycle}
          onBillingCycleChange={handleBillingCycleChange}
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

      {/* Step 5: Terms of Service */}
      {currentStep === 'terms' && (
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
            onTermsAccepted={handleTermsAccepted}
          />
          
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={goBack}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={handleSubmitChanges}
              disabled={!termsAccepted}
              className={`px-4 py-2 rounded-md bg-primary text-white ${!termsAccepted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      
      {/* Step 6: Confirmation */}
      {currentStep === 'confirmation' && (
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
        />
      )}
    </motion.div>
  );
};

export default UpgradeFlow;
