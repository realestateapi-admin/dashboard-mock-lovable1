
import { Switch } from "@/components/ui/switch";
import { AddOnData } from "@/types/billing";

interface AddOnItemProps {
  addon: AddOnData;
  selectedPlan: string;
  isSelected: boolean;
  onToggle: (addonId: string) => void;
}

export const AddOnItem = ({ 
  addon, 
  selectedPlan, 
  isSelected, 
  onToggle 
}: AddOnItemProps) => {
  const addonPrice = addon.prices[selectedPlan as keyof typeof addon.prices];
  const isIncluded = addonPrice === "Included";
  
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{addon.name}</p>
        <p className="text-sm text-muted-foreground">{addon.description}</p>
      </div>
      <div className="flex items-center gap-3">
        {isIncluded ? (
          <span className="text-sm text-primary font-medium">Included</span>
        ) : (
          <>
            <span className="text-sm font-medium">{addonPrice}</span>
            <Switch 
              checked={isSelected}
              onCheckedChange={() => onToggle(addon.id)}
              disabled={isIncluded}
            />
          </>
        )}
      </div>
    </div>
  );
};
