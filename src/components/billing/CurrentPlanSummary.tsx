
import React from "react";
import { useNavigate } from "react-router-dom";
import { PlanData, AddOnData, SubscriptionData } from "@/types/billing";
import { CurrentPlanHeader } from "./current-plan/CurrentPlanHeader";
import { PlanDetails } from "./current-plan/PlanDetails";
import { AddOnsList } from "./current-plan/AddOnsList";
import { BillingDetails } from "./current-plan/BillingDetails";
import { PlanSummaryLoading } from "./current-plan/PlanSummaryLoading";
import { formatPrice as formatPriceUtil } from "./current-plan/formatters";

interface CurrentPlanSummaryProps {
  plans: PlanData[];
  addOns: AddOnData[];
  subscription: SubscriptionData | null;
  selectedPlan: string;
  activeAddOns: string[];
  overageHandling: string;
  billingCycle: 'monthly' | 'annual';
  isLoading: boolean;
}

export const CurrentPlanSummary = ({
  plans,
  addOns,
  subscription,
  selectedPlan,
  activeAddOns,
  overageHandling,
  billingCycle,
  isLoading
}: CurrentPlanSummaryProps) => {
  const navigate = useNavigate();
  
  // Find the current plan details
  const currentPlan = plans.find(p => p.id === selectedPlan);
  
  // Find active add-ons
  const currentAddOns = addOns.filter(addon => activeAddOns.includes(addon.id));
  
  // Format price for display - ensure it always returns a string
  const formatPrice = (price: string | number): string => {
    return formatPriceUtil(price, billingCycle, currentPlan?.id);
  };
  
  const handleManageSubscription = () => {
    navigate('/dashboard/upgrade');
  };
  
  if (isLoading) {
    return <PlanSummaryLoading />;
  }
  
  return (
    <div className="space-y-6">
      <CurrentPlanHeader 
        planName={currentPlan?.name || "No Plan"}
        addOnCount={activeAddOns.length}
        billingCycle={billingCycle}
      />
      
      <PlanDetails 
        currentPlan={currentPlan}
        formatPrice={formatPrice}
        billingCycle={billingCycle}
      />
      
      <AddOnsList 
        currentAddOns={currentAddOns}
      />
      
      <BillingDetails 
        billingCycle={billingCycle}
        overageHandling={overageHandling}
        subscription={subscription}
        onManageSubscription={handleManageSubscription}
      />
    </div>
  );
};
