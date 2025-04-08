
import React from "react";
import { format } from "date-fns";
import { PlanData, AddOnData } from "@/types/billing";

interface SubscriptionDetailsProps {
  selectedPlanData?: PlanData;
  billingCycle: 'monthly' | 'annual';
  financialInfo: {
    firstPaymentDate: Date;
  };
  overageHandling: string | null;
  paymentMethodType: 'card' | 'ach';
  activeAddOns: string[];
  addOns: AddOnData[];
}

export const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  selectedPlanData,
  billingCycle,
  financialInfo,
  overageHandling,
  paymentMethodType,
  activeAddOns,
  addOns
}) => {
  return (
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
          <p className="font-medium">{format(financialInfo.firstPaymentDate, 'MMMM 1, yyyy')}</p>
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
    </div>
  );
};
