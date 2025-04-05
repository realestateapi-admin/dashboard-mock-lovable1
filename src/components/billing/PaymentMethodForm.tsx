
import React from "react";
import { CompanyInformationSection } from "./sections/CompanyInformationSection";
import { PaymentDetailsSection } from "./sections/PaymentDetailsSection";
import { BillingAddressSection } from "./sections/BillingAddressSection";
import { usePaymentMethodFormV2 } from "./hooks/usePaymentMethodForm.v2";

interface PaymentMethodFormProps {
  isLoading: boolean;
  creditCardInfo?: any;
}

export const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  isLoading,
  creditCardInfo,
}) => {
  const {
    paymentMethodType,
    companyInfo,
    billingAddress,
    useSameAddress,
    cardDetails,
    backupCardDetails,
    handleCompanyInfoChange,
    handleCompanyAddressChange,
    handleBillingAddressChange,
    handleUseSameAddressChange,
    handleCardDetailsChange,
    handleBackupCardDetailsChange,
    handlePaymentTypeChange
  } = usePaymentMethodFormV2(isLoading);

  return (
    <div className="space-y-8">
      {/* Company Information Section (First) */}
      <CompanyInformationSection 
        companyInfo={companyInfo}
        isLoading={isLoading}
        handleCompanyInfoChange={handleCompanyInfoChange}
        handleCompanyAddressChange={handleCompanyAddressChange}
      />

      {/* Payment Details Section (Second) */}
      <PaymentDetailsSection 
        paymentMethodType={paymentMethodType}
        handlePaymentTypeChange={handlePaymentTypeChange}
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
  );
};
