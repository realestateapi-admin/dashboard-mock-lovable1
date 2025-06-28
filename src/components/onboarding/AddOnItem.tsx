
import { Check, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { AddOnData } from "@/types/billing";

interface AddOnItemProps {
  addon: AddOnData;
  selectedPlan: string;
  isSelected: boolean;
  onToggle: (addOnId: string) => void;
}

export const AddOnItem = ({ addon, selectedPlan, isSelected, onToggle }: AddOnItemProps) => {
  const price = addon.prices[selectedPlan] || addon.prices.starter || "Contact Sales";
  
  // Special handling for Tech Support on Starter plan
  const isTechSupportForStarter = addon.id === "tech-support" && selectedPlan === "starter";
  
  return (
    <Card className={`transition-all ${isSelected ? "ring-2 ring-primary" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <label className="text-sm font-medium">
                  {addon.name}
                </label>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {addon.description}
              </p>
              {addon.requiresApproval && (
                <p className="text-xs text-amber-600 font-medium">
                  * Requires approval
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-right">
              <div className="text-sm font-medium">
                {price}
              </div>
            </div>
            {!isTechSupportForStarter && (
              <Switch
                checked={isSelected}
                onCheckedChange={() => onToggle(addon.id)}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
