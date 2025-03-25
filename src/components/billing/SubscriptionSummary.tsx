
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanData, AddOnData, SubscriptionData } from "@/types/billing";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";

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
  subscription?: SubscriptionData | null;
  isLoading?: boolean;
}

export const SubscriptionSummary = ({
  selectedPlan,
  plans,
  activeAddOns,
  addOns,
  costs,
  subscription,
  isLoading = false,
}: SubscriptionSummaryProps) => {
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const getRemainingTime = (endDate: string) => {
    if (!endDate) return "N/A";
    try {
      return formatDistanceToNow(new Date(endDate), { addSuffix: true });
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Summary</CardTitle>
        <CardDescription>
          Your current plan and billing details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : subscription ? (
          <>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium">Base Plan</span>
              <span className="font-medium">{subscription.plan_name}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm">Base Price</span>
              <span>{formatCurrency(subscription.minimum_bill_amount)}/month</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm">Records</span>
              <span>{subscription.usage_amount.toLocaleString()}/month</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm">Contract End</span>
              <span>{getRemainingTime(subscription.contract_end_date)}</span>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
        
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
                  <span className="text-sm">{price}</span>
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
          <span>
            {subscription 
              ? formatCurrency(subscription.minimum_bill_amount)
              : costs.total}/month
          </span>
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
