
import { useState, useEffect, useCallback } from "react";

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

const BILLING_FORM_STORAGE_KEY = "billingFormData";

export const usePaymentMethodFormV2 = (isLoading: boolean) => {
  const [paymentMethodType, setPaymentMethodType] = useState<'card' | 'ach'>(() => {
    const saved = localStorage.getItem('paymentMethodType');
    return (saved === 'card' || saved === 'ach') ? saved : 'card';
  });

  const [cardMakeDefault, setCardMakeDefault] = useState(() => {
    const saved = localStorage.getItem('cardMakeDefault');
    return saved ? JSON.parse(saved) : true;
  });

  const [achMakeDefault, setAchMakeDefault] = useState(() => {
    const saved = localStorage.getItem('achMakeDefault');
    return saved ? JSON.parse(saved) : false;
  });

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: "",
    billingEmail: "",
  });

  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    line1: "",
    line2: "",
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

  // Load form data from localStorage on component mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(BILLING_FORM_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log("Loading billing form data from localStorage:", parsedData);
        
        if (parsedData.cardDetails) {
          setCardDetails(prev => ({ ...prev, ...parsedData.cardDetails }));
        }
        if (parsedData.companyInfo) {
          setCompanyInfo(prev => ({ ...prev, ...parsedData.companyInfo }));
        }
        if (parsedData.billingAddress) {
          setBillingAddress(prev => ({ ...prev, ...parsedData.billingAddress }));
        }
        if (parsedData.backupCardDetails) {
          setBackupCardDetails(prev => ({ ...prev, ...parsedData.backupCardDetails }));
        }
        if (typeof parsedData.useSameAddress === 'boolean') {
          setUseSameAddress(parsedData.useSameAddress);
        }
      }
    } catch (error) {
      console.error("Error loading billing form data from localStorage:", error);
    }
  }, []);

  // Save form data to localStorage whenever it changes
  const saveToLocalStorage = useCallback(() => {
    try {
      const dataToSave = {
        cardDetails,
        companyInfo,
        billingAddress,
        backupCardDetails,
        useSameAddress,
        paymentMethodType,
        cardMakeDefault,
        achMakeDefault
      };
      localStorage.setItem(BILLING_FORM_STORAGE_KEY, JSON.stringify(dataToSave));
      console.log("Saved billing form data to localStorage:", dataToSave);
    } catch (error) {
      console.error("Error saving billing form data to localStorage:", error);
    }
  }, [cardDetails, companyInfo, billingAddress, backupCardDetails, useSameAddress, paymentMethodType, cardMakeDefault, achMakeDefault]);

  // Auto-save whenever data changes
  useEffect(() => {
    saveToLocalStorage();
  }, [saveToLocalStorage]);

  // Save default payment method states to localStorage
  useEffect(() => {
    localStorage.setItem('cardMakeDefault', JSON.stringify(cardMakeDefault));
  }, [cardMakeDefault]);

  useEffect(() => {
    localStorage.setItem('achMakeDefault', JSON.stringify(achMakeDefault));
  }, [achMakeDefault]);

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

  const handleCardMakeDefaultChange = (checked: boolean) => {
    setCardMakeDefault(checked);
    if (checked) {
      setAchMakeDefault(false);
    }
  };

  const handleAchMakeDefaultChange = (checked: boolean) => {
    setAchMakeDefault(checked);
    if (checked) {
      setCardMakeDefault(false);
    }
  };

  // Function to initialize form with credit card info from onboarding (only if no billing data exists)
  const initializeFromCreditCardInfo = useCallback((creditCardInfo: any) => {
    // Only initialize from onboarding data if we don't have saved billing form data
    const existingData = localStorage.getItem(BILLING_FORM_STORAGE_KEY);
    if (!existingData && creditCardInfo) {
      console.log("Initializing billing form with onboarding credit card info:", creditCardInfo);
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
          // Keep existing billingEmail, don't overwrite it
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
    initializeFromCreditCardInfo,
  };
};
