
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentDetailsSection } from "./sections/PaymentDetailsSection";
import { usePaymentMethodFormV2 } from "./hooks/usePaymentMethodForm.v2";
import { useState } from "react";

export const PaymentMethods = () => {
  const [paymentMethodType, setPaymentMethodType] = useState<'card' | 'ach'>('card');
  
  const {
    cardDetails,
    backupCardDetails,
    achDetails,
    cardMakeDefault,
    achMakeDefault,
    handleCardDetailsChange,
    handleBackupCardDetailsChange,
    handleACHDetailsChange,
    handleCardMakeDefaultChange,
    handleAchMakeDefaultChange,
  } = usePaymentMethodFormV2(false);

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>
          Manage your payment methods and billing information
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
