
import { AddOnData } from "@/types/billing";
import { Switch } from "@/components/ui/switch";

interface AddOnsListProps {
  addOns: AddOnData[];
  selectedPlan: string;
  activeAddOns: string[];
  onToggleAddOn: (addOnId: string) => void;
}

export const AddOnsList = ({ 
  addOns, 
  selectedPlan, 
  activeAddOns, 
  onToggleAddOn 
}: AddOnsListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Add-Ons</h3>
      <p className="text-sm text-muted-foreground">
        Enhance your subscription with premium features
      </p>
      
      <div className="space-y-4">
        {addOns.map(addon => {
          const addonPrice = addon.prices[selectedPlan as keyof typeof addon.prices];
          const isIncluded = addonPrice === "Included";
          
          return (
            <div key={addon.id} className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium">{addon.name}</p>
                <p className="text-sm text-muted-foreground">{addon.description}</p>
              </div>
              <div className="flex items-center gap-3">
                {isIncluded ? (
                  <span className="text-sm text-primary font-medium">Included with plan</span>
                ) : (
                  <>
                    <span className="text-sm font-medium">{addonPrice}</span>
                    <Switch 
                      checked={activeAddOns.includes(addon.id)}
                      onCheckedChange={() => onToggleAddOn(addon.id)}
                      disabled={isIncluded}
                    />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
