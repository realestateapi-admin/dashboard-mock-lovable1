
import React from "react";
import { BackupCardForm } from "./BackupCardForm";
import { PaymentMethodTabs } from "./PaymentMethodTabs";

type PaymentMethodType = "card" | "ach";

interface DialogContentProps {
  isBackupCardStep: boolean;
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
  handleClose: () => void;
  handleAddPaymentMethod: () => void;
}

export const DialogContent: React.FC<DialogContentProps> = ({
  isBackupCardStep,
  paymentMethodType,
  onPaymentTypeChange,
  newPaymentMethod,
  setNewPaymentMethod,
  newACHMethod,
  setNewACHMethod
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      {isBackupCardStep ? (
        <BackupCardForm 
          newACHMethod={newACHMethod}
          setNewACHMethod={setNewACHMethod}
        />
      ) : (
        <PaymentMethodTabs
          paymentMethodType={paymentMethodType}
          onPaymentTypeChange={onPaymentTypeChange}
          newPaymentMethod={newPaymentMethod}
          setNewPaymentMethod={setNewPaymentMethod}
          newACHMethod={newACHMethod}
          setNewACHMethod={setNewACHMethod}
        />
      )}
    </div>
  );
};
