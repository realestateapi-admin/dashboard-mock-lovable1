
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanData, AddOnData } from "@/types/billing";
import { CheckIcon, AlertCircle } from "lucide-react";
import { format, addDays } from "date-fns";

interface SubscriptionConfirmationStepProps {
  selectedPlan: string;
  plans: PlanData[];
  activeAddOns: string[];
  addOns: AddOnData[];
  overageHandling: string | null;
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  billingCycle: 'monthly' | 'annual';
  isLoading?: boolean;
}

export const SubscriptionConfirmationStep = ({
  selectedPlan,
  plans,
  activeAddOns,
  addOns,
  overageHandling,
  costs,
  billingCycle,
  isLoading = false
}: SubscriptionConfirmationStepProps) => {
  const selectedPlanData = plans.find(p => p.id === selectedPlan);
  
  // Calculate trial end date (30 days from now)
  const trialEndDate = format(addDays(new Date(), 30), 'MMMM d, yyyy');
  
  // Format the overage handling text
  const formatOverageHandling = (option: string | null) => {
    if (!option) return "Not specified";
    
    switch (option) {
      case "stop":
        return "Stop processing (prevent overage charges)";
      case "notify":
        return "Notify but continue processing";
      case "continue":
        return "Continue processing without notification";
      default:
        return option;
    }
  };
  
  // Filter add-ons by category for better organization
  const getAddOnsByCategory = () => {
    const selectedAddOns = activeAddOns
      .map(id => addOns.find(addon => addon.id === id))
      .filter(addon => addon !== undefined) as AddOnData[];
    
    const categories: Record<string, AddOnData[]> = {};
    
    selectedAddOns.forEach(addon => {
      const category = addon.category || 'Other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(addon);
    });
    
    return categories;
  };
  
  const addOnsByCategory = getAddOnsByCategory();
  
  // Check if an add-on requires approval (specifically MLS Data Access)
  const doesAddOnRequireApproval = (addon: AddOnData): boolean => {
    return addon.requiresApproval === true || addon.id === 'mls-data';
  };
  
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Subscription Confirmed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 rounded-md p-4 text-sm text-green-800 dark:text-green-300 mb-4">
          <p className="font-medium">
            Your subscription has been successfully activated. Thank you for choosing our service!
          </p>
        </div>
      
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Plan Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Selected Plan</span>
                <span className="font-medium">{selectedPlanData?.name || "Not selected"}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Billing Cycle</span>
                <span className="font-medium capitalize">{billingCycle}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base Price</span>
                <span className="font-medium">{costs.basePrice}/month</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">First Bill Date</span>
                <span className="font-medium">{trialEndDate}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Records Included</span>
                <span className="font-medium">{selectedPlanData?.records || "N/A"}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overage Handling</span>
                <span className="font-medium">{formatOverageHandling(overageHandling)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">First Charge</span>
                <span className="font-medium">{costs.total}</span>
              </div>
              
              <div className="text-xs text-muted-foreground italic">
                Your first charge may include applicable proration based on your billing cycle start date.
              </div>
            </div>
          </div>
        </div>
        
        {Object.keys(addOnsByCategory).length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Selected Add-ons</h3>
            
            <div className="space-y-4">
              {Object.entries(addOnsByCategory).map(([category, addons]) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium">{category}</h4>
                  <div className="bg-muted/50 rounded-md p-4 space-y-2">
                    {addons.map(addon => (
                      <div key={addon.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckIcon className="h-4 w-4 text-primary" />
                          <span>{addon.name}</span>
                          
                          {doesAddOnRequireApproval(addon) && (
                            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              Pending Approval
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          {addon.prices[selectedPlan]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="pt-3 border-t flex justify-between items-center text-primary font-medium">
          <span>Monthly Total</span>
          <span>{costs.total}</span>
        </div>
      </CardContent>
    </Card>
  );
};
