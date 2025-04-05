
import React from "react";
import { CompanyInfoSection } from "./sections/CompanyInfoSection";
import { BillingAddressSection } from "./sections/BillingAddressSection";
import { PaymentMethodTabsContent } from "./sections/PaymentMethodTabsContent";
import { usePaymentMethodTabsState } from "./hooks/usePaymentMethodTabsState";

type PaymentMethodType = "card" | "ach";

interface PaymentMethodTabsProps {
  paymentMethodType: PaymentMethodType;
  onPaymentTypeChange: (value: PaymentMethodType) => void;
  newPaymentMethod: {
    cardNumber: string;
    cardholderName: string;
    expiry: string;
    cvc: string;
    makeDefault: boolean;
  };
  setNewPaymentMethod: React.Dispatch<React.SetStateAction<{
    cardNumber: string;
    cardholderName: string;
    expiry: string;
    cvc: string;
    makeDefault: boolean;
  }>>;
  newACHMethod: {
    accountName: string;
    routingNumber: string;
    accountNumber: string;
    accountType: string;
    makeDefault: boolean;
    backupCardNumber: string;
    backupCardholderName: string;
    backupExpiry: string;
    backupCvc: string;
  };
  setNewACHMethod: React.Dispatch<React.SetStateAction<{
    accountName: string;
    routingNumber: string;
    accountNumber: string;
    accountType: string;
    makeDefault: boolean;
    backupCardNumber: string;
    backupCardholderName: string;
    backupExpiry: string;
    backupCvc: string;
  }>>;
}

export const PaymentMethodTabs: React.FC<PaymentMethodTabsProps> = ({
  paymentMethodType,
  onPaymentTypeChange,
  newPaymentMethod,
  setNewPaymentMethod,
  newACHMethod,
  setNewACHMethod
}) => {
  const {
    companyInfo,
    handleCompanyInfoChange,
    handleAddressChange,
    handleUseSameAddressChange
  } = usePaymentMethodTabsState();

  return (
    <div className="space-y-6">
      {/* Company Information Section */}
      <CompanyInfoSection
        companyName={companyInfo.companyName}
        billingEmail={companyInfo.billingEmail}
        handleCompanyInfoChange={handleCompanyInfoChange}
      />

      {/* Payment Method Tabs */}
      <PaymentMethodTabsContent
        paymentMethodType={paymentMethodType}
        onPaymentTypeChange={onPaymentTypeChange}
        newPaymentMethod={newPaymentMethod}
        setNewPaymentMethod={setNewPaymentMethod}
        newACHMethod={newACHMethod}
        setNewACHMethod={setNewACHMethod}
      />

      {/* Billing Address Section */}
      <BillingAddressSection
        useSameAddress={companyInfo.useSameAddress}
        handleUseSameAddressChange={handleUseSameAddressChange}
        address={companyInfo.address}
        handleAddressChange={handleAddressChange}
      />
    </div>
  );
};
