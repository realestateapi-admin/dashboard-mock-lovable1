
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

interface PaymentMethodDialogHeaderProps {
  isBackupCardStep: boolean;
  onBackClick: () => void;
}

export const PaymentMethodDialogHeader: React.FC<PaymentMethodDialogHeaderProps> = ({
  isBackupCardStep,
  onBackClick
}) => {
  return (
    <DialogHeader>
      <DialogTitle>
        {isBackupCardStep ? (
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2 h-8 w-8 p-0" 
              onClick={onBackClick}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            Add Backup Credit Card
          </div>
        ) : (
          "Add Payment Method"
        )}
      </DialogTitle>
      <DialogDescription>
        {isBackupCardStep
          ? "A backup credit card is required when using ACH payments." 
          : "Enter your payment details to add a new payment method."}
      </DialogDescription>
    </DialogHeader>
  );
};
