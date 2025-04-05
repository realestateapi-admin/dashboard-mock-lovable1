
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BackupCardFields } from "./components/BackupCardFields";

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
  const handleBackupCardChange = (values: {
    cardNumber?: string;
    cardholderName?: string;
    expiry?: string;
    cvc?: string;
  }) => {
    setNewACHMethod(prevState => ({
      ...prevState,
      backupCardNumber: values.cardNumber || prevState.backupCardNumber,
      backupCardholderName: values.cardholderName || prevState.backupCardholderName,
      backupExpiry: values.expiry || prevState.backupExpiry,
      backupCvc: values.cvc || prevState.backupCvc,
    }));
  };

  return (
    <ScrollArea className="flex-1 px-1">
      <div className="py-4">
        <BackupCardFields
          backupCardData={{
            cardNumber: newACHMethod.backupCardNumber,
            cardholderName: newACHMethod.backupCardholderName,
            expiry: newACHMethod.backupExpiry,
            cvc: newACHMethod.backupCvc,
          }}
          onBackupCardChange={handleBackupCardChange}
        />
      </div>
    </ScrollArea>
  );
};
