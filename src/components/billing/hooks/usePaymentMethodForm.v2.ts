
import { useState } from "react";

export const usePaymentMethodFormV2 = (isLoading: boolean) => {
  // State for payment method type
  const [paymentMethodType, setPaymentMethodType] = useState<"card" | "ach">("card");
  
  // State for company and billing information
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    billingEmail: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States"
    },
  });

  // State for billing address
  const [billingAddress, setBillingAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States"
  });

  // State for using same address
  const [useSameAddress, setUseSameAddress] = useState(false);

  // Credit card state
  const [cardDetails, setCardDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    zipCode: ""
  });

  // Backup credit card state for ACH
  const [backupCardDetails, setBackupCardDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    zipCode: ""
  });

  // Handle input changes for company info
  const handleCompanyInfoChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle company address changes
  const handleCompanyAddressChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
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

  const handleCardDetailsChange = (field: string, value: string) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBackupCardDetailsChange = (field: string, value: string) => {
    setBackupCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentTypeChange = (value: string) => {
    setPaymentMethodType(value as "card" | "ach");
  };

  return {
    paymentMethodType,
    companyInfo,
    billingAddress,
    useSameAddress,
    cardDetails,
    backupCardDetails,
    isLoading,
    handleCompanyInfoChange,
    handleCompanyAddressChange,
    handleBillingAddressChange,
    handleUseSameAddressChange,
    handleCardDetailsChange,
    handleBackupCardDetailsChange,
    handlePaymentTypeChange
  };
};
