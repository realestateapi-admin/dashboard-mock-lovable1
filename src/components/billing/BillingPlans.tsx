
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanData, AddOnData } from "@/types/billing";
import { annualPlanPrices } from "@/data/billingData";
import { BillingCycleSection } from "./sections/BillingCycleSection";
import { PlansSection } from "./sections/PlansSection";
import { AddOnSection } from "./sections/AddOnSection";
import { OverageSection } from "./sections/OverageSection";

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
        {/* Billing Cycle Section */}
        <BillingCycleSection 
          billingCycle={billingCycle}
          onBillingCycleChange={onBillingCycleChange}
        />
        
        {/* Plans Section */}
        <PlansSection 
          plans={adjustedPlans} 
          selectedPlan={selectedPlan} 
          onPlanChange={onPlanChange}
          billingCycle={billingCycle}
        />
        
        {/* Add-Ons Section */}
        <AddOnSection
          addOns={addOns}
          selectedPlan={selectedPlan}
          activeAddOns={activeAddOns}
          onToggleAddOn={onToggleAddOn}
        />
        
        {/* Overage Handling Section */}
        <OverageSection 
          selectedPlanName={selectedPlanName}
          overageHandling={overageHandling}
          onOverageHandlingChange={onOverageHandlingChange}
        />
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onSaveBillingPreferences}>
          Save Billing Preferences
        </Button>
      </CardFooter>
    </Card>
  );
};
