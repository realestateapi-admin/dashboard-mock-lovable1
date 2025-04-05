
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePaymentMethodDialog } from "./hooks/usePaymentMethodDialog";
import { PaymentMethodDialogHeader } from "./dialog/PaymentMethodDialogHeader";
import { DialogContent as PaymentDialogContent } from "./dialog/DialogContent";
import { DialogFooterButtons } from "./dialog/DialogFooterButtons";

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
  }>;
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
  };

  const isBackupCardStep = paymentMethodType === "ach" && achStep === "backup-card";
  const isACHFirstStep = paymentMethodType === "ach" && achStep === "ach-details";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-hidden flex flex-col">
        <div className="flex flex-col h-full overflow-hidden">
          <div className="p-6 pb-2 sticky top-0 z-20 bg-background border-b">
            <PaymentMethodDialogHeader 
              isBackupCardStep={isBackupCardStep}
              onBackClick={handleBackToACHDetails}
            />
          </div>
          
          <PaymentDialogContent 
            isBackupCardStep={isBackupCardStep}
            paymentMethodType={paymentMethodType}
            onPaymentTypeChange={handlePaymentTypeChange}
            newPaymentMethod={newPaymentMethod}
            setNewPaymentMethod={setNewPaymentMethod}
            newACHMethod={newACHMethod}
            setNewACHMethod={setNewACHMethod}
            handleClose={handleClose}
            handleAddPaymentMethod={handleAddPaymentMethod}
          />
          
          <DialogFooterButtons 
            isACHFirstStep={isACHFirstStep}
            handleClose={handleClose}
            handleAddPaymentMethod={handleAddPaymentMethod}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
