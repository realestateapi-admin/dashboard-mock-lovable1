import React from "react";
import { format, addYears } from "date-fns";
import { Button } from "@/components/ui/button";
import { SubscriptionData } from "@/types/billing";

interface BillingDetailsProps {
  billingCycle: 'monthly' | 'annual';
  overageHandling: string;
  subscription: SubscriptionData | null;
  onManageSubscription: () => void;
}

const formatOverageHandling = (value: string): string => {
  switch (value) {
    case 'cut-off':
      return 'Stop API calls when plan limit is reached';
    case 'allow-25':
      return 'Allow 25% overage billed at plan\'s unit rate';
    case 'allow-100':
      return 'Allow 100% overage billed at plan\'s unit rate';
    case 'unlimited':
      return 'Never cut off API key (mission critical)';
    default:
      return 'Not specified';
  }
};

export const BillingDetails = ({
  billingCycle,
  overageHandling,
  subscription,
  onManageSubscription
}: BillingDetailsProps) => {
  // Calculate renewal date based on subscription start date or current date
  
  const calculateRenewalDate = () => {
    // If we have subscription data with a contract end date, use that
    if (subscription?.contract_end_date) {
      try {
        return format(new Date(subscription.contract_end_date), 'MMM d, yyyy');
      } catch (e) {
        console.error("Error formatting contract end date:", e);
      }
    }
    
    // If we have a subscription start date, calculate renewal as 1 year from start
    if (subscription?.subscription_start_date || subscription?.contract_start_date) {
      try {
        const startDate = new Date(
          subscription.subscription_start_date || 
          subscription.contract_start_date || 
          new Date()
        );
        return format(addYears(startDate, 1), 'MMM d, yyyy');
      } catch (e) {
        console.error("Error calculating renewal date:", e);
      }
    }
    
    // Fallback to 1 year from today
    return format(addYears(new Date(), 1), 'MMM d, yyyy');
  };
  
  const renewalDate = billingCycle === 'annual' ? calculateRenewalDate() : null;
  
  return (
    <div>
      <h4 className="font-medium mb-1">Billing Cycle:</h4>
      <p className="text-muted-foreground mb-3">
        {billingCycle === 'monthly' 
          ? 'Monthly flexibility - Pay month to month with no long-term commitment' 
          : 'Annual contract - Discounted pricing with a 12-month agreement'}
      </p>
      
      {billingCycle === 'annual' && renewalDate && (
        <div className="mb-3">
          <h4 className="font-medium mb-1">Renewal Date:</h4>
          <p className="text-muted-foreground">{renewalDate}</p>
        </div>
      )}
      
      <h4 className="font-medium mb-1">Overage Handling:</h4>
      <p className="text-muted-foreground mb-6">{formatOverageHandling(overageHandling)}</p>
      
      <Button 
        onClick={onManageSubscription} 
        className="w-full"
      >
        Manage Your Subscription
      </Button>
    </div>
  );
};
