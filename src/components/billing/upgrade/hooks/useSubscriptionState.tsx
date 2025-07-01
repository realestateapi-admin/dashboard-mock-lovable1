
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
  
  // Initialize the original state ONCE on first mount only - this becomes the immutable baseline
  useEffect(() => {
    // Only run once on initial mount and when we have valid data
    if (!originalStateRef.current.initialized && currentPlan && currentPlan.id) {
      // Store the original subscription state (immutable after initialization)
      // This represents what's already in the database, not changing during this session
      originalStateRef.current = {
        plan: JSON.parse(JSON.stringify(currentPlan)),
        addOns: JSON.parse(JSON.stringify(activeAddOns)),
        overageHandling: overageHandling,
        initialized: true
      };
      
      // Initialize proposed state with the same values
      setProposedPlan(JSON.parse(JSON.stringify(currentPlan)));
      setProposedAddOns(JSON.parse(JSON.stringify(activeAddOns)));
      setProposedOverage(overageHandling);
      
      // Mark loading as complete
      setIsLoading(false);
      
      console.log("✅ Original subscription state initialized (IMMUTABLE - NEVER CHANGES):", {
        plan: originalStateRef.current.plan?.name,
        addOns: originalStateRef.current.addOns.map(a => a.name),
        overageHandling: originalStateRef.current.overageHandling
      });
    }
  }, [currentPlan, activeAddOns, overageHandling]);

  // Update ONLY the proposed state when props change - NEVER touch the original state
  useEffect(() => {
    if (originalStateRef.current.initialized && !isLoading && currentPlan && currentPlan.id) {
      // Always update the proposed state to reflect current user selections
      // The original state remains frozen as the baseline for comparison
      setProposedPlan(JSON.parse(JSON.stringify(currentPlan)));
      setProposedAddOns(JSON.parse(JSON.stringify(activeAddOns)));
      setProposedOverage(overageHandling);
      
      console.log("📝 Updated ONLY proposed subscription (original FROZEN):", {
        originalPlan: originalStateRef.current.plan?.name,
        proposedPlan: currentPlan?.name,
        planChanged: originalStateRef.current.plan?.id !== currentPlan?.id,
        originalIsFrozen: true
      });
    }
  }, [currentPlan, activeAddOns, overageHandling, isLoading]);

  // Access the immutable original values safely
  const originalPlan = originalStateRef.current.plan;
  const originalAddOns = originalStateRef.current.addOns;
  const originalOverage = originalStateRef.current.overageHandling;

  // Check if any of the subscription details have changed from the frozen original
  const planChanged = originalPlan && proposedPlan && originalPlan.id !== proposedPlan.id;
  
  // Check if add-ons have changed from the frozen original
  const addOnsChangedFromOriginal = addOnsChanged(originalAddOns, proposedAddOns);
  
  // Check if overage handling has changed from the frozen original
  const overageChangedFromOriginal = originalOverage !== proposedOverage;
  
  // Determine if any changes have been made from the frozen baseline
  const hasAnyChanges = planChanged || 
    addOnsChangedFromOriginal || 
    overageChangedFromOriginal;

  return {
    // Original state (immutable after initialization - FROZEN BASELINE)
    originalPlan,
    originalAddOns,
    originalOverage,
    
    // Proposed state (mutable, reflects user changes)
    proposedPlan,
    proposedAddOns,
    proposedOverage,
    
    // Change detection (compared against frozen original)
    planChanged,
    addOnsChangedFromOriginal,
    overageChangedFromOriginal,
    hasAnyChanges,
    
    // Loading state
    isLoading
  };
};
