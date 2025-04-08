
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { useAccountExecutive } from "@/contexts/AccountExecutiveContext";
import { useNavigate } from "react-router-dom";

// Import components
import { TrialAlert } from "@/components/billing/TrialAlert";
import { BillingTabs } from "@/components/billing/BillingTabs";
import { CancellationLink } from "@/components/billing/CancellationLink";
import { AccountExecutiveWidget } from "@/components/support/AccountExecutiveWidget";
import { Button } from "@/components/ui/button";

// Import data from the new modular files
import { plans, addOns, invoices } from "@/data/billingData";

// Import hooks
import { useUsageData } from "@/hooks/useUsageData";
import { useSubscriptionData } from "@/hooks/useSubscriptionData";
import { useSubscriptionCalculator } from "@/hooks/useSubscriptionCalculator";
import { isPaidPlan } from "@/services/subscriptionService";

const Billing = () => {
  const { toast } = useToast();
  const { isTrialActive, trialDaysLeft, requestTrialExtension, isOnPaidPlan } = useTrialAlert();
  const { setIsEnterprisePlan } = useAccountExecutive();
  const [localIsOnPaidPlan, setLocalIsOnPaidPlan] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const navigate = useNavigate();
  
  // Fetch usage data
  const { 
    currentUsage,
    usageHistory,
    isLoading: isLoadingUsage
  } = useUsageData();
  
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

  // Check if user is on a paid plan when subscription data loads
  useEffect(() => {
    if (subscription) {
      const onPaidPlan = isPaidPlan(subscription.plan_name);
      setLocalIsOnPaidPlan(onPaidPlan);
    }
  }, [subscription]);
  
  // Update enterprise plan status when the selected plan changes
  useEffect(() => {
    // Check if the selected plan is the enterprise plan
    const isEnterprise = selectedPlan === 'enterprise';
    
    // Update the enterprise status in the AccountExecutiveContext
    setIsEnterprisePlan(isEnterprise);
    
    // Store the selected plan in localStorage for persistence
    if (selectedPlan) {
      localStorage.setItem('selectedPlan', selectedPlan);
    }
  }, [selectedPlan, setIsEnterprisePlan]);

  const handleSaveBillingPreferences = () => {
    toast({
      title: "Billing preferences updated",
      description: "Your billing preferences have been saved successfully.",
    });
  };

  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
    toast({
      title: "Plan selection updated",
      description: `You've selected the ${plans.find(p => p.id === planId)?.name} plan.`,
    });
  };

  const handleBillingCycleChange = (cycle: 'monthly' | 'annual') => {
    setBillingCycle(cycle);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice download started",
      description: `Invoice ${invoiceId} is being downloaded.`,
    });
  };
  
  // Navigate to the upgrade flow
  const handleUpgradePlan = () => {
    navigate('/dashboard/upgrade');
  };

  // Determine if we should hide trial banners based on subscription
  const shouldHideTrialBanners = localIsOnPaidPlan || isOnPaidPlan;

  // Get current plan name from subscription or selected plan
  const currentPlanName = subscription?.plan_name || 
    plans.find(p => p.id === selectedPlan)?.name || "Starter";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Billing & Subscription</h1>
        
        {/* Add Upgrade button to navigate to the new flow */}
        <Button 
          onClick={handleUpgradePlan}
          className="bg-primary hover:bg-primary/90"
        >
          Upgrade Plan
        </Button>
      </div>
      
      <TrialAlert 
        isTrialActive={isTrialActive} 
        trialDaysLeft={trialDaysLeft} 
        requestTrialExtension={requestTrialExtension} 
        isOnPaidPlan={shouldHideTrialBanners}
      />
      
      <BillingTabs 
        plans={plans}
        addOns={addOns}
        invoices={invoices}
        selectedPlan={selectedPlan}
        activeAddOns={activeAddOns}
        overageHandling={overageHandling}
        costs={costs}
        billingCycle={billingCycle}
        subscription={subscription}
        isLoadingSubscription={isLoadingSubscription}
        onPlanChange={handlePlanChange}
        onToggleAddOn={toggleAddOn}
        onOverageHandlingChange={setOverageHandling}
        onBillingCycleChange={handleBillingCycleChange}
        onSaveBillingPreferences={handleSaveBillingPreferences}
        onDownloadInvoice={handleDownloadInvoice}
      />
      
      {/* Only show cancellation link if user is on a paid plan */}
      {(localIsOnPaidPlan || isOnPaidPlan) && (
        <CancellationLink 
          planName={currentPlanName} 
          isAnnual={billingCycle === 'annual'} 
        />
      )}
      
      {/* Always render the AccountExecutiveWidget - it has internal visibility control */}
      <AccountExecutiveWidget />
    </motion.div>
  );
};

export default Billing;
