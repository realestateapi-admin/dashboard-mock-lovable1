
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
    // Only run once on initial mount
    if (!originalStateRef.current.initialized && currentPlan) {
      // Store the original subscription state (immutable after initialization)
      // This represents what's already in the database, not changing during this session
      originalStateRef.current = {
        plan: JSON.parse(JSON.stringify(currentPlan)),
        addOns: JSON.parse(JSON.stringify(activeAddOns)),
        overageHandling: overageHandling,
        initialized: true
      };
      
      // Also initialize the proposed state with the same values initially
      setProposedPlan(JSON.parse(JSON.stringify(currentPlan)));
      setProposedAddOns(JSON.parse(JSON.stringify(activeAddOns)));
      setProposedOverage(overageHandling);
      
      // Mark loading as complete
      setIsLoading(false);
      
      console.log("✅ Original subscription state initialized (IMMUTABLE):", {
        plan: originalStateRef.current.plan?.name,
        addOns: originalStateRef.current.addOns.map(a => a.name),
        overageHandling: originalStateRef.current.overageHandling
      });
    }
  }, [currentPlan, activeAddOns, overageHandling]);

  // Update ONLY the proposed state when current props change (after initialization)
  // This ensures the original state remains truly immutable while proposed state reflects user changes
  useEffect(() => {
    if (originalStateRef.current.initialized && !isLoading) {
      // Only update the proposed state, never touch the original state
      setProposedPlan(JSON.parse(JSON.stringify(currentPlan)));
      setProposedAddOns(JSON.parse(JSON.stringify(activeAddOns)));
      setProposedOverage(overageHandling);
      
      console.log("📝 Updated ONLY proposed subscription (original remains unchanged):", {
        originalPlan: originalStateRef.current.plan?.name,
        proposedPlan: currentPlan?.name,
        planChanged: originalStateRef.current.plan?.id !== currentPlan?.id
      });
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
    // Original state (immutable after initialization)
    originalPlan,
    originalAddOns,
    originalOverage,
    
    // Proposed state (mutable, reflects user changes)
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
