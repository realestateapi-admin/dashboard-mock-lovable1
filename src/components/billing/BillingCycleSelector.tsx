
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, CheckIcon } from "lucide-react";

interface BillingCycleSelectorProps {
  billingCycle: 'monthly' | 'annual';
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
}

export const BillingCycleSelector = ({
  billingCycle,
  onBillingCycleChange
}: BillingCycleSelectorProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">What Works Best For You?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monthly Option */}
        <div 
          className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
            billingCycle === 'monthly' 
              ? 'border-primary ring-2 ring-primary ring-offset-2' 
              : 'border-border hover:border-primary/50'
          }`}
          onClick={() => onBillingCycleChange('monthly')}
        >
          <div className="flex justify-between items-start">
            <h4 className="text-xl font-semibold">Monthly Flexibility</h4>
            {billingCycle === 'monthly' && (
              <CheckIcon className="h-5 w-5 text-primary" />
            )}
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center">
              <span>Pay month-to-month</span>
            </li>
            <li className="flex items-center">
              <span>Cancel anytime</span>
            </li>
            <li className="flex items-center">
              <span>No long-term commitment</span>
            </li>
          </ul>
          <div className="mt-4 text-center text-sm font-medium">
            Standard Price
          </div>
        </div>
        
        {/* Annual Option */}
        <div 
          className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
            billingCycle === 'annual' 
              ? 'border-primary ring-2 ring-primary ring-offset-2' 
              : 'border-border hover:border-primary/50'
          }`}
          onClick={() => onBillingCycleChange('annual')}
        >
          <div className="flex justify-between items-start">
            <h4 className="text-xl font-semibold">Annual Value</h4>
            {billingCycle === 'annual' && (
              <CheckIcon className="h-5 w-5 text-primary" />
            )}
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center">
              <span>Lock in today's pricing with 12 month agreement</span>
            </li>
            <li className="flex items-center">
              <span>Discount on all plans</span>
            </li>
            <li className="flex items-center">
              <span>Still pay monthly</span>
            </li>
          </ul>
          <div className="mt-4 text-center font-medium text-green-600">
            AVERAGE SAVINGS: 20%
          </div>
        </div>
      </div>
    </div>
  );
};
