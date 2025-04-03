
import { AddOnsList } from "../AddOnsList";
import { AddOnData } from "@/types/billing";

interface AddOnSectionProps {
  addOns: AddOnData[];
  selectedPlan: string;
  activeAddOns: string[];
  onToggleAddOn: (addOnId: string) => void;
}

export const AddOnSection = ({
  addOns,
  selectedPlan,
  activeAddOns,
  onToggleAddOn
}: AddOnSectionProps) => {
  return (
    <div className="mt-8">
      <AddOnsList
        addOns={addOns}
        selectedPlan={selectedPlan}
        activeAddOns={activeAddOns}
        onToggleAddOn={onToggleAddOn}
      />
    </div>
  );
};
