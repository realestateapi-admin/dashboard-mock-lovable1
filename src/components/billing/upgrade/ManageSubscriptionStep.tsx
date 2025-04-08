
import React, { useState, useEffect, useRef } from "react";
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
  // Use useRef to store the initial values that should NEVER change
  // This guarantees they remain completely static throughout component lifecycle
  const initialValuesRef = useRef<{
    plan: PlanData | null;
    addOns: AddOnData[];
    overageHandling: string;
  }>({
    plan: null,
    addOns: [],
    overageHandling: ""
  });
  
  // Store the current proposed state (what the user is configuring)
  // These will change as user makes selections
  const [proposedPlan, setProposedPlan] = useState<PlanData | null>(null);
  const [proposedAddOns, setProposedAddOns] = useState<AddOnData[]>([]);
  const [proposedOverage, setProposedOverage] = useState<string>("");
  
  // Flag to track if initialization has happened
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize state only once on component mount
  useEffect(() => {
    if (!isInitialized && currentPlan) {
      // Store initial values in ref - these NEVER change during component lifecycle
      initialValuesRef.current = {
        plan: JSON.parse(JSON.stringify(currentPlan)),
        addOns: JSON.parse(JSON.stringify(activeAddOns)),
        overageHandling: overageHandling
      };
      
      // Initialize the proposed state with copies of the current values
      setProposedPlan(JSON.parse(JSON.stringify(currentPlan)));
      setProposedAddOns(JSON.parse(JSON.stringify(activeAddOns)));
      setProposedOverage(overageHandling);
      
      // Mark as initialized to prevent re-initialization
      setIsInitialized(true);
      
      console.log("Initialized original plan state:", initialValuesRef.current.plan);
      console.log("Initialized original add-ons:", initialValuesRef.current.addOns);
    }
  }, [currentPlan, activeAddOns, overageHandling, isInitialized]);

  // Update proposed state when current values change (after user makes changes)
  useEffect(() => {
    // Only update the proposed state if we've already initialized
    if (isInitialized) {
      // Create completely new objects through deep cloning
      setProposedPlan(JSON.parse(JSON.stringify(currentPlan)));
      setProposedAddOns(JSON.parse(JSON.stringify(activeAddOns)));
      setProposedOverage(overageHandling);
      
      console.log("Updated proposed plan state with deep clone:", currentPlan);
      console.log("Updated proposed add-ons with deep clone:", activeAddOns);
    }
  }, [currentPlan, activeAddOns, overageHandling, isInitialized]);

  // Get the original values from the ref (these never change)
  const originalPlan = initialValuesRef.current.plan;
  const originalAddOns = initialValuesRef.current.addOns;
  const originalOverage = initialValuesRef.current.overageHandling;

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

  // Handlers
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

  // Wait for initialization before rendering
  if (!isInitialized || !originalPlan || !proposedPlan) {
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
