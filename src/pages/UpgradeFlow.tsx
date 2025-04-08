
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Import hooks and services
import { useSubscriptionData } from "@/hooks/useSubscriptionData";
import { useSubscriptionCalculator } from "@/hooks/useSubscriptionCalculator";

// Import data
import { plans, addOns } from "@/data/billingData";

// Import components
import { CurrentPlanView } from "@/components/billing/upgrade/CurrentPlanView";

const UpgradeFlow = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
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

  // Handle navigation to different sections
  const handleChangePlan = () => {
    toast({
      title: "Change Plan",
      description: "This will navigate to the plan selection page (to be implemented)",
    });
    // Placeholder: navigate to plan selection
    // setCurrentStep(1);
  };

  const handleChangeAddOns = () => {
    toast({
      title: "Modify Add-ons",
      description: "This will navigate to the add-ons selection page (to be implemented)",
    });
    // Placeholder: navigate to add-ons selection
    // setCurrentStep(2);
  };

  const handleChangeOverage = () => {
    toast({
      title: "Change Overage Settings",
      description: "This will navigate to the overage settings page (to be implemented)",
    });
    // Placeholder: navigate to overage settings
    // setCurrentStep(3);
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
      className="container max-w-4xl"
    >
      {currentStep === 0 && (
        <CurrentPlanView 
          currentPlan={currentPlan}
          activeAddOns={activeAddOnsData}
          overageHandling={overageHandling}
          billingCycle={billingCycle}
          onChangePlan={handleChangePlan}
          onChangeAddOns={handleChangeAddOns}
          onChangeOverage={handleChangeOverage}
        />
      )}
      
      {/* We'll implement the other steps in future updates */}
    </motion.div>
  );
};

export default UpgradeFlow;
