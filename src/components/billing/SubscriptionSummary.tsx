import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlanData, AddOnData, SubscriptionData } from "@/types/billing";
import { format, addDays, addYears } from "date-fns";

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
  isLoading: boolean;
  onSubmit?: () => void;
  billingCycle?: 'monthly' | 'annual';
  showSubmitButton?: boolean;
}

export function SubscriptionSummary({
  selectedPlan,
  plans,
  activeAddOns,
  addOns,
  costs,
  subscription,
  isLoading,
  onSubmit,
  billingCycle = 'monthly',
  showSubmitButton = false
}: SubscriptionSummaryProps) {
  const plan = plans.find(p => p.id === selectedPlan);

  const formatDisplayDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      console.error("Error formatting date:", error);
      return null;
    }
  };

  const calculateRenewalDate = () => {
    const today = new Date();
    
    if (billingCycle === 'monthly') {
      return format(addDays(today, 30), 'MMM d, yyyy');
    } else {
      return format(addYears(today, 1), 'MMM d, yyyy');
    }
  };

  const startDate = formatDisplayDate(subscription?.subscription_start_date || subscription?.contract_start_date);
  
  const renewalDate = subscription?.contract_end_date 
    ? formatDisplayDate(subscription.contract_end_date)
    : calculateRenewalDate();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Selected Plan</h3>
          <p>{plan?.name || "No plan selected"}</p>
        </div>
        
        {billingCycle === 'annual' && (
          <div className="bg-green-50 border border-green-200 p-3 rounded-md">
            <p className="text-sm text-green-800 font-medium">Annual Contract (20% Savings on Base Plan)</p>
            <p className="text-xs text-green-700 mt-1">
              12-month agreement with monthly billing
            </p>
          </div>
        )}
        
        <div className="py-3 border-t border-b">
          <div className="flex justify-between mb-2">
            <span className="text-sm">Base Plan</span>
            <span className="font-medium">{costs.basePrice}</span>
          </div>
          {activeAddOns.length > 0 && (
            <div className="flex justify-between">
              <span className="text-sm">Add-ons</span>
              <span className="font-medium">{costs.totalAddOns}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <span className="font-semibold">Monthly Total</span>
          <span className="font-semibold">{costs.total}</span>
        </div>
        
        <div className="pt-3 border-t">
          <h4 className="text-sm font-semibold mb-2">Subscription Details</h4>
          {startDate && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Started</span>
              <span>{startDate}</span>
            </div>
          )}
          {((billingCycle === 'annual' && !subscription) || subscription?.contract_end_date) && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Renews</span>
              <span>{renewalDate}</span>
            </div>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground">
          {subscription ? (
            <p>Your plan will renew automatically {billingCycle === 'monthly' ? 'each month' : 'each year'}.</p>
          ) : (
            <p>
              {billingCycle === 'monthly' 
                ? "Month-to-month billing with no long-term commitment. Cancel anytime." 
                : ""}
            </p>
          )}
        </div>
      </CardContent>
      
      {showSubmitButton && onSubmit && (
        <CardFooter>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={onSubmit}
          >
            {subscription ? "Update Subscription" : "Confirm Selection"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
