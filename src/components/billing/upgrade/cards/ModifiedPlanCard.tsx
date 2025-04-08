
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { PlanData, AddOnData } from "@/types/billing";

interface ModifiedPlanCardProps {
  currentPlan: PlanData;
  activeAddOns: AddOnData[];
  originalAddOns: AddOnData[];
  overageHandling: string;
  originalOverage: string;
  billingCycle: 'monthly' | 'annual';
  getPlanPrice: (plan: PlanData) => string;
  formatOverageHandling: (value: string) => string;
  hasAnyChanges: boolean;
  planChanged: boolean;
}

export const ModifiedPlanCard = ({
  currentPlan,
  activeAddOns,
  originalAddOns,
  overageHandling,
  originalOverage,
  billingCycle,
  getPlanPrice,
  formatOverageHandling,
  hasAnyChanges,
  planChanged
}: ModifiedPlanCardProps) => {
  // Find addon IDs that were added
  const getAddedAddOns = () => {
    const originalIds = originalAddOns.map(a => a.id);
    return activeAddOns.filter(addon => !originalIds.includes(addon.id));
  };

  // Find addon IDs that were removed
  const getRemovedAddOns = () => {
    const currentIds = activeAddOns.map(a => a.id);
    return originalAddOns.filter(addon => !currentIds.includes(addon.id));
  };

  // Check if overage handling has changed
  const overageChanged = originalOverage !== overageHandling;
  
  return (
    <Card className={`border-2 ${hasAnyChanges ? 'border-primary/20' : 'border-muted/20'}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>{hasAnyChanges ? 'Proposed Changes' : 'Proposed Plan'}</span>
          <Badge variant="outline" className={`${hasAnyChanges ? 'bg-primary/10 text-primary' : 'bg-muted/10 text-muted-foreground'}`}>
            {billingCycle === 'annual' ? 'Annual Billing' : 'Monthly Billing'}
          </Badge>
        </CardTitle>
        <CardDescription>
          {hasAnyChanges 
            ? 'Your proposed plan changes'
            : 'Make changes to your subscription'
          }
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className={`font-medium text-lg ${planChanged ? 'text-primary' : ''}`}>
                {currentPlan.name}
                {planChanged && <span className="text-xs ml-2">(Changed)</span>}
              </h3>
              <p className="text-muted-foreground">{currentPlan.description}</p>
            </div>
            <div className="text-2xl font-bold">{getPlanPrice(currentPlan)}</div>
          </div>

          <div className="border-t pt-3">
            <h4 className="text-sm font-medium mb-2">Plan includes:</h4>
            <ul className="space-y-2">
              {currentPlan.features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
              {currentPlan.features.length > 4 && (
                <li className="text-sm text-muted-foreground">
                  +{currentPlan.features.length - 4} more features
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-2">Active Add-ons:</h4>
          {activeAddOns.length > 0 ? (
            <ul className="space-y-2">
              {activeAddOns.map((addon) => {
                // Check if this addon is new
                const isNewAddon = getAddedAddOns().some(a => a.id === addon.id);
                
                return (
                  <li key={addon.id} className="flex justify-between text-sm">
                    <span className={isNewAddon ? "font-medium text-green-600" : ""}>
                      {addon.name} {isNewAddon && <span className="ml-1 text-xs">(Added)</span>}
                    </span>
                    <span className={`font-medium ${isNewAddon ? "text-green-600" : ""}`}>
                      {addon.prices[currentPlan.id]}
                    </span>
                  </li>
                );
              })}
              
              {/* Show removed add-ons with strikethrough */}
              {getRemovedAddOns().map((addon) => (
                <li key={addon.id} className="flex justify-between text-sm text-red-500 line-through opacity-70">
                  <span>{addon.name} <span className="ml-1 text-xs">(Removed)</span></span>
                  <span>{addon.prices[currentPlan.id]}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No add-ons currently active</p>
          )}
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-2">Overage Handling:</h4>
          <p className={`text-sm ${overageChanged ? "font-medium text-amber-600" : ""}`}>
            {formatOverageHandling(overageHandling)}
            {overageChanged && (
              <span className="ml-2 text-xs">(Changed from {formatOverageHandling(originalOverage)})</span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
