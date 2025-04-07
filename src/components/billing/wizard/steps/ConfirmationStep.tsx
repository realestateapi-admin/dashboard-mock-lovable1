
import { PlanData, AddOnData } from "@/types/billing";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";

interface ConfirmationStepProps {
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

export const ConfirmationStep = ({
  selectedPlan,
  plans,
  activeAddOns,
  addOns,
  overageHandling,
  costs,
  billingCycle,
  isLoading
}: ConfirmationStepProps) => {
  const selectedPlanName = plans.find(p => p.id === selectedPlan)?.name || 'Selected';
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }
  
  // Get the selected add-ons details
  const selectedAddOns = activeAddOns
    .map(id => addOns.find(addon => addon.id === id))
    .filter(addon => addon !== undefined) as AddOnData[];
  
  // Get the selected plan details
  const plan = plans.find(p => p.id === selectedPlan);
  
  // Format the overage handling text
  const getOverageHandlingText = () => {
    switch (overageHandling) {
      case 'cut-off':
        return 'Cut off access at plan limit';
      case 'allow-25':
        return 'Allow 25% overage billed at the plan\'s unit rate';
      case 'allow-100':
        return 'Allow 100% overage billed at the plan\'s unit rate';
      case 'unlimited':
        return 'No limit on overages (mission critical)';
      default:
        return 'Not specified';
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-1">Review Your Subscription</h3>
        <p className="text-sm text-muted-foreground">
          Please confirm your subscription details before finalizing
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="border rounded-lg bg-gray-50 p-6">
            <h4 className="font-medium mb-4">Subscription Details</h4>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Plan</span>
                <span className="font-medium">{selectedPlanName}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Billing Cycle</span>
                <span className="font-medium">
                  {billingCycle === 'monthly' ? 'Monthly' : 'Annual (paid monthly)'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">API Record Allocation</span>
                <span className="font-medium">{plan?.records} records/month</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Overage Handling</span>
                <span className="font-medium">{getOverageHandlingText()}</span>
              </div>
            </div>
          </div>
          
          {selectedAddOns.length > 0 && (
            <div className="border rounded-lg bg-gray-50 p-6">
              <h4 className="font-medium mb-4">Selected Add-Ons</h4>
              
              <div className="space-y-3">
                {selectedAddOns.map(addon => (
                  <div key={addon.id} className="flex justify-between">
                    <span className="text-sm">{addon.name}</span>
                    <span className="font-medium">{addon.prices[selectedPlan]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {plan && (
            <div className="border rounded-lg bg-gray-50 p-6">
              <h4 className="font-medium mb-4">Included Features</h4>
              
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="border rounded-lg bg-white p-6 shadow-sm">
          <h4 className="font-medium mb-4">Payment Summary</h4>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Base Plan</span>
              <span>{costs.basePrice}/month</span>
            </div>
            
            {activeAddOns.length > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Add-Ons</span>
                <span>{costs.totalAddOns}/month</span>
              </div>
            )}
            
            <div className="pt-4 border-t">
              <div className="flex justify-between font-medium">
                <span>Monthly Total</span>
                <span>{costs.total}</span>
              </div>
              
              <div className="mt-2 text-xs text-muted-foreground">
                {billingCycle === 'annual' ? (
                  <p>12-month commitment, billed monthly</p>
                ) : (
                  <p>Month-to-month, no long-term commitment</p>
                )}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <h5 className="font-medium mb-2">Next Steps</h5>
              <ul className="text-sm space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Your subscription will start immediately</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>You'll receive an email confirmation with your invoice</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>You'll have immediate access to all features included in your plan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
