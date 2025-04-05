
import React from "react";
import { Lock } from "lucide-react";

const CreditCardTrustIndicators: React.FC = () => {
  return (
    <div className="mt-6 text-center">
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
        <Lock className="h-4 w-4" />
        <span>Your payment information is secure and encrypted</span>
      </div>
    </div>
  );
};

export default CreditCardTrustIndicators;
