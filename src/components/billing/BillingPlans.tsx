
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanData, AddOnData } from "@/types/billing";
import { PlansList } from "./PlansList";
import { AddOnsList } from "./AddOnsList";
import { OverageHandling } from "./OverageHandling";
import { BillingCycleSelector } from "./BillingCycleSelector";
import { annualPlanPrices } from "@/data/billingData";

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
  billingCycle: 'monthly' | 'annual';
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
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
  onSaveBillingPreferences,
  billingCycle,
  onBillingCycleChange
}: BillingPlansProps) => {
  // Get the selected plan's name for displaying in overage options
  const selectedPlanName = plans.find(p => p.id === selectedPlan)?.name || "selected plan";
  
  // Apply annual pricing to plans when annual billing is selected
  const adjustedPlans = plans.map(plan => {
    if (billingCycle === 'annual' && plan.price !== 'Custom' && annualPlanPrices[plan.id as keyof typeof annualPlanPrices]) {
      return {
        ...plan,
        price: annualPlanPrices[plan.id as keyof typeof annualPlanPrices],
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
      <CardContent className="space-y-6">
        {/* Billing Cycle Selector with heading */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Choose Your Billing Option</h3>
          <BillingCycleSelector 
            billingCycle={billingCycle}
            onBillingCycleChange={onBillingCycleChange}
          />
        </div>
        
        {/* Plans Section with adjusted prices */}
        <PlansList 
          plans={adjustedPlans} 
          selectedPlan={selectedPlan} 
          onPlanChange={onPlanChange}
          billingCycle={billingCycle}
        />
        
        <div className="mt-8">
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
