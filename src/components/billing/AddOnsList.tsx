
import { AddOnItem } from "@/components/onboarding/AddOnItem";
import { AddOnData } from "@/types/billing";
import { AddOnsSkeleton } from "../billing/wizard/SkeletonLoading";

interface AddOnsListProps {
  addOns: AddOnData[];
  selectedPlan: string;
  activeAddOns: string[];
  onToggleAddOn: (addOnId: string) => void;
  isLoading?: boolean;
}

export const AddOnsList = ({
  addOns,
  selectedPlan,
  activeAddOns,
  onToggleAddOn,
  isLoading = false
}: AddOnsListProps) => {
  
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
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Available Add-Ons</h3>
      
      {/* Render add-ons by category */}
      {Object.entries(groupedAddOns).map(([category, categoryAddOns]) => (
        <div key={category} className="space-y-4 mb-8">
          <h4 className="text-md font-medium text-muted-foreground">{category}</h4>
          <div className="space-y-4">
            {categoryAddOns.map((addon) => (
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
