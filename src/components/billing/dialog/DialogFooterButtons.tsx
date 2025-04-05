
import React from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogFooterButtonsProps {
  isACHFirstStep: boolean;
  handleClose: () => void;
  handleAddPaymentMethod: () => void;
}

export const DialogFooterButtons: React.FC<DialogFooterButtonsProps> = ({
  isACHFirstStep,
  handleClose,
  handleAddPaymentMethod
}) => {
  return (
    <div className="p-6 pt-4 border-t mt-auto sticky bottom-0 bg-background">
      <DialogFooter className="mt-0">
        <Button variant="outline" onClick={handleClose} className="mr-2">
          Cancel
        </Button>
        <Button onClick={handleAddPaymentMethod}>
          {isACHFirstStep ? "Continue to Backup Card" : "Add Payment Method"}
        </Button>
      </DialogFooter>
    </div>
  );
};
