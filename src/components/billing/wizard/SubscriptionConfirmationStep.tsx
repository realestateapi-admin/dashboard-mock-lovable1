import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanData, AddOnData } from "@/types/billing";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format, addMonths, differenceInMonths } from "date-fns";

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
  
  const totalAmount = parseFloat(costs.total.replace(/[$,]/g, ''));
  
  const transactionFeeRate = 0.03; // 3%
  const transactionFee = paymentMethodType === 'card' ? totalAmount * transactionFeeRate : 0;
  const totalWithFee = totalAmount + transactionFee;
  
  const today = new Date();
  const nextMonth = addMonths(today, 1);
  const firstPaymentDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);
  
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const remainingDays = daysInMonth - today.getDate();
  const proratedAmount = (totalWithFee / daysInMonth) * remainingDays;
  
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };
  
  const calculateEarlyTerminationFee = () => {
    if (billingCycle !== 'annual') return null;
    
    const contractStartDate = new Date(new Date().setMonth(new Date().getMonth() - 3));
    const contractEndDate = new Date(contractStartDate);
    contractEndDate.setFullYear(contractEndDate.getFullYear() + 1);
    
    const remainingMonths = Math.ceil(differenceInMonths(contractEndDate, today));
    const totalMonthsInContract = 12;
    const monthsCompleted = totalMonthsInContract - remainingMonths;
    
    const monthlyAmount = parseFloat(costs.total.replace(/[$,]/g, ''));
    const remainingContractValue = monthlyAmount * remainingMonths;
    const earlyTerminationFee = remainingContractValue * 0.5;
    
    return {
      contractStartDate,
      contractEndDate,
      remainingMonths,
      monthsCompleted,
      earlyTerminationFee: formatCurrency(earlyTerminationFee),
      remainingContractValue: formatCurrency(remainingContractValue)
    };
  };
  
  const earlyTerminationInfo = calculateEarlyTerminationFee();
  
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
            <p className="text-sm mt-1">You will be billed {billingCycle === 'annual' ? 'annually' : 'monthly'}{billingCycle === 'annual' ? ' with a discount for annual payment' : ''}.</p>
          </div>
        </div>
        
        {billingCycle === 'annual' && earlyTerminationInfo && (
          <div className="flex items-start gap-3 bg-amber-50 text-amber-700 p-4 rounded-md border border-amber-100">
            <AlertCircle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Annual Contract Early Termination Fee</p>
              <p className="text-sm mt-1">
                Your current annual contract started on {format(earlyTerminationInfo.contractStartDate, 'MMMM d, yyyy')} 
                and ends on {format(earlyTerminationInfo.contractEndDate, 'MMMM d, yyyy')}.
              </p>
              <p className="text-sm mt-2">
                You've completed {earlyTerminationInfo.monthsCompleted} month{earlyTerminationInfo.monthsCompleted !== 1 ? 's' : ''} of your 12-month contract 
                with {earlyTerminationInfo.remainingMonths} month{earlyTerminationInfo.remainingMonths !== 1 ? 's' : ''} remaining.
              </p>
              <div className="mt-3 pt-2 border-t border-amber-200">
                <div className="flex justify-between text-sm">
                  <span>Remaining contract value:</span>
                  <span>{earlyTerminationInfo.remainingContractValue}</span>
                </div>
                <div className="flex justify-between font-medium mt-1">
                  <span>Early termination fee (50%):</span>
                  <span>{earlyTerminationInfo.earlyTerminationFee}</span>
                </div>
              </div>
              <p className="text-xs mt-2 italic">
                This fee will be charged if you cancel your annual plan before the contract end date.
              </p>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Subscription Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Selected Plan</p>
              <p className="font-medium">{selectedPlanData?.name}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Billing Cycle</p>
              <p className="font-medium">{billingCycle === 'annual' ? 'Annual' : 'Monthly'}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">First Payment Date</p>
              <p className="font-medium">{format(firstPaymentDate, 'MMMM 1, yyyy')}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Overage Handling</p>
              <p className="font-medium capitalize">{overageHandling || 'Not specified'}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-medium">{paymentMethodType === 'card' ? 'Credit Card' : 'Bank Account (ACH)'}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Contract Term</p>
              <p className="font-medium">{billingCycle === 'annual' ? '12 months' : '1 month (auto-renewal)'}</p>
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
              <span>Total {billingCycle === 'annual' ? 'Annual' : 'Monthly'} Payment:</span>
              <span>{formatCurrency(totalWithFee)}</span>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
              <h4 className="text-sm font-medium text-blue-800">Your first payment</h4>
              <div className="flex justify-between py-1 text-sm text-blue-700">
                <span>Prorated amount for current {billingCycle === 'annual' ? 'year' : 'month'} ({remainingDays} days):</span>
                <span>{formatCurrency(proratedAmount)}</span>
              </div>
              <div className="text-xs text-blue-600 mt-1">
                Your first payment on {format(today, 'MMMM d, yyyy')} will be prorated. Full billing begins on {format(firstPaymentDate, 'MMMM 1, yyyy')}.
              </div>
            </div>
          </div>
          
          {paymentMethodType === 'card' && (
            <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-100 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>A 3% transaction fee applies to all credit card payments. Switch to ACH (bank account) payments to avoid this fee.</span>
            </div>
          )}
          
          <div className="mt-2 border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Service Level Agreement</h4>
            <div className="text-sm space-y-2">
              <p>• 99.9% uptime guarantee for API services</p>
              <p>• 24-hour response time for support tickets</p>
              <p>• Unlimited access to knowledge base and documentation</p>
              {selectedPlanData?.id === 'growth' && (
                <p>• Priority support queue access</p>
              )}
              {selectedPlanData?.id === 'enterprise' && (
                <>
                  <p>• Dedicated account manager</p>
                  <p>• Custom integration support</p>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-2 border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Next Steps</h4>
            <div className="text-sm space-y-2">
              <p>1. Check your email for confirmation details</p>
              <p>2. Set up your team members in dashboard settings</p>
              <p>3. Generate API keys to begin integration</p>
              <p>4. Access documentation for implementation guides</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
