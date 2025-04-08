
import React from "react";
import { AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface CostSummaryProps {
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  financialInfo: {
    transactionFee: number;
    totalWithFee: number;
    firstPaymentDate: Date;
    remainingDays: number;
    proratedAmount: number;
  };
  formatCurrency: (amount: number) => string;
  paymentMethodType: 'card' | 'ach';
  billingCycle: 'monthly' | 'annual';
}

export const CostSummary: React.FC<CostSummaryProps> = ({
  costs,
  financialInfo,
  formatCurrency,
  paymentMethodType,
  billingCycle
}) => {
  return (
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
          <span>{formatCurrency(financialInfo.transactionFee)}</span>
        </div>
      )}
      
      <div className="flex justify-between py-2 font-medium border-t mt-1">
        <span>Total {billingCycle === 'annual' ? 'Annual' : 'Monthly'} Payment:</span>
        <span>{formatCurrency(financialInfo.totalWithFee)}</span>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
        <h4 className="text-sm font-medium text-blue-800">Your first payment</h4>
        <div className="flex justify-between py-1 text-sm text-blue-700">
          <span>Prorated amount for current {billingCycle === 'annual' ? 'year' : 'month'} ({financialInfo.remainingDays} days):</span>
          <span>{formatCurrency(financialInfo.proratedAmount)}</span>
        </div>
        <div className="text-xs text-blue-600 mt-1">
          Your first payment on {format(new Date(), 'MMMM d, yyyy')} will be prorated. Full billing begins on {format(financialInfo.firstPaymentDate, 'MMMM 1, yyyy')}.
        </div>
      </div>
      
      {paymentMethodType === 'card' && (
        <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-100 flex items-start gap-2 mt-4">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>A 3% transaction fee applies to all credit card payments. Switch to ACH (bank account) payments to avoid this fee.</span>
        </div>
      )}
    </div>
  );
};
