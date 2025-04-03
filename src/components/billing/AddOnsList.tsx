
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
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Available Add-Ons</h3>
      <div className="space-y-4">
        {addOns.map((addon) => (
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
  );
};
