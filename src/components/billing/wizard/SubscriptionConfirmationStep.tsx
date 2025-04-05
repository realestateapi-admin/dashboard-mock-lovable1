
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanData, AddOnData } from "@/types/billing";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
  isLoading: boolean;
  paymentMethodType?: 'card' | 'ach';
}

export const SubscriptionConfirmationStep = ({
  selectedPlan,
  plans,
  activeAddOns,
  addOns,
  overageHandling,
  costs,
  billingCycle,
  isLoading,
  paymentMethodType = 'card' // Default to card
}: SubscriptionConfirmationStepProps) => {
  const selectedPlanData = plans.find(p => p.id === selectedPlan);
  
  // Parse the total amount from the costs.total string (remove $ and commas)
  const totalAmount = parseFloat(costs.total.replace(/[$,]/g, ''));
  
  // Calculate transaction fee if using credit card
  const transactionFeeRate = 0.03; // 3%
  const transactionFee = paymentMethodType === 'card' ? totalAmount * transactionFeeRate : 0;
  const totalWithFee = totalAmount + transactionFee;
  
  // Format as currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription Confirmation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Confirmation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-3 bg-green-50 text-green-700 p-4 rounded-md border border-green-100">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
          <div>
            <p className="font-medium">Your subscription has been successfully set up!</p>
            <p className="text-sm mt-1">You will be billed {billingCycle === 'annual' ? 'monthly with a 12-month commitment' : 'monthly with no long-term commitment'}.</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Subscription Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Selected Plan</p>
              <p className="font-medium">{selectedPlanData?.name}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Billing Cycle</p>
              <p className="font-medium">{billingCycle === 'annual' ? 'Annual (12-month commitment)' : 'Monthly'}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Overage Handling</p>
              <p className="font-medium capitalize">{overageHandling || 'Not specified'}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-medium">{paymentMethodType === 'card' ? 'Credit Card' : 'Bank Account (ACH)'}</p>
            </div>
          </div>
          
          {activeAddOns.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Selected Add-ons</p>
              <ul className="space-y-1">
                {activeAddOns.map(addOnId => {
                  const addOn = addOns.find(a => a.id === addOnId);
                  return addOn ? (
                    <li key={addOnId} className="text-sm">{addOn.name}</li>
                  ) : null;
                })}
              </ul>
            </div>
          )}
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Base Plan:</span>
              <span>{costs.basePrice}</span>
            </div>
            
            {Number(costs.totalAddOns.replace(/[$,]/g, '')) > 0 && (
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Add-ons:</span>
                <span>{costs.totalAddOns}</span>
              </div>
            )}
            
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>{costs.total}</span>
            </div>
            
            {paymentMethodType === 'card' && (
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Transaction Fee (3%):</span>
                <span>{formatCurrency(transactionFee)}</span>
              </div>
            )}
            
            <div className="flex justify-between py-2 font-medium border-t mt-1">
              <span>Total Monthly Payment:</span>
              <span>{formatCurrency(totalWithFee)}</span>
            </div>
          </div>
          
          {paymentMethodType === 'card' && (
            <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-100">
              A 3% transaction fee applies to all credit card payments. Switch to ACH (bank account) payments to avoid this fee.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
