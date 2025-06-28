
import { AddOnItem } from "@/components/onboarding/AddOnItem";
import { AddOnData } from "@/types/billing";
import { AddOnsSkeleton } from "../billing/wizard/SkeletonLoading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface AddOnsListProps {
  addOns: AddOnData[];
  selectedPlan: string;
  activeAddOns: string[];
  onToggleAddOn: (addOnId: string) => void;
  isLoading?: boolean;
}

const ScrollIndicator = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;
  
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
      <div className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg animate-bounce border-2 border-background">
        <ChevronDown className="h-5 w-5" />
      </div>
    </div>
  );
};

export const AddOnsList = ({
  addOns,
  selectedPlan,
  activeAddOns,
  onToggleAddOn,
  isLoading = false
}: AddOnsListProps) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const checkScrollPosition = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const hasMoreContent = scrollHeight > clientHeight + 10;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
      
      setShowScrollIndicator(hasMoreContent && !isAtBottom);
    }
  };
  
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Check initial scroll position with delays to allow content to render
      const timeouts = [100, 500, 1000].map(delay => 
        setTimeout(checkScrollPosition, delay)
      );
      
      container.addEventListener('scroll', checkScrollPosition);
      return () => {
        timeouts.forEach(clearTimeout);
        container.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, [addOns]);
  
  // Also check when window resizes
  useEffect(() => {
    const handleResize = () => {
      setTimeout(checkScrollPosition, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return <AddOnsSkeleton />;
  }
  
  // Group add-ons by category
  const groupedAddOns: Record<string, AddOnData[]> = {};
  
  // Create groups of add-ons by category
  addOns.forEach(addon => {
    const category = addon.category || 'Other';
    if (!groupedAddOns[category]) {
      groupedAddOns[category] = [];
    }
    groupedAddOns[category].push(addon);
  });
  
  // Define the order of categories for display
  const categoryOrder = ['Property Data', 'Demographic Data', 'Support'];
  
  // Sort categories based on the defined order
  const sortedCategories = Object.keys(groupedAddOns).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    
    // If the category is not in our ordered list, put it at the end
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    
    return indexA - indexB;
  });
  
  return (
    <div className="relative h-full">
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto space-y-6 pb-16"
      >
        <h3 className="text-lg font-medium mb-4">Available Add-Ons</h3>
        
        {/* Render add-ons by category in the specified order */}
        {sortedCategories.map((category) => (
          <div key={category} className="space-y-4 mb-8">
            <h4 className="text-md font-medium text-muted-foreground">{category}</h4>
            <div className="space-y-4">
              {groupedAddOns[category].map((addon) => (
                <AddOnItem
                  key={addon.id}
                  addon={addon}
                  selectedPlan={selectedPlan}
                  isSelected={activeAddOns.includes(addon.id)}
                  onToggle={onToggleAddOn}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <ScrollIndicator isVisible={showScrollIndicator} />
    </div>
  );
};
