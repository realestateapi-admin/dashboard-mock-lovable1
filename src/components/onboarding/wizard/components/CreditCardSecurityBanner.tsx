
import React from "react";
import { ShieldCheck } from "lucide-react";

interface CreditCardSecurityBannerProps {
  message: string;
}

const CreditCardSecurityBanner: React.FC<CreditCardSecurityBannerProps> = ({ message }) => {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center gap-3">
      <ShieldCheck className="h-6 w-6 text-blue-500" />
      <p className="text-sm text-blue-700">{message}</p>
    </div>
  );
};

export default CreditCardSecurityBanner;
