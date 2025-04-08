
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlanData, AddOnData } from "@/types/billing";
import { CurrentPlanCard } from "./cards/CurrentPlanCard";
import { ModifiedPlanCard } from "./cards/ModifiedPlanCard";
import { PlanOptionsCard } from "./cards/PlanOptionsCard";
import { PlanChangeIndicator } from "./indicators/PlanChangeIndicator";
import { formatOverageHandling, getPlanPrice, addOnsChanged, overageHandlingChanged } from "./utils/planChangeUtils";

interface ManageSubscriptionStepProps {
  currentPlan: PlanData;
  activeAddOns: AddOnData[];
  overageHandling: string;
  billingCycle: 'monthly' | 'annual';
  onChangePlan: () => void;
  onChangeAddOns: () => void;
  onChangeOverage: () => void;
  onFinalizePlan: () => void;
}

export const ManageSubscriptionStep = ({
  currentPlan,
  activeAddOns,
  overageHandling,
  billingCycle,
  onChangePlan,
  onChangeAddOns,
  onChangeOverage,
  onFinalizePlan
}: ManageSubscriptionStepProps) => {
  const [originalPlan, setOriginalPlan] = useState<PlanData | null>(null);
  const [originalAddOns, setOriginalAddOns] = useState<AddOnData[]>([]);
  const [originalOverage, setOriginalOverage] = useState<string>("");
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Save the initial state when the component mounts
  useEffect(() => {
    if (!originalPlan) {
      setOriginalPlan(currentPlan);
      setOriginalAddOns(activeAddOns);
      setOriginalOverage(overageHandling);
    }
  }, [currentPlan, activeAddOns, overageHandling, originalPlan]);

  // Check if any of the subscription details have changed
  const planChangedFromOriginal = originalPlan && originalPlan.id !== currentPlan.id;
  
  // Check if add-ons have changed
  const addOnsChangedFromOriginal = originalAddOns && addOnsChanged(originalAddOns, activeAddOns);
  
  // Check if overage handling has changed
  const overageChangedFromOriginal = originalOverage !== overageHandling;
  
  // Determine if any changes have been made
  const hasAnyChanges = planChangedFromOriginal || 
    addOnsChangedFromOriginal || 
    overageChangedFromOriginal;

  // Handlers that set hasInteracted to true
  const handleChangePlan = () => {
    setHasInteracted(true);
    onChangePlan();
  };

  const handleChangeAddOns = () => {
    setHasInteracted(true);
    onChangeAddOns();
  };

  const handleChangeOverage = () => {
    setHasInteracted(true);
    onChangeOverage();
  };

  const handleFinalizePlan = () => {
    onFinalizePlan();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Manage Your Subscription</h1>
        <p className="text-muted-foreground mt-2">
          Review your current plan and select what you'd like to change
        </p>
      </div>

      <div className={`grid gap-6 ${hasInteracted && hasAnyChanges ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
        {hasInteracted && hasAnyChanges && originalPlan && (
          <CurrentPlanCard
            plan={originalPlan}
            addOns={originalAddOns}
            overageHandling={originalOverage}
            billingCycle={billingCycle}
            getPlanPrice={(plan) => getPlanPrice(plan, billingCycle)}
            formatOverageHandling={formatOverageHandling}
          />
        )}

        <ModifiedPlanCard
          currentPlan={currentPlan}
          activeAddOns={activeAddOns}
          originalAddOns={originalAddOns}
          overageHandling={overageHandling}
          originalOverage={originalOverage}
          billingCycle={billingCycle}
          getPlanPrice={(plan) => getPlanPrice(plan, billingCycle)}
          formatOverageHandling={formatOverageHandling}
          hasAnyChanges={hasInteracted && hasAnyChanges}
          planChanged={planChangedFromOriginal}
        />
      </div>

      {hasInteracted && hasAnyChanges && (
        <PlanChangeIndicator 
          hasChanges={hasAnyChanges} 
          planChanged={planChangedFromOriginal}
          addOnsChanged={addOnsChangedFromOriginal}
          overageChanged={overageChangedFromOriginal}
        />
      )}

      <PlanOptionsCard
        onChangePlan={handleChangePlan}
        onChangeAddOns={handleChangeAddOns}
        onChangeOverage={handleChangeOverage}
        onFinalizePlan={handleFinalizePlan}
        setHasChanges={() => {}}
      />
    </motion.div>
  );
};
