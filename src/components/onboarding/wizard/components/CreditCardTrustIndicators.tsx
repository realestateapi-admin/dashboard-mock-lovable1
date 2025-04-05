
import React from "react";
import { Lock, CreditCard } from "lucide-react";

const CreditCardTrustIndicators: React.FC = () => {
  return (
    <div className="mt-6 text-center">
      <div className="flex flex-col space-y-2 items-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Lock className="h-4 w-4" />
          <span>Your payment information is secure and encrypted</span>
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-2">
          <img 
            src="/visa.svg" 
            alt="Visa" 
            className="h-6 opacity-60" 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const span = document.createElement('span');
                span.className = "text-sm text-gray-500";
                span.textContent = "Visa";
                parent.appendChild(span);
              }
            }}
          />
          <img 
            src="/mastercard.svg" 
            alt="Mastercard" 
            className="h-6 opacity-60" 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const span = document.createElement('span');
                span.className = "text-sm text-gray-500";
                span.textContent = "Mastercard";
                parent.appendChild(span);
              }
            }}
          />
          <img 
            src="/amex.svg" 
            alt="American Express" 
            className="h-6 opacity-60" 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const span = document.createElement('span');
                span.className = "text-sm text-gray-500";
                span.textContent = "Amex";
                parent.appendChild(span);
              }
            }}
          />
          <img 
            src="/discover.svg" 
            alt="Discover" 
            className="h-6 opacity-60" 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const span = document.createElement('span');
                span.className = "text-sm text-gray-500";
                span.textContent = "Discover";
                parent.appendChild(span);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCardTrustIndicators;
