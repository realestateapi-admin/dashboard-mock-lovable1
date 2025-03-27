
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

// Import components
import { TrialAlert } from "@/components/billing/TrialAlert";
import { BillingTabs } from "@/components/billing/BillingTabs";

// Import data
import { plans, addOns, invoices } from "@/data/billingData";

// Import hooks
import { useUsageData } from "@/hooks/useUsageData";
import { useSubscriptionData } from "@/hooks/useSubscriptionData";
import { useSubscriptionCalculator } from "@/hooks/useSubscriptionCalculator";

const Billing = () => {
  const { toast } = useToast();
  const { isTrialActive, trialDaysLeft, requestTrialExtension } = useTrialAlert();
  
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

  const costs = calculateMonthlyCost();

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

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice download started",
      description: `Invoice ${invoiceId} is being downloaded.`,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Billing & Subscription</h1>
      </div>
      
      <TrialAlert 
        isTrialActive={isTrialActive} 
        trialDaysLeft={trialDaysLeft} 
        requestTrialExtension={requestTrialExtension} 
      />
      
      <BillingTabs 
        plans={plans}
        addOns={addOns}
        invoices={invoices}
        selectedPlan={selectedPlan}
        activeAddOns={activeAddOns}
        overageHandling={overageHandling}
        costs={costs}
        subscription={subscription}
        isLoadingSubscription={isLoadingSubscription}
        onPlanChange={handlePlanChange}
        onToggleAddOn={toggleAddOn}
        onOverageHandlingChange={setOverageHandling}
        onSaveBillingPreferences={handleSaveBillingPreferences}
        onDownloadInvoice={handleDownloadInvoice}
      />
    </motion.div>
  );
};

export default Billing;
