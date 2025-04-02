
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanData, AddOnData } from "@/types/billing";
import { PlansList } from "./PlansList";
import { AddOnsList } from "./AddOnsList";
import { OverageHandling } from "./OverageHandling";
import { BillingCycleSelector } from "./BillingCycleSelector";

interface BillingPlansProps {
  plans: PlanData[];
  addOns: AddOnData[];
  selectedPlan: string;
  activeAddOns: string[];
  overageHandling: string;
  onPlanChange: (planId: string) => void;
  onToggleAddOn: (addOnId: string) => void;
  onOverageHandlingChange: (value: string) => void;
  onSaveBillingPreferences: () => void;
}

export const BillingPlans = ({
  plans,
  addOns,
  selectedPlan,
  activeAddOns,
  overageHandling,
  onPlanChange,
  onToggleAddOn,
  onOverageHandlingChange,
  onSaveBillingPreferences
}: BillingPlansProps) => {
  // Get the selected plan's name for displaying in overage options
  const selectedPlanName = plans.find(p => p.id === selectedPlan)?.name || "selected plan";
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Apply discount to plans for annual billing
  const adjustedPlans = plans.map(plan => {
    if (billingCycle === 'annual' && plan.price !== 'Custom') {
      // Extract numeric price and apply 20% discount
      const numericPrice = parseInt(plan.price.replace(/\$|,/g, ""));
      const discountedPrice = Math.floor(numericPrice * 0.8);
      
      return {
        ...plan,
        price: `$${discountedPrice.toLocaleString()}`,
        originalPrice: plan.price
      };
    }
    return plan;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          Manage your current plan and subscription settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Billing Cycle Selector */}
        <BillingCycleSelector 
          billingCycle={billingCycle}
          onBillingCycleChange={setBillingCycle}
        />
        
        {/* Plans Section with adjusted prices */}
        <PlansList 
          plans={adjustedPlans} 
          selectedPlan={selectedPlan} 
          onPlanChange={onPlanChange}
          billingCycle={billingCycle}
        />
        
        <div className="mt-6">
          {/* Add-Ons Section */}
          <AddOnsList
            addOns={addOns}
            selectedPlan={selectedPlan}
            activeAddOns={activeAddOns}
            onToggleAddOn={onToggleAddOn}
          />
        </div>
        
        <div className="mt-6">
          {/* Overage Handling Section */}
          <OverageHandling 
            selectedPlanName={selectedPlanName}
            overageHandling={overageHandling}
            onOverageHandlingChange={onOverageHandlingChange}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onSaveBillingPreferences}>
          Save Billing Preferences
        </Button>
      </CardFooter>
    </Card>
  );
};
