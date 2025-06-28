import React from "react";
import { CompanyInformationSection } from "./sections/CompanyInformationSection";
import { PaymentDetailsSection } from "./sections/PaymentDetailsSection";
import { BillingAddressSection } from "./sections/BillingAddressSection";
import { usePaymentMethodFormV2 } from "./hooks/usePaymentMethodForm.v2";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface PaymentMethodFormProps {
  isLoading: boolean;
  creditCardInfo?: any;
  onPaymentMethodTypeChange?: (type: 'card' | 'ach') => void;
}

const ScrollIndicator = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
      <div className="bg-white/80 text-gray-600 rounded-full p-2 shadow-md border border-gray-200">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
};

export const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  isLoading,
  creditCardInfo,
  onPaymentMethodTypeChange
}) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const {
    paymentMethodType,
    companyInfo,
    billingAddress,
    useSameAddress,
    cardDetails,
    backupCardDetails,
    handleCompanyInfoChange,
    handleBillingAddressChange,
    handleUseSameAddressChange,
    handleCardDetailsChange,
    handleBackupCardDetailsChange,
    handlePaymentTypeChange
  } = usePaymentMethodFormV2(isLoading);

  const checkScrollPosition = () => {
    const scrollContainer = document.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer && contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const contentHeight = contentRef.current.scrollHeight;
      
      const hasMoreContent = contentHeight > clientHeight - 100;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
      
      setShowScrollIndicator(hasMoreContent && !isNearBottom);
    }
  };
  
  useEffect(() => {
    const scrollContainer = document.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      const timeouts = [100, 500, 1000, 2000].map(delay => 
        setTimeout(checkScrollPosition, delay)
      );
      
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      return () => {
        timeouts.forEach(clearTimeout);
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      setTimeout(checkScrollPosition, 100);
    };
    
    window.addEventListener('resize', handleResize);
    checkScrollPosition();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [paymentMethodType]);

  // Notify parent component when payment method type changes
  React.useEffect(() => {
    if (onPaymentMethodTypeChange) {
      onPaymentMethodTypeChange(paymentMethodType);
    }
  }, [paymentMethodType, onPaymentMethodTypeChange]);

  // Custom handler for payment type changes that notifies parent component
  const handlePaymentMethodChange = (value: string) => {
    const type = value as 'card' | 'ach';
    handlePaymentTypeChange(type);
    
    // Store the payment method type in localStorage for persistence
    localStorage.setItem('paymentMethodType', type);
  };

  return (
    <>
      <div ref={contentRef} className="space-y-8">
        {/* Company Information Section (First) */}
        <CompanyInformationSection 
          companyInfo={companyInfo}
          isLoading={isLoading}
          handleCompanyInfoChange={handleCompanyInfoChange}
        />

        {/* Payment Details Section (Second) */}
        <PaymentDetailsSection 
          paymentMethodType={paymentMethodType}
          handlePaymentTypeChange={handlePaymentMethodChange}
          cardDetails={cardDetails}
          backupCardDetails={backupCardDetails}
          handleCardDetailsChange={handleCardDetailsChange}
          handleBackupCardDetailsChange={handleBackupCardDetailsChange}
          isLoading={isLoading}
        />

        {/* Billing Address Section (Third) */}
        <BillingAddressSection 
          useSameAddress={useSameAddress}
          handleUseSameAddressChange={handleUseSameAddressChange}
          billingAddress={billingAddress}
          handleBillingAddressChange={handleBillingAddressChange}
          isLoading={isLoading}
        />
      </div>
      <ScrollIndicator isVisible={showScrollIndicator} />
    </>
  );
};
