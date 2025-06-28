import { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, CheckIcon, Lock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

interface BillingCycleSelectorProps {
  billingCycle: 'monthly' | 'annual';
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
}

export const BillingCycleSelector = ({
  billingCycle,
  onBillingCycleChange
}: BillingCycleSelectorProps) => {
  const { isOnPaidPlan } = useTrialAlert();
  
  // Initialize from localStorage if needed
  useEffect(() => {
    const storedCycle = localStorage.getItem('billingCycle');
    if (storedCycle === 'annual' || storedCycle === 'monthly') {
      if (storedCycle !== billingCycle) {
        onBillingCycleChange(storedCycle as 'monthly' | 'annual');
      }
    }
  }, []);

  // Update localStorage when billing cycle changes
  const handleBillingCycleChange = (cycle: 'monthly' | 'annual') => {
    // Only apply switching restrictions if user is on a paid plan
    // If user is on annual plan and on a paid subscription, don't allow switching to monthly
    if (isOnPaidPlan && billingCycle === 'annual' && cycle === 'monthly') {
      return;
    }
    
    onBillingCycleChange(cycle);
    localStorage.setItem('billingCycle', cycle);
  };

  // Only show restrictions if user is on a paid plan
  const isMonthlyDisabled = isOnPaidPlan && billingCycle === 'annual';
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monthly Option */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className={`border-2 rounded-lg p-6 transition-all ${
                  billingCycle === 'monthly' 
                    ? 'border-primary ring-2 ring-primary ring-offset-2' 
                    : 'border-border hover:border-primary/50'
                } ${isMonthlyDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => !isMonthlyDisabled && handleBillingCycleChange('monthly')}
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-xl font-semibold">Monthly Flexibility</h4>
                  {billingCycle === 'monthly' ? (
                    <CheckIcon className="h-5 w-5 text-primary" />
                  ) : isMonthlyDisabled ? (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  ) : null}
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
            </TooltipTrigger>
            {isMonthlyDisabled && (
              <TooltipContent>
                <p className="w-64 text-sm">
                  You can't switch back to monthly billing when on an annual plan. Annual plans require a 12-month commitment.
                </p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        
        {/* Annual Option */}
        <div 
          className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
            billingCycle === 'annual' 
              ? 'border-primary ring-2 ring-primary ring-offset-2' 
              : 'border-border hover:border-primary/50'
          }`}
          onClick={() => handleBillingCycleChange('annual')}
        >
          <div className="flex justify-between items-start">
            <h4 className="text-xl font-semibold">Annual Value</h4>
            {billingCycle === 'annual' && (
              <CheckIcon className="h-5 w-5 text-primary" />
            )}
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center">
              <span>12 month agreement</span>
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
