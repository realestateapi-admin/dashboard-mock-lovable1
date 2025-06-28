
import { useState, useEffect } from "react";

export interface CompanyInfo {
  companyName: string;
  billingEmail: string;
}

export interface BillingAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CardDetails {
  accountName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: string;
  makeDefault: boolean;
  cardNumber: string;
  cardholderName: string;
  expiry: string;
  cvc: string;
}

export interface BackupCardDetails {
  backupCardNumber: string;
  backupCardholderName: string;
  backupExpiry: string;
  backupCvc: string;
}

export const usePaymentMethodFormV2 = (isLoading: boolean = false) => {
  // Get stored payment method type or default to 'card'
  const [paymentMethodType, setPaymentMethodType] = useState<'card' | 'ach'>(() => {
    const stored = localStorage.getItem('paymentMethodType');
    return (stored === 'card' || stored === 'ach') ? stored as 'card' | 'ach' : 'card';
  });

  // Company information state (without address)
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: "",
    billingEmail: "",
  });

  // Billing address state (separate from company info)
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States"
  });

  // Use same address checkbox state
  const [useSameAddress, setUseSameAddress] = useState(false);

  // Card details state
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    accountName: "",
    routingNumber: "",
    accountNumber: "",
    accountType: "checking",
    makeDefault: false,
    cardNumber: "",
    cardholderName: "",
    expiry: "",
    cvc: "",
  });

  // Backup card details state
  const [backupCardDetails, setBackupCardDetails] = useState<BackupCardDetails>({
    backupCardNumber: "",
    backupCardholderName: "",
    backupExpiry: "",
    backupCvc: "",
  });

  // Handle company info changes
  const handleCompanyInfoChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle billing address changes
  const handleBillingAddressChange = (field: string, value: string) => {
    setBillingAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle checkbox for using same address
  const handleUseSameAddressChange = (checked: boolean) => {
    setUseSameAddress(checked);
  };

  // Handle card details changes
  const handleCardDetailsChange = (field: string, value: string | boolean) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle backup card details changes
  const handleBackupCardDetailsChange = (field: string, value: string) => {
    setBackupCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle payment type changes
  const handlePaymentTypeChange = (type: 'card' | 'ach') => {
    setPaymentMethodType(type);
    localStorage.setItem('paymentMethodType', type);
  };

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
    handlePaymentTypeChange
  };
};
