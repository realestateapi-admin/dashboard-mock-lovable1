
import { PlanData, AddOnData } from "@/types/billing";
import { SubscriptionSummary } from "@/components/billing/SubscriptionSummary";

interface ReviewStepProps {
  selectedPlan: string;
  plans: PlanData[];
  activeAddOns: string[];
  addOns: AddOnData[];
  overageHandling: string;
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  billingCycle: 'monthly' | 'annual';
  isLoading: boolean;
}

export const ReviewStep = ({
  selectedPlan,
  plans,
  activeAddOns,
  addOns,
  overageHandling,
  costs,
  billingCycle,
  isLoading
}: ReviewStepProps) => {
  const selectedPlanName = plans.find(p => p.id === selectedPlan)?.name || 'Selected';
  
  return (
    <div className="grid gap-6 md:grid-cols-12">
      <div className="md:col-span-8">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Review Your Subscription Changes</h3>
          
          <div className="space-y-6 p-6 border rounded-lg bg-gray-50">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Selected Plan</p>
              <p className="font-medium">{selectedPlanName} ({billingCycle === 'monthly' ? 'Monthly' : 'Annual'})</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Add-Ons</p>
              {activeAddOns.length > 0 ? (
                <ul className="space-y-1">
                  {activeAddOns.map(addonId => {
                    const addon = addOns.find(a => a.id === addonId);
                    return (
                      <li key={addonId} className="font-medium">
                        {addon?.name}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm">No add-ons selected</p>
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Overage Handling</p>
              <p className="font-medium">
                {overageHandling === 'cut-off' && 'Cut off access at plan limit'}
                {overageHandling === 'allow-25' && 'Allow 25% overage billed at the plan\'s unit rate'}
                {overageHandling === 'allow-100' && 'Allow 100% overage billed at the plan\'s unit rate'}
                {overageHandling === 'unlimited' && 'No limit on overages (mission critical)'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-4">
        <SubscriptionSummary 
          selectedPlan={selectedPlan}
          plans={plans}
          activeAddOns={activeAddOns}
          addOns={addOns}
          costs={costs}
          subscription={null}
          isLoading={isLoading}
          onSubmit={() => {}}
          billingCycle={billingCycle}
          showSubmitButton={false}
        />
      </div>
    </div>
  );
};
