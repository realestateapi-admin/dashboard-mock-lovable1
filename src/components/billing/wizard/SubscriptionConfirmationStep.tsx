
import { PlanData, AddOnData } from "@/types/billing";
import { Card, CardContent } from "@/components/ui/card";
import { format, addMonths, differenceInDays, getDaysInMonth } from "date-fns";
import { Check, AlertCircle } from "lucide-react";

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

export function SubscriptionConfirmationStep({
  selectedPlan,
  plans,
  activeAddOns,
  addOns,
  overageHandling,
  costs,
  billingCycle,
  isLoading = false
}: SubscriptionConfirmationStepProps) {
  // Find the selected plan
  const plan = plans.find(p => p.id === selectedPlan);
  
  // Get the selected add-ons
  const selectedAddOns = activeAddOns
    .map(id => addOns.find(addon => addon.id === id))
    .filter(addon => addon !== undefined) as AddOnData[];
    
  // Format the overage handling for display
  const formatOverageHandling = (option: string | null): string => {
    switch(option) {
      case 'cut-off': return 'Cut off access at plan limit';
      case 'allow-25': return 'Allow 25% overage at standard unit rate';
      case 'allow-100': return 'Allow 100% overage at standard unit rate';
      case 'unlimited': return 'Always process requests regardless of usage';
      default: return 'Not specified';
    }
  };
  
  // Calculate the next billing date (1st of following month)
  const today = new Date();
  const firstOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const formattedNextBillingDate = format(firstOfNextMonth, 'MMMM 1, yyyy');
  
  // Calculate prorated amount
  const calculateProration = () => {
    if (selectedPlan === "enterprise") return "Custom pricing";
    
    // Extract numeric total from costs.total (removing $ and ,)
    const monthlyTotal = parseInt(costs.total.replace(/\$|,/g, ""));
    
    // Calculate days left in current month
    const daysInMonth = getDaysInMonth(today);
    const daysLeft = daysInMonth - today.getDate() + 1;
    
    // Calculate prorated amount
    const prorated = (monthlyTotal * daysLeft) / daysInMonth;
    
    // First bill will be prorated amount + next month's full amount
    const firstBillTotal = prorated + monthlyTotal;
    
    return `$${firstBillTotal.toFixed(2)}`;
  };
  
  const proratedEstimate = calculateProration();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-green-100 text-green-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold mt-4">Subscription Confirmed!</h2>
        <p className="text-muted-foreground mt-2">
          Thank you for subscribing. Your account has been set up successfully.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium text-lg mb-4">Plan Details</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Selected Plan</dt>
                <dd className="mt-1 text-base">{plan?.name || "No plan selected"}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Billing Cycle</dt>
                <dd className="mt-1 text-base">{billingCycle === 'annual' ? 'Annual (20% savings)' : 'Monthly'}</dd>
              </div>
              
              {selectedAddOns.length > 0 && (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Add-Ons</dt>
                  <dd className="mt-1">
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedAddOns.map(addon => (
                        <li key={addon.id} className="text-base">{addon.name}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Overage Handling</dt>
                <dd className="mt-1 text-base">{formatOverageHandling(overageHandling)}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium text-lg mb-4">Billing Details</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">First Billing Date</dt>
                <dd className="mt-1 text-base">{formattedNextBillingDate}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Monthly Subscription Fee</dt>
                <dd className="mt-1 text-base">{costs.total}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Estimated First Bill
                  <span className="ml-1 inline-flex items-center">
                    <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </span>
                </dt>
                <dd className="mt-1 text-base font-semibold">{proratedEstimate}</dd>
                <dd className="mt-1 text-xs text-muted-foreground">
                  Includes prorated charges for the remainder of {format(today, 'MMMM')} plus your first full month.
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 border-t pt-6">
        <p className="text-sm text-muted-foreground">
          A confirmation email with these details has been sent to your registered email address.
          You can access your subscription details and manage your account from your dashboard at any time.
        </p>
      </div>
    </div>
  );
}
