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
    achDetails,
    cardMakeDefault,
    achMakeDefault,
    handleCompanyInfoChange,
    handleBillingAddressChange,
    handleUseSameAddressChange,
    handleCardDetailsChange,
    handleACHDetailsChange,
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
    const isValid = !!(
      cardDetails.cardholderName?.trim() &&
      cardDetails.cardNumber?.trim() &&
      cardDetails.expiry?.trim() &&
      cardDetails.cvc?.trim()
    );
    console.log('Credit card validation:', {
      cardholderName: !!cardDetails.cardholderName?.trim(),
      cardNumber: !!cardDetails.cardNumber?.trim(),
      expiry: !!cardDetails.expiry?.trim(),
      cvc: !!cardDetails.cvc?.trim(),
      isValid
    });
    return isValid;
  };

  // Validation logic for ACH - requires both ACH details AND credit card details as backup
  const isACHValid = () => {
    const achDetailsValid = !!(
      achDetails.accountName?.trim() &&
      achDetails.routingNumber?.trim() &&
      achDetails.accountNumber?.trim()
    );
    
    // Use regular credit card details as backup for ACH
    const backupCardValid = !!(
      cardDetails.cardholderName?.trim() &&
      cardDetails.cardNumber?.trim() &&
      cardDetails.expiry?.trim() &&
      cardDetails.cvc?.trim()
    );
    
    const isValid = achDetailsValid && backupCardValid;
    console.log('ACH validation:', {
      achDetailsValid,
      backupCardValid,
      isValid,
      achDetails,
      cardDetails
    });
    return isValid;
  };

  // Simplified validation - only payment method is required, billing details are optional
  const isFormValid = () => {
    const paymentValid = cardMakeDefault ? isCreditCardValid() : isACHValid();
    
    const overallValid = paymentValid;
    console.log('Form validation check:', {
      cardMakeDefault,
      achMakeDefault,
      paymentValid,
      overallValid
    });
    
    return overallValid;
  };

  React.useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isFormValid());
    }
  }, [
    // Dependencies for validation check - only payment method fields
    cardMakeDefault,
    achMakeDefault,
    cardDetails.cardholderName,
    cardDetails.cardNumber,
    cardDetails.expiry,
    cardDetails.cvc,
    achDetails.accountName,
    achDetails.routingNumber,
    achDetails.accountNumber,
    onValidationChange
  ]);

  // Enhanced handlers for default payment method changes that save to localStorage
  // and trigger validation update
  const handleCardMakeDefaultChangeWithStorage = (checked: boolean) => {
    handleCardMakeDefaultChange(checked);
    localStorage.setItem('cardMakeDefault', checked.toString());
    
    // If card is set as default, ACH should not be default
    if (checked) {
      localStorage.setItem('achMakeDefault', 'false');
    }
  };

  const handleAchMakeDefaultChangeWithStorage = (checked: boolean) => {
    handleAchMakeDefaultChange(checked);
    localStorage.setItem('achMakeDefault', checked.toString());
    
    // If ACH is set as default, card should not be default
    if (checked) {
      localStorage.setItem('cardMakeDefault', 'false');
    }
  };

  // Create proper handlers for card details that map to the correct field names
  const handleCardNameChange = (field: string, value: string) => {
    if (field === 'cardName') {
      handleCardDetailsChange('cardholderName', value);
    } else {
      handleCardDetailsChange(field, value);
    }
  };

  // Map card details to the expected format - don't mask for input, show actual values
  const mappedCardDetails = {
    cardName: cardDetails.cardholderName || '',
    cardNumber: cardDetails.cardNumber || '',
    expiry: cardDetails.expiry || '',
    cvc: cardDetails.cvc || '',
    zipCode: cardDetails.zipCode || ''
  };

  return (
    <>
      <div ref={contentRef} className="space-y-6">
        {/* Payment Details Section (First) */}
        <PaymentDetailsSection 
          paymentMethodType={paymentMethodType}
          handlePaymentTypeChange={handlePaymentMethodChange}
          cardDetails={mappedCardDetails}
          achDetails={achDetails}
          handleCardDetailsChange={handleCardNameChange}
          handleACHDetailsChange={handleACHDetailsChange}
          isLoading={isLoading}
          cardMakeDefault={cardMakeDefault}
          achMakeDefault={achMakeDefault}
          onCardMakeDefaultChange={handleCardMakeDefaultChangeWithStorage}
          onAchMakeDefaultChange={handleAchMakeDefaultChangeWithStorage}
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
