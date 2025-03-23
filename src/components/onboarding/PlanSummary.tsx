
import { PlanData, AddOnData } from "@/types/billing";

interface PlanSummaryProps {
  selectedPlan: string;
  selectedAddOns: string[];
  plans: PlanData[];
  addOns: AddOnData[];
}

export const PlanSummary = ({ 
  selectedPlan, 
  selectedAddOns,
  plans,
  addOns
}: PlanSummaryProps) => {
  const currentPlan = plans.find(p => p.id === selectedPlan);
  
  return (
    <div className="space-y-4 pb-6">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium">Plan</span>
        <span>{currentPlan?.name}</span>
      </div>
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium">Base Price</span>
        <div className="flex gap-1 items-baseline">
          <span>{currentPlan?.price}</span>
          <span className="text-xs text-muted-foreground">
            per month
          </span>
        </div>
      </div>
      
      {selectedAddOns.length > 0 && (
        <>
          <div className="h-px bg-border my-2"></div>
          <div className="font-medium">Selected Add-ons:</div>
          {selectedAddOns.map(addonId => {
            const addon = addOns.find(a => a.id === addonId);
            if (!addon) return null;
            return (
              <div key={addonId} className="flex justify-between items-baseline pl-4">
                <span className="text-sm">{addon.name}</span>
                <span className="text-sm">{addon.prices[selectedPlan as keyof typeof addon.prices]}</span>
              </div>
            );
          })}
        </>
      )}
      
      <div className="h-px bg-border my-2" />
      <div className="flex justify-between items-baseline text-primary font-medium">
        <span>First payment due</span>
        <span>In 14 days</span>
      </div>
    </div>
  );
};
