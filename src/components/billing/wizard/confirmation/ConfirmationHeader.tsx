
import React from "react";
import { CheckCircle2 } from "lucide-react";

interface ConfirmationHeaderProps {
  billingCycle: 'monthly' | 'annual';
}

export const ConfirmationHeader: React.FC<ConfirmationHeaderProps> = ({ 
  billingCycle
}) => {
  return (
    <div className="flex items-center gap-3 bg-green-50 text-green-700 p-4 rounded-md border border-green-100">
      <CheckCircle2 className="h-6 w-6 text-green-500" />
      <div>
        <p className="font-medium">Your subscription has been successfully set up!</p>
        <p className="text-sm mt-1">You will be billed {billingCycle === 'annual' ? 'annually' : 'monthly'}{billingCycle === 'annual' ? ' with a discount for annual payment' : ''}.</p>
      </div>
    </div>
  );
};
