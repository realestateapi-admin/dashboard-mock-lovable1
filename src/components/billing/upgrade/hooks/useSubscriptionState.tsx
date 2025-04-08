
import { useRef, useState, useEffect } from "react";
import { PlanData, AddOnData } from "@/types/billing";
import { addOnsChanged } from "../utils/planChangeUtils";

interface SubscriptionStateProps {
  currentPlan: PlanData;
  activeAddOns: AddOnData[];
  overageHandling: string;
}

export const useSubscriptionState = ({
  currentPlan,
  activeAddOns,
  overageHandling
}: SubscriptionStateProps) => {
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

  return {
    // Original state (immutable)
    originalPlan,
    originalAddOns,
    originalOverage,
    
    // Proposed state (mutable)
    proposedPlan,
    proposedAddOns,
    proposedOverage,
    
    // Change detection
    planChanged,
    addOnsChangedFromOriginal,
    overageChangedFromOriginal,
    hasAnyChanges,
    
    // Loading state
    isLoading
  };
};
