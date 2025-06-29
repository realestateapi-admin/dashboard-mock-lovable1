
import { useState, useEffect, useCallback } from "react";

export interface CompanyInfo {
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface BillingAddress {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CardDetails {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  zipCode: string;
  routingNumber: string;
  accountNumber: string;
}

export interface BackupCardDetails {
  backupCardholderName: string;
  backupCardNumber: string;
  backupExpiry: string;
  backupCvc: string;
  backupZipCode: string;
}

export const usePaymentMethodFormV2 = (isLoading: boolean) => {
  const [paymentMethodType, setPaymentMethodType] = useState<'card' | 'ach'>(() => {
    const saved = localStorage.getItem('paymentMethodType');
    return (saved === 'card' || saved === 'ach') ? saved : 'card';
  });

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  const [useSameAddress, setUseSameAddress] = useState(true);

  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    zipCode: "",
    routingNumber: "",
    accountNumber: "",
  });

  const [backupCardDetails, setBackupCardDetails] = useState<BackupCardDetails>({
    backupCardholderName: "",
    backupCardNumber: "",
    backupExpiry: "",
    backupCvc: "",
    backupZipCode: "",
  });

  const handleCompanyInfoChange = (field: keyof CompanyInfo, value: string) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleBillingAddressChange = (field: keyof BillingAddress, value: string) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleUseSameAddressChange = (checked: boolean) => {
    setUseSameAddress(checked);
  };

  const handleCardDetailsChange = (field: string, value: string) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleBackupCardDetailsChange = (field: string, value: string) => {
    const mappedField = field.startsWith('backup') ? field : `backup${field.charAt(0).toUpperCase() + field.slice(1)}`;
    setBackupCardDetails(prev => ({ ...prev, [mappedField]: value }));
  };

  const handlePaymentTypeChange = (type: 'card' | 'ach') => {
    setPaymentMethodType(type);
    localStorage.setItem('paymentMethodType', type);
  };

  // Function to initialize form with credit card info from onboarding
  const initializeFromCreditCardInfo = useCallback((creditCardInfo: any) => {
    if (creditCardInfo) {
      setCardDetails(prev => ({
        ...prev,
        cardholderName: creditCardInfo.cardName || creditCardInfo.cardholderName || "",
        cardNumber: creditCardInfo.cardNumber || "",
        expiry: creditCardInfo.expiry || "", 
        cvc: creditCardInfo.cvc || "",
        zipCode: creditCardInfo.zipCode || "",
      }));
      
      // Also update company info if available
      if (creditCardInfo.cardName || creditCardInfo.cardholderName) {
        const fullName = creditCardInfo.cardName || creditCardInfo.cardholderName;
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        setCompanyInfo(prev => ({
          ...prev,
          firstName: firstName,
          lastName: lastName,
        }));
      }
    }
  }, []);

  return {
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
    handlePaymentTypeChange,
    initializeFromCreditCardInfo,
  };
};
