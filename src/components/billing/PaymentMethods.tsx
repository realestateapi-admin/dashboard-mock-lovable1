
import { PaymentDetailsSection } from "./sections/PaymentDetailsSection";
import { CompanyInformationSection } from "./sections/CompanyInformationSection";
import { BillingAddressSection } from "./sections/BillingAddressSection";
import { UnsavedChangesDialog } from "./UnsavedChangesDialog";
import { usePaymentMethodFormV2 } from "./hooks/usePaymentMethodForm.v2";
import { useUnsavedChanges } from "./hooks/useUnsavedChanges";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

export const PaymentMethods = () => {
  const [paymentMethodType, setPaymentMethodType] = useState<'card' | 'ach'>('card');
  const { toast } = useToast();
  
  const {
    companyInfo,
    billingAddress,
    useSameAddress,
    cardDetails,
    backupCardDetails,
    achDetails,
    cardMakeDefault,
    achMakeDefault,
    handleCompanyInfoChange,
    handleBillingAddressChange,
    handleUseSameAddressChange,
    handleCardDetailsChange,
    handleBackupCardDetailsChange,
    handleACHDetailsChange,
    handleCardMakeDefaultChange,
    handleAchMakeDefaultChange,
  } = usePaymentMethodFormV2(false);

  // Get initial data for unsaved changes tracking
  const initialData = {
    companyInfo,
    billingAddress,
    useSameAddress,
    cardDetails,
    backupCardDetails,
    achDetails,
    cardMakeDefault,
    achMakeDefault,
    paymentMethodType,
  };

  const {
    hasUnsavedChanges,
    showUnsavedDialog,
    setShowUnsavedDialog,
    checkForUnsavedChanges,
    handleNavigation,
    confirmNavigation,
    cancelNavigation,
    markAsSaved,
  } = useUnsavedChanges(initialData);

  // Check for changes whenever form data updates
  useEffect(() => {
    const currentData = {
      companyInfo,
      billingAddress,
      useSameAddress,
      cardDetails,
      backupCardDetails,
      achDetails,
      cardMakeDefault,
      achMakeDefault,
      paymentMethodType,
    };
    checkForUnsavedChanges(currentData);
  }, [companyInfo, billingAddress, useSameAddress, cardDetails, backupCardDetails, achDetails, cardMakeDefault, achMakeDefault, paymentMethodType, checkForUnsavedChanges]);

  // Create proper handlers for card details that map to the correct field names
  const handleCardNameChange = (field: string, value: string) => {
    if (field === 'cardName') {
      handleCardDetailsChange('cardholderName', value);
    } else {
      handleCardDetailsChange(field, value);
    }
  };

  // Map card details to the expected format
  const mappedCardDetails = {
    cardName: cardDetails.cardholderName || '',
    cardNumber: cardDetails.cardNumber || '',
    expiry: cardDetails.expiry || '',
    cvc: cardDetails.cvc || '',
    zipCode: cardDetails.zipCode || ''
  };

  // Map backup card details to the expected format
  const mappedBackupCardDetails = {
    cardName: backupCardDetails.backupCardholderName || '',
    cardNumber: backupCardDetails.backupCardNumber || '',
    expiry: backupCardDetails.backupExpiry || '',
    cvc: backupCardDetails.backupCvc || '',
    zipCode: backupCardDetails.backupZipCode || ''
  };

  const handlePaymentTypeChange = (value: string) => {
    setPaymentMethodType(value as 'card' | 'ach');
  };

  const handleUpdate = () => {
    // Simulate saving the payment method data
    toast({
      title: "Payment methods updated",
      description: "Your payment information has been successfully updated.",
    });
    markAsSaved();
  };

  // Intercept tab navigation
  const handleTabNavigation = (navigationFn: () => void) => {
    handleNavigation(navigationFn);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Payment Details Section */}
        <PaymentDetailsSection 
          paymentMethodType={paymentMethodType}
          handlePaymentTypeChange={handlePaymentTypeChange}
          cardDetails={mappedCardDetails}
          backupCardDetails={mappedBackupCardDetails}
          achDetails={achDetails}
          handleCardDetailsChange={handleCardNameChange}
          handleBackupCardDetailsChange={handleBackupCardDetailsChange}
          handleACHDetailsChange={handleACHDetailsChange}
          isLoading={false}
          cardMakeDefault={cardMakeDefault}
          achMakeDefault={achMakeDefault}
          onCardMakeDefaultChange={handleCardMakeDefaultChange}
          onAchMakeDefaultChange={handleAchMakeDefaultChange}
        />

        {/* Billing Details Section */}
        <CompanyInformationSection 
          companyInfo={companyInfo}
          isLoading={false}
          handleCompanyInfoChange={handleCompanyInfoChange}
          title="Billing Details"
          showEmailFirst={true}
        />

        {/* Billing Address Section */}
        <BillingAddressSection 
          useSameAddress={useSameAddress}
          handleUseSameAddressChange={handleUseSameAddressChange}
          billingAddress={billingAddress}
          handleBillingAddressChange={handleBillingAddressChange}
          isLoading={false}
          hideTitle={true}
          hideCheckbox={true}
        />

        {/* Update Button */}
        <div className="flex justify-end pt-6 border-t">
          <Button 
            onClick={handleUpdate}
            disabled={!hasUnsavedChanges}
            className="min-w-32"
          >
            Update Payment Methods
          </Button>
        </div>
      </div>

      {/* Unsaved Changes Dialog */}
      <UnsavedChangesDialog
        open={showUnsavedDialog}
        onOpenChange={setShowUnsavedDialog}
        onConfirm={confirmNavigation}
        onCancel={cancelNavigation}
      />
    </>
  );
};
