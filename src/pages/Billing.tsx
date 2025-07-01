
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { useAccountExecutive } from "@/contexts/AccountExecutiveContext";
import { Printer } from "lucide-react";

// Import components
import { TrialAlert } from "@/components/billing/TrialAlert";
import { BillingTabs } from "@/components/billing/BillingTabs";
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

  // Get stored plan selection from localStorage
  useEffect(() => {
    const storedBillingCycle = localStorage.getItem('billingCycle');
    if (storedBillingCycle && (storedBillingCycle === 'monthly' || storedBillingCycle === 'annual')) {
      setBillingCycle(storedBillingCycle as 'monthly' | 'annual');
    }
  }, []);

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
    localStorage.setItem('billingCycle', cycle);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice download started",
      description: `Invoice ${invoiceId} is being downloaded.`,
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Print initiated",
      description: "The print dialog has been opened.",
    });
  };

  // Determine if we should hide trial banners based on subscription
  const shouldHideTrialBanners = localIsOnPaidPlan || isOnPaidPlan;

  // Get current plan name from subscription or selected plan
  const currentPlanName = subscription?.plan_name || 
    plans.find(p => p.id === selectedPlan)?.name || "Starter";

  // Determine if user is on a paid plan for cancellation link
  const showCancellationLink = localIsOnPaidPlan || isOnPaidPlan;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Billing & Subscription</h1>
        <Button
          onClick={handlePrint}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Printer className="h-4 w-4" />
          Print
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
        planName={currentPlanName}
        isOnPaidPlan={showCancellationLink}
      />
      
      {/* Always render the AccountExecutiveWidget - it has internal visibility control */}
      <AccountExecutiveWidget />
    </motion.div>
  );
};

export default Billing;
