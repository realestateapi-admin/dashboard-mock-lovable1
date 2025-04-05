
import { useState } from "react";

export interface CompanyAddressInfo {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CompanyInfo {
  companyName: string;
  billingEmail: string;
  address: CompanyAddressInfo;
  useSameAddress: boolean;
}

export const usePaymentMethodTabsState = () => {
  // State for company and billing information
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
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
    useSameAddress: false
  });

  // Handle input changes for company and billing info
  const handleCompanyInfoChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle address changes
  const handleAddressChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  // Handle checkbox for using same address
  const handleUseSameAddressChange = (checked: boolean) => {
    setCompanyInfo(prev => ({
      ...prev,
      useSameAddress: checked
    }));
  };

  return {
    companyInfo,
    handleCompanyInfoChange,
    handleAddressChange,
    handleUseSameAddressChange
  };
};
