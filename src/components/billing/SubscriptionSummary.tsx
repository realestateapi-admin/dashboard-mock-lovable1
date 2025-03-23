
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanData, AddOnData } from "@/types/billing";

interface SubscriptionSummaryProps {
  selectedPlan: string;
  plans: PlanData[];
  activeAddOns: string[];
  addOns: AddOnData[];
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
}

export const SubscriptionSummary = ({
  selectedPlan,
  plans,
  activeAddOns,
  addOns,
  costs,
}: SubscriptionSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Summary</CardTitle>
        <CardDescription>
          Your current plan and billing details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-medium">Base Plan</span>
          <span className="font-medium">{plans.find(p => p.id === selectedPlan)?.name}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-sm">Base Price</span>
          <span>{costs.basePrice}/month</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-sm">Records</span>
          <span>{plans.find(p => p.id === selectedPlan)?.records}/month</span>
        </div>
        
        {activeAddOns.length > 0 && (
          <>
            <div className="h-px bg-border my-2"></div>
            <div className="font-medium">Active Add-ons:</div>
            {activeAddOns.map(addonId => {
              const addon = addOns.find(a => a.id === addonId);
              if (!addon) return null;
              const price = addon.prices[selectedPlan as keyof typeof addon.prices];
              return (
                <div key={addonId} className="flex justify-between items-baseline pl-4">
                  <span className="text-sm">{addon.name}</span>
                  <span className="text-sm">{price === "Included" ? "Included" : price}</span>
                </div>
              );
            })}
            {costs.totalAddOns !== "$0" && (
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium">Add-ons Subtotal</span>
                <span>{costs.totalAddOns}/month</span>
              </div>
            )}
          </>
        )}
        
        <div className="h-px bg-border my-2"></div>
        <div className="flex justify-between items-baseline text-primary font-medium">
          <span>Estimated Monthly Total</span>
          <span>{costs.total}/month</span>
        </div>
        
        <div className="mt-4">
          <Button variant="outline" className="w-full">
            Change Billing Cycle
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
