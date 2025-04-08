
import { PlanData, AddOnData, SubscriptionData } from "@/types/billing";
import { formatDistanceToNow } from "date-fns";

interface PlanSummaryProps {
  selectedPlan: string;
  selectedAddOns: string[];
  plans: PlanData[];
  addOns: AddOnData[];
  subscription?: SubscriptionData | null;
  billingCycle?: 'monthly' | 'annual';
}

export const PlanSummary = ({ 
  selectedPlan, 
  selectedAddOns,
  plans,
  addOns,
  subscription,
  billingCycle = 'monthly'
}: PlanSummaryProps) => {
  const currentPlan = plans.find(p => p.id === selectedPlan);
  
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  // Calculate the estimated monthly payment (base plan + fixed add-ons)
  const calculateEstimatedPayment = () => {
    if (!currentPlan) return { total: 0, fixedAddOns: 0, hasMeteredAddOns: false };
    
    // Parse the base plan price (removing $ and commas)
    const basePlanPrice = parseInt(currentPlan.price.replace(/\$|,/g, ""));
    
    let fixedAddOnsTotal = 0;
    let hasMeteredAddOns = false;
    
    // Calculate costs for selected add-ons
    selectedAddOns.forEach(addonId => {
      const addon = addOns.find(a => a.id === addonId);
      if (!addon) return;
      
      const priceString = addon.prices[selectedPlan as keyof typeof addon.prices];
      
      // Check if this is a metered add-on
      if (addon.billingType === 'metered') {
        hasMeteredAddOns = true;
        return; // Don't add metered add-ons to the total
      }
      
      // Skip if it's included in the plan
      if (priceString === "Included") return;
      
      // Parse the price - handle different formats like "$250", "$250/month"
      const numericPrice = parseInt(priceString.replace(/\$|,|\/month/g, ""));
      if (!isNaN(numericPrice)) {
        fixedAddOnsTotal += numericPrice;
      }
    });
    
    // Apply 20% discount for annual billing
    let total = basePlanPrice + fixedAddOnsTotal;
    if (billingCycle === 'annual') {
      total = total * 0.8; // 20% discount
    }
    
    return { 
      total,
      fixedAddOns: fixedAddOnsTotal,
      hasMeteredAddOns
    };
  };
  
  const payment = calculateEstimatedPayment();
  
  // Format price string to consistently show "/month"
  const formatPriceString = (priceString: string): string => {
    if (priceString === "Included") return priceString;
    
    // If it's a metered add-on with price per item
    if (priceString.includes("each")) return priceString;
    
    // If it already has "/month", return as is
    if (priceString.includes("/month")) return priceString;
    
    // Otherwise add "/month"
    return `${priceString}/month`;
  };
  
  return (
    <div className="space-y-4 pb-6">
      {subscription ? (
        <>
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-medium">Plan</span>
            <span>{subscription.plan_name}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-medium">Base Price</span>
            <div className="flex gap-1 items-baseline">
              <span>{formatCurrency(subscription.minimum_bill_amount)}</span>
              <span className="text-xs text-muted-foreground">
                per month
              </span>
            </div>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-medium">Records</span>
            <span>{subscription.usage_amount.toLocaleString()}</span>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-medium">Plan</span>
            <span>{currentPlan?.name}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-medium">Base Price</span>
            <div className="flex gap-1 items-baseline">
              <span>{formatPriceString(currentPlan?.price || '')}</span>
              {billingCycle === 'annual' && (
                <span className="text-xs text-blue-600 ml-1">(annual billing)</span>
              )}
            </div>
          </div>
        </>
      )}
      
      {selectedAddOns.length > 0 && (
        <>
          <div className="h-px bg-border my-2"></div>
          <div className="font-medium">Selected Add-ons:</div>
          {selectedAddOns.map(addonId => {
            const addon = addOns.find(a => a.id === addonId);
            if (!addon) return null;
            
            const priceString = addon.prices[selectedPlan as keyof typeof addon.prices];
            const isMetered = addon.billingType === 'metered';
            
            return (
              <div key={addonId} className="flex justify-between items-baseline pl-4">
                <span className="text-sm">{addon.name}</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm">{formatPriceString(priceString)}</span>
                  {isMetered && (
                    <span className="text-xs text-muted-foreground italic">
                      (usage-based)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          
          {payment.fixedAddOns > 0 && (
            <div className="flex justify-between items-baseline pt-2">
              <span className="text-sm font-medium pl-4">Add-ons Subtotal</span>
              <span>${payment.fixedAddOns.toLocaleString()}/month</span>
            </div>
          )}
        </>
      )}
      
      <div className="h-px bg-border my-2" />
      
      <div className="flex justify-between items-baseline text-primary font-medium">
        <span>Estimated Monthly Payment</span>
        <span>${payment.total.toLocaleString()}/month</span>
      </div>
      
      {billingCycle === 'annual' && (
        <div className="text-xs text-blue-600">
          Annual billing (discount applied)
        </div>
      )}
      
      {payment.hasMeteredAddOns && (
        <div className="text-xs text-muted-foreground italic">
          *Plus usage-based charges for metered services
        </div>
      )}
    </div>
  );
};
