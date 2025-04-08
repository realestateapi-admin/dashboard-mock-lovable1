
import React, { useRef, useState, useEffect } from "react";
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
  // Use immutable ref to store the original values that will NEVER change during the component lifecycle
  const originalStateRef = useRef<{
    plan: PlanData | null;
    addOns: AddOnData[];
    overageHandling: string;
    initialized: boolean;
  }>({
    plan: null,
    addOns: [],
    overageHandling: "",
    initialized: false
  });
  
  // Store the current proposed state (what the user is configuring)
  const [proposedPlan, setProposedPlan] = useState<PlanData | null>(null);
  const [proposedAddOns, setProposedAddOns] = useState<AddOnData[]>([]);
  const [proposedOverage, setProposedOverage] = useState<string>("");
  
  // Track component initialization (loading state)
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize the original state ONCE on first mount only
  useEffect(() => {
    const initializeOriginalState = () => {
      // Only initialize once
      if (originalStateRef.current.initialized) {
        return;
      }

      // Deep clone the initial props to prevent any reference sharing
      originalStateRef.current = {
        plan: JSON.parse(JSON.stringify(currentPlan)),
        addOns: JSON.parse(JSON.stringify(activeAddOns)),
        overageHandling: overageHandling,
        initialized: true
      };
      
      console.log("✅ Initialized IMMUTABLE original plan state:", originalStateRef.current.plan);
      console.log("✅ Initialized IMMUTABLE original add-ons:", originalStateRef.current.addOns);
    };

    // Initialize the original values if not already done
    if (currentPlan && !originalStateRef.current.initialized) {
      initializeOriginalState();
      
      // Also initialize the proposed state with deep clones
      setProposedPlan(JSON.parse(JSON.stringify(currentPlan)));
      setProposedAddOns(JSON.parse(JSON.stringify(activeAddOns)));
      setProposedOverage(overageHandling);
      
      // Mark loading as complete
      setIsLoading(false);
    }
  }, [currentPlan, activeAddOns, overageHandling]);

  // Update the proposed state when current props change
  // Only run this after initialization
  useEffect(() => {
    if (originalStateRef.current.initialized && !isLoading) {
      // Always create new objects with deep cloning to prevent reference issues
      const newProposedPlan = JSON.parse(JSON.stringify(currentPlan));
      const newProposedAddOns = JSON.parse(JSON.stringify(activeAddOns));
      
      setProposedPlan(newProposedPlan);
      setProposedAddOns(newProposedAddOns);
      setProposedOverage(overageHandling);
      
      console.log("Updated proposed plan with deep clone:", newProposedPlan);
      console.log("Updated proposed add-ons with deep clone:", newProposedAddOns);
    }
  }, [currentPlan, activeAddOns, overageHandling, isLoading]);

  // Access the immutable original values safely
  const originalPlan = originalStateRef.current.plan;
  const originalAddOns = originalStateRef.current.addOns;
  const originalOverage = originalStateRef.current.overageHandling;

  // Check if any of the subscription details have changed
  const planChanged = originalPlan && proposedPlan && originalPlan.id !== proposedPlan.id;
  
  // Check if add-ons have changed
  const addOnsChangedFromOriginal = addOnsChanged(originalAddOns, proposedAddOns);
  
  // Check if overage handling has changed
  const overageChangedFromOriginal = originalOverage !== proposedOverage;
  
  // Determine if any changes have been made
  const hasAnyChanges = planChanged || 
    addOnsChangedFromOriginal || 
    overageChangedFromOriginal;

  // Action handlers
  const handleChangePlan = () => {
    onChangePlan();
  };

  const handleChangeAddOns = () => {
    onChangeAddOns();
  };

  const handleChangeOverage = () => {
    onChangeOverage();
  };

  const handleFinalizePlan = () => {
    onFinalizePlan();
  };

  // Show loading state
  if (isLoading || !originalStateRef.current.initialized || !originalPlan || !proposedPlan) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
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
        onChangePlan={handleChangePlan}
        onChangeAddOns={handleChangeAddOns}
        onChangeOverage={handleChangeOverage}
        onFinalizePlan={handleFinalizePlan}
        setHasChanges={() => {}}
      />
    </motion.div>
  );
};
