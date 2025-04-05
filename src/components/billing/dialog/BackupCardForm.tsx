
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreditCardForm } from "../CreditCardForm";

interface BackupCardFormProps {
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

export const BackupCardForm: React.FC<BackupCardFormProps> = ({
  newACHMethod,
  setNewACHMethod
}) => {
  return (
    <ScrollArea className="flex-1 px-1">
      <div className="py-4">
        <CreditCardForm
          newPaymentMethod={{
            cardNumber: newACHMethod.backupCardNumber,
            cardholderName: newACHMethod.backupCardholderName,
            expiry: newACHMethod.backupExpiry,
            cvc: newACHMethod.backupCvc,
            makeDefault: false,
          }}
          setNewPaymentMethod={(values) => {
            // Fix: Properly handle the setNewPaymentMethod callback
            // The values parameter could be either a new state object or a function
            if (typeof values === 'function') {
              // If it's a function, we need to apply it to get the new values
              setNewACHMethod(prevState => {
                const newValues = values({
                  cardNumber: prevState.backupCardNumber,
                  cardholderName: prevState.backupCardholderName,
                  expiry: prevState.backupExpiry,
                  cvc: prevState.backupCvc,
                  makeDefault: false,
                });
                
                return {
                  ...prevState,
                  backupCardNumber: newValues.cardNumber,
                  backupCardholderName: newValues.cardholderName,
                  backupExpiry: newValues.expiry,
                  backupCvc: newValues.cvc,
                };
              });
            } else {
              // If it's a direct object, we can use the values directly
              setNewACHMethod(prevState => ({
                ...prevState,
                backupCardNumber: values.cardNumber || prevState.backupCardNumber,
                backupCardholderName: values.cardholderName || prevState.backupCardholderName,
                backupExpiry: values.expiry || prevState.backupExpiry,
                backupCvc: values.cvc || prevState.backupCvc,
              }));
            }
          }}
        />
      </div>
    </ScrollArea>
  );
};
