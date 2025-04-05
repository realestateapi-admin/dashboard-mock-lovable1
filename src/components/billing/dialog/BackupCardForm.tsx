
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
            setNewACHMethod(prevState => ({
              ...prevState,
              backupCardNumber: values.cardNumber || prevState.backupCardNumber,
              backupCardholderName: values.cardholderName || prevState.backupCardholderName,
              backupExpiry: values.expiry || prevState.backupExpiry,
              backupCvc: values.cvc || prevState.backupCvc,
            }));
          }}
        />
      </div>
    </ScrollArea>
  );
};
