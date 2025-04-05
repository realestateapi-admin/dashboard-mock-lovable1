
import React from 'react';
import { format, addMonths, endOfMonth } from 'date-fns';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CancellationSummaryProps {
  isAnnual: boolean;
  planName: string;
  onGoBack: () => void;
  onComplete: () => void;
}

export const CancellationSummary = ({
  isAnnual,
  planName,
  onGoBack,
  onComplete,
}: CancellationSummaryProps) => {
  // Helper functions for date calculation
  const getCurrentDate = () => new Date();
  
  const getEndOfCurrentMonth = () => {
    const today = getCurrentDate();
    return endOfMonth(today);
  };

  const getContractEndDate = () => {
    const today = getCurrentDate();
    return addMonths(today, 12);
  };

  const formatDisplayDate = (date: Date) => {
    return format(date, 'MMMM d, yyyy');
  };

  const calculateRemainingMonths = () => {
    const today = getCurrentDate();
    const endDate = getContractEndDate();
    
    // Calculate the difference in months
    let months = (endDate.getFullYear() - today.getFullYear()) * 12;
    months -= today.getMonth();
    months += endDate.getMonth();
    
    // If we're past the day of the month of the end date, subtract a month
    if (today.getDate() > endDate.getDate()) {
      months--;
    }
    
    return months > 0 ? months : 0;
  };

  const getPlanPrice = () => {
    // Simple mapping of plan names to monthly prices
    const prices: Record<string, number> = {
      starter: 99,
      growth: 199,
      pro: 499,
      enterprise: 999
    };
    
    const planKey = planName.toLowerCase();
    return prices[planKey] || 99; // Default to 99 if plan not found
  };

  const calculateRemainingObligation = () => {
    if (!isAnnual) return 0;
    
    const monthsRemaining = calculateRemainingMonths();
    const monthlyPrice = getPlanPrice();
    return monthsRemaining * monthlyPrice;
  };
  
  const today = getCurrentDate();
  const remainingObligation = calculateRemainingObligation();
  const accessEndDate = isAnnual ? today : getEndOfCurrentMonth();

  return (
    <>
      <DialogHeader>
        <DialogTitle>Cancellation Summary</DialogTitle>
        <DialogDescription>
          Please review the details of your cancellation before confirming.
        </DialogDescription>
      </DialogHeader>
      
      <div className="py-4 space-y-4">
        <div className="border rounded-md p-4 bg-muted/20">
          <h3 className="font-medium mb-2">Subscription Details</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-muted-foreground">Plan:</span>
            <span>{planName}</span>
            <span className="text-muted-foreground">Billing Cycle:</span>
            <span>{isAnnual ? 'Annual' : 'Monthly'}</span>
          </div>
        </div>
        
        <div className="border rounded-md p-4 bg-muted/20">
          <h3 className="font-medium mb-2">Cancellation Terms</h3>
          <div className="space-y-3 text-sm">
            {isAnnual ? (
              <>
                <p>
                  Your subscription will be cancelled immediately, but in accordance with your annual contract, 
                  you are still responsible for payment of the remaining term.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <span className="text-muted-foreground">Remaining Months:</span>
                  <span>{calculateRemainingMonths()} months</span>
                  <span className="text-muted-foreground">Remaining Obligation:</span>
                  <span className="font-medium">${remainingObligation.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <>
                <p>
                  Your subscription will be cancelled at the end of your current billing period. 
                  You will continue to have access until {formatDisplayDate(accessEndDate)}.
                </p>
                <p className="text-amber-600">
                  Note: You will still be responsible for any overages that accrue during the remainder of your billing period.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onGoBack}>
          Go Back
        </Button>
        <Button 
          variant="destructive" 
          onClick={onComplete}
        >
          Confirm Cancellation
        </Button>
      </DialogFooter>
    </>
  );
};
