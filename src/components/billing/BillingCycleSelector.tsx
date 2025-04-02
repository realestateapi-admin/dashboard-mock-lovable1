
import React from 'react';
import { CheckCircle2 } from "lucide-react";

interface BillingCycleSelectorProps {
  billingCycle: 'monthly' | 'annual';
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
}

export const BillingCycleSelector = ({
  billingCycle,
  onBillingCycleChange
}: BillingCycleSelectorProps) => {
  return (
    <div className="mb-6">
      <div className="text-xl font-semibold mb-3">Choose Your Billing Option</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monthly Option */}
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-primary ${
            billingCycle === 'monthly' 
              ? 'border-primary bg-primary/5 ring-2 ring-primary ring-offset-2'
              : 'border-border'
          }`}
          onClick={() => onBillingCycleChange('monthly')}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg">Monthly Flexibility</h3>
            <div className={billingCycle === 'monthly' ? "text-primary" : "text-muted-foreground"}>
              <CheckCircle2 className={`h-5 w-5 ${billingCycle === 'monthly' ? "opacity-100" : "opacity-0"}`} />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-start gap-2">
              <div className="bg-primary/10 rounded-full h-2 w-2 mt-1.5" />
              <span className="text-sm">Pay month-to-month</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-primary/10 rounded-full h-2 w-2 mt-1.5" />
              <span className="text-sm">Cancel anytime</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-primary/10 rounded-full h-2 w-2 mt-1.5" />
              <span className="text-sm">No long-term commitment</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t">
            <p className="text-center font-medium">Standard Price</p>
          </div>
        </div>
        
        {/* Annual Option */}
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-primary ${
            billingCycle === 'annual' 
              ? 'border-primary bg-primary/5 ring-2 ring-primary ring-offset-2'
              : 'border-border'
          }`}
          onClick={() => onBillingCycleChange('annual')}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg">Annual Value</h3>
            <div className={billingCycle === 'annual' ? "text-primary" : "text-muted-foreground"}>
              <CheckCircle2 className={`h-5 w-5 ${billingCycle === 'annual' ? "opacity-100" : "opacity-0"}`} />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-start gap-2">
              <div className="bg-primary/10 rounded-full h-2 w-2 mt-1.5" />
              <span className="text-sm">12-month agreement</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-primary/10 rounded-full h-2 w-2 mt-1.5" />
              <span className="text-sm"><span className="font-medium">20% discount</span> on all plans</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-primary/10 rounded-full h-2 w-2 mt-1.5" />
              <span className="text-sm">Still pay monthly</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t">
            <p className="text-center text-green-600 font-medium">SAVE 20% MONTHLY</p>
          </div>
        </div>
      </div>
    </div>
  );
};
