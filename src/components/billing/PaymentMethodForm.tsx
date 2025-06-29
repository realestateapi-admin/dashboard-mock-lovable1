
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
  onValidationChange?: (isValid: boolean) => void;
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
  onPaymentMethodTypeChange,
  onValidationChange
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
    cardMakeDefault,
    achMakeDefault,
    handleCompanyInfoChange,
    handleBillingAddressChange,
    handleUseSameAddressChange,
    handleCardDetailsChange,
    handleBackupCardDetailsChange,
    handlePaymentTypeChange,
    handleCardMakeDefaultChange,
    handleAchMakeDefaultChange,
    initializeFromCreditCardInfo
  } = usePaymentMethodFormV2(isLoading);

  // Initialize form with credit card info from onboarding
  useEffect(() => {
    if (creditCardInfo) {
      console.log('Initializing payment form with credit card info:', creditCardInfo);
      initializeFromCreditCardInfo(creditCardInfo);
    }
  }, [creditCardInfo, initializeFromCreditCardInfo]);

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

  // Validation logic for credit card
  const isCreditCardValid = () => {
    return !!(
      cardDetails.cardholderName?.trim() &&
      cardDetails.cardNumber?.trim() &&
      cardDetails.expiry?.trim() &&
      cardDetails.cvc?.trim()
    );
  };

  // Validation logic for ACH
  const isACHValid = () => {
    return !!(
      cardDetails.routingNumber?.trim() &&
      cardDetails.accountNumber?.trim() &&
      backupCardDetails.backupCardholderName?.trim() &&
      backupCardDetails.backupCardNumber?.trim() &&
      backupCardDetails.backupExpiry?.trim() &&
      backupCardDetails.backupCvc?.trim()
    );
  };

  // Check overall validation and notify parent
  const isFormValid = paymentMethodType === 'card' ? isCreditCardValid() : isACHValid();

  React.useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isFormValid);
    }
  }, [isFormValid, onValidationChange]);

  // Helper function to mask card number - show only last 4 digits
  const maskCardNumber = (cardNumber: string): string => {
    if (!cardNumber) return '';
    const digits = cardNumber.replace(/\s/g, '');
    if (digits.length >= 4) {
      const lastFour = digits.slice(-4);
      const maskedPortion = "•".repeat(Math.max(0, digits.length - 4));
      return (maskedPortion + lastFour).replace(/(.{4})/g, "$1 ").trim();
    }
    return cardNumber;
  };

  // Create proper handlers for card details that map to the correct field names
  const handleCardNameChange = (field: string, value: string) => {
    if (field === 'cardName') {
      handleCardDetailsChange('cardholderName', value);
    } else {
      handleCardDetailsChange(field, value);
    }
  };

  // Map card details to the expected format with proper field mapping
  const mappedCardDetails = {
    cardName: cardDetails.cardholderName || '',
    cardNumber: creditCardInfo ? maskCardNumber(cardDetails.cardNumber || '') : cardDetails.cardNumber || '',
    expiry: cardDetails.expiry || '',
    cvc: cardDetails.cvc || '',
    zipCode: cardDetails.zipCode || ''
  };

  // Map backup card details to the expected format (fixed property names)
  const mappedBackupCardDetails = {
    cardName: backupCardDetails.backupCardholderName || '',
    cardNumber: backupCardDetails.backupCardNumber || '',
    expiry: backupCardDetails.backupExpiry || '',
    cvc: backupCardDetails.backupCvc || '',
    zipCode: backupCardDetails.backupZipCode || ''
  };

  return (
    <>
      <div ref={contentRef} className="space-y-8">
        {/* Payment Details Section (First) */}
        <PaymentDetailsSection 
          paymentMethodType={paymentMethodType}
          handlePaymentTypeChange={handlePaymentMethodChange}
          cardDetails={mappedCardDetails}
          backupCardDetails={mappedBackupCardDetails}
          handleCardDetailsChange={handleCardNameChange}
          handleBackupCardDetailsChange={handleBackupCardDetailsChange}
          isLoading={isLoading}
          cardMakeDefault={cardMakeDefault}
          achMakeDefault={achMakeDefault}
          onCardMakeDefaultChange={handleCardMakeDefaultChange}
          onAchMakeDefaultChange={handleAchMakeDefaultChange}
        />

        {/* Billing Details Section (Second - renamed from Company Information) */}
        <CompanyInformationSection 
          companyInfo={companyInfo}
          isLoading={isLoading}
          handleCompanyInfoChange={handleCompanyInfoChange}
          title="Billing Details"
          showEmailFirst={true}
        />

        {/* Billing Address Section (Third - without title and checkbox) */}
        <BillingAddressSection 
          useSameAddress={useSameAddress}
          handleUseSameAddressChange={handleUseSameAddressChange}
          billingAddress={billingAddress}
          handleBillingAddressChange={handleBillingAddressChange}
          isLoading={isLoading}
          hideTitle={true}
          hideCheckbox={true}
        />
      </div>
      <ScrollIndicator isVisible={showScrollIndicator} />
    </>
  );
};
