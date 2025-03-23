
import { Switch } from "@/components/ui/switch";
import { AddOnData } from "@/types/billing";
import { Card } from "@/components/ui/card";

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
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{addon.name}</p>
          <p className="text-sm text-muted-foreground mt-1">{addon.description}</p>
          {addon.billingType && (
            <span className="inline-block mt-1 text-xs bg-slate-100 px-2 py-0.5 rounded-full">
              {addon.billingType === 'metered' ? 'Usage-based' : 'Monthly subscription'}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {isIncluded ? (
            <span className="text-sm text-primary font-medium">Included</span>
          ) : (
            <>
              <span className="text-sm font-medium whitespace-nowrap">{addonPrice}</span>
              <Switch 
                checked={isSelected}
                onCheckedChange={() => onToggle(addon.id)}
                disabled={isIncluded}
              />
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
