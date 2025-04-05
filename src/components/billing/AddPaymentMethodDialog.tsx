
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePaymentMethodDialog } from "./hooks/usePaymentMethodDialog";
import { PaymentMethodDialogHeader } from "./dialog/PaymentMethodDialogHeader";
import { BackupCardForm } from "./dialog/BackupCardForm";
import { PaymentMethodTabs } from "./dialog/PaymentMethodTabs";

type PaymentMethodType = "card" | "ach";

interface AddPaymentMethodDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPaymentMethod: (type: PaymentMethodType) => void;
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

export const AddPaymentMethodDialog = ({
  isOpen,
  onClose,
  onAddPaymentMethod,
  newPaymentMethod,
  setNewPaymentMethod,
  newACHMethod,
  setNewACHMethod
}: AddPaymentMethodDialogProps) => {
  const {
    paymentMethodType,
    setPaymentMethodType,
    achStep,
    handleBackToACHDetails,
    moveToBackupCardStep,
    resetSteps
  } = usePaymentMethodDialog();

  const handleAddPaymentMethod = () => {
    // For ACH, we need to make sure we've completed both steps
    if (paymentMethodType === "ach" && achStep === "ach-details") {
      // Move to backup card step
      moveToBackupCardStep();
      return;
    }
    
    onAddPaymentMethod(paymentMethodType);
  };

  const handleClose = () => {
    // Reset steps when closing
    resetSteps();
    onClose();
  };

  const handlePaymentTypeChange = (value: PaymentMethodType) => {
    setPaymentMethodType(value);
    resetSteps(); // Reset ACH step when changing tab
  };

  const isBackupCardStep = paymentMethodType === "ach" && achStep === "backup-card";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-hidden flex flex-col z-50">
        <PaymentMethodDialogHeader 
          isBackupCardStep={isBackupCardStep}
          onBackClick={handleBackToACHDetails}
        />
        
        {isBackupCardStep ? (
          <BackupCardForm 
            newACHMethod={newACHMethod}
            setNewACHMethod={setNewACHMethod}
          />
        ) : (
          <PaymentMethodTabs
            paymentMethodType={paymentMethodType}
            onPaymentTypeChange={handlePaymentTypeChange}
            newPaymentMethod={newPaymentMethod}
            setNewPaymentMethod={setNewPaymentMethod}
            newACHMethod={newACHMethod}
            setNewACHMethod={setNewACHMethod}
          />
        )}
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddPaymentMethod}>
            {paymentMethodType === "ach" && achStep === "ach-details" 
              ? "Continue to Backup Card" 
              : "Add Payment Method"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
