
import { Check, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
  const isIncludedOffer = isTechSupportForStarter;
  
  return (
    <Card className={`transition-all cursor-pointer ${isSelected ? "ring-2 ring-primary" : ""} ${isIncludedOffer ? "border-amber-200 bg-amber-50" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {!isIncludedOffer && (
              <Checkbox
                id={addon.id}
                checked={isSelected}
                onCheckedChange={() => onToggle(addon.id)}
                className="mt-1"
              />
            )}
            {isIncludedOffer && (
              <div className="mt-1 flex items-center justify-center w-4 h-4 bg-amber-500 rounded">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <label
                  htmlFor={addon.id}
                  className="text-sm font-medium cursor-pointer"
                >
                  {addon.name}
                </label>
                {isIncludedOffer && (
                  <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    <Clock className="h-3 w-3" />
                    Limited Time
                  </div>
                )}
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
          <div className="text-right">
            {isIncludedOffer ? (
              <div className="text-sm font-medium text-amber-700">
                Included
              </div>
            ) : (
              <div className="text-sm font-medium">
                {price}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
