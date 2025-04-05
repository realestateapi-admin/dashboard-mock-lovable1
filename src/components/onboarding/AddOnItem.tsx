
import { Switch } from "@/components/ui/switch";
import { AddOnData } from "@/types/billing";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

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
  const requiresSales = addonPrice === "Contact Sales" || addon.requiresApproval;
  
  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="font-medium text-base">{addon.name}</p>
          <p className="text-sm text-muted-foreground mt-1">{addon.description}</p>
          {addon.billingType && (
            <span className="inline-block mt-2 text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              {addon.billingType === 'metered' ? 'Usage-based' : 'Monthly subscription'}
            </span>
          )}
          {addon.requiresApproval && (
            <div className="mt-2 flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Requires approval. If selected, a sales representative will contact you to evaluate your request and determine your level of access.
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-6 flex-shrink-0">
          {isIncluded ? (
            <span className="text-sm text-primary font-medium">Included</span>
          ) : requiresSales ? (
            <>
              <span className="text-sm font-medium whitespace-nowrap">Contact Sales</span>
              <Switch 
                checked={isSelected}
                onCheckedChange={() => onToggle(addon.id)}
              />
            </>
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
