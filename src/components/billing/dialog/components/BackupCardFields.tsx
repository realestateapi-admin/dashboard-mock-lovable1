
import React from "react";
import { CreditCardForm } from "../../CreditCardForm";

interface BackupCardFieldsProps {
  backupCardData: {
    cardNumber: string;
    cardholderName: string;
    expiry: string;
    cvc: string;
  };
  onBackupCardChange: (values: {
    cardNumber?: string;
    cardholderName?: string;
    expiry?: string;
    cvc?: string;
  }) => void;
}

export const BackupCardFields: React.FC<BackupCardFieldsProps> = ({
  backupCardData,
  onBackupCardChange,
}) => {
  return (
    <CreditCardForm
      newPaymentMethod={{
        cardNumber: backupCardData.cardNumber,
        cardholderName: backupCardData.cardholderName,
        expiry: backupCardData.expiry,
        cvc: backupCardData.cvc,
        makeDefault: false,
      }}
      setNewPaymentMethod={(values) => {
        // Handle both function and direct object updates
        if (typeof values === 'function') {
          // If it's a function, apply it to get the new values
          const currentValues = {
            cardNumber: backupCardData.cardNumber,
            cardholderName: backupCardData.cardholderName,
            expiry: backupCardData.expiry,
            cvc: backupCardData.cvc,
            makeDefault: false,
          };
          
          const newValues = values(currentValues);
          
          onBackupCardChange({
            cardNumber: newValues.cardNumber,
            cardholderName: newValues.cardholderName,
            expiry: newValues.expiry,
            cvc: newValues.cvc,
          });
        } else {
          // If it's a direct object, use the values directly
          onBackupCardChange({
            cardNumber: values.cardNumber,
            cardholderName: values.cardholderName,
            expiry: values.expiry,
            cvc: values.cvc,
          });
        }
      }}
    />
  );
};
