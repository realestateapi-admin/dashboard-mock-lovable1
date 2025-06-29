
import { useState, useEffect } from "react";
import { AddOnData, SubscriptionData } from "@/types/billing";

export interface AddOnManagementReturn {
  activeAddOns: string[];
  setActiveAddOns: (addOns: string[]) => void;
  toggleAddOn: (addOnId: string) => void;
}

export const useAddOnManagement = (
  addOns: AddOnData[],
  subscription?: SubscriptionData | null
): AddOnManagementReturn => {
  // Initialize addons as empty array for first-time users
  const getInitialAddOns = () => {
    try {
      // Check if user has visited the add-ons step before
      const hasVisitedAddOns = localStorage.getItem('hasVisitedAddOns');
      
      if (!hasVisitedAddOns) {
        // First time visitor - start with empty add-ons
        return [];
      }
      
      // Returning user - load from localStorage
      const storedAddOns = localStorage.getItem('activeAddOns');
      if (storedAddOns) {
        const parsed = JSON.parse(storedAddOns);
        if (Array.isArray(parsed)) {
          console.log("Loaded add-ons from localStorage:", parsed);
          return parsed;
        }
      }
      
      const selectedAddOns = localStorage.getItem('selectedAddOns');
      if (selectedAddOns) {
        const parsed = JSON.parse(selectedAddOns);
        if (Array.isArray(parsed)) {
          console.log("Loaded add-ons from selectedAddOns:", parsed);
          localStorage.setItem('activeAddOns', selectedAddOns);
          return parsed;
        }
      }
      
      return [];
    } catch (e) {
      console.error("Error parsing stored add-ons:", e);
      return [];
    }
  };

  const [activeAddOns, setActiveAddOns] = useState<string[]>(getInitialAddOns());
  
  // Mark that user has visited add-ons step when component mounts
  useEffect(() => {
    localStorage.setItem('hasVisitedAddOns', 'true');
  }, []);
  
  // Persist active add-ons to localStorage
  useEffect(() => {
    localStorage.setItem('activeAddOns', JSON.stringify(activeAddOns));
  }, [activeAddOns]);

  // Toggle add-on selection
  const toggleAddOn = (addOnId: string) => {
    setActiveAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  // Update active add-ons when subscription changes
  useEffect(() => {
    if (subscription && subscription.add_ons && subscription.add_ons.length > 0) {
      setActiveAddOns(subscription.add_ons);
    }
  }, [subscription]);

  return {
    activeAddOns,
    setActiveAddOns,
    toggleAddOn
  };
};
