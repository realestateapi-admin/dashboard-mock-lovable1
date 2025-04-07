
import { AddOnData } from "@/types/billing";
import { AddOnItem } from "@/components/onboarding/AddOnItem";
import { Skeleton } from "@/components/ui/skeleton";

interface AddOnsStepProps {
  addOns: AddOnData[];
  selectedPlan: string;
  activeAddOns: string[];
  onToggleAddOn: (addOnId: string) => void;
  isLoading: boolean;
}

export const AddOnsStep = ({
  addOns,
  selectedPlan,
  activeAddOns,
  onToggleAddOn,
  isLoading
}: AddOnsStepProps) => {
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-1">Enhance Your Subscription</h3>
        <p className="text-sm text-muted-foreground">
          Select additional services to add to your subscription
        </p>
      </div>
      
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
  );
};
