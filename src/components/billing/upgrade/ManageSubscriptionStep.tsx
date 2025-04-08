
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlanData, AddOnData } from "@/types/billing";
import { CurrentPlanCard } from "./cards/CurrentPlanCard";
import { ModifiedPlanCard } from "./cards/ModifiedPlanCard";
import { PlanOptionsCard } from "./cards/PlanOptionsCard";
import { PlanChangeIndicator } from "./indicators/PlanChangeIndicator";
import { formatOverageHandling, getPlanPrice, addOnsChanged, overageHandlingChanged } from "./utils/planChangeUtils";
import { useSubscriptionState } from "./hooks/useSubscriptionState";
import { LoadingState } from "./LoadingState";

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
  const {
    originalPlan,
    originalAddOns,
    originalOverage,
    proposedPlan,
    proposedAddOns,
    proposedOverage,
    planChanged,
    addOnsChangedFromOriginal,
    overageChangedFromOriginal,
    hasAnyChanges,
    isLoading
  } = useSubscriptionState({
    currentPlan,
    activeAddOns,
    overageHandling
  });

  // Show loading state
  if (isLoading) {
    return <LoadingState />;
  }

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

      <div className="grid gap-6 md:grid-cols-2">
        {/* Always show the original plan on the left - this never changes during the session */}
        <CurrentPlanCard
          plan={originalPlan}
          addOns={originalAddOns}
          overageHandling={originalOverage}
          billingCycle={billingCycle}
          getPlanPrice={(plan) => getPlanPrice(plan, billingCycle)}
          formatOverageHandling={formatOverageHandling}
        />

        {/* Show the proposed/modified plan on the right - this updates with user changes */}
        <ModifiedPlanCard
          currentPlan={proposedPlan}
          activeAddOns={proposedAddOns}
          originalAddOns={originalAddOns}
          overageHandling={proposedOverage}
          originalOverage={originalOverage}
          billingCycle={billingCycle}
          getPlanPrice={(plan) => getPlanPrice(plan, billingCycle)}
          formatOverageHandling={formatOverageHandling}
          hasAnyChanges={hasAnyChanges}
          planChanged={planChanged}
        />
      </div>

      {hasAnyChanges && (
        <PlanChangeIndicator 
          hasChanges={hasAnyChanges} 
          planChanged={planChanged}
          addOnsChanged={addOnsChangedFromOriginal}
          overageChanged={overageChangedFromOriginal}
        />
      )}

      <PlanOptionsCard
        onChangePlan={onChangePlan}
        onChangeAddOns={onChangeAddOns}
        onChangeOverage={onChangeOverage}
        onFinalizePlan={onFinalizePlan}
        setHasChanges={() => {}}
      />
    </motion.div>
  );
};
