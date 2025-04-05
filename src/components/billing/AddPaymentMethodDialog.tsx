
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCardIcon, Building, ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreditCardForm } from "./CreditCardForm";
import { ACHForm } from "./ACHForm";

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
  const [paymentMethodType, setPaymentMethodType] = useState<PaymentMethodType>("card");
  const [achStep, setACHStep] = useState<"ach-details" | "backup-card">("ach-details");

  const handleAddPaymentMethod = () => {
    // For ACH, we need to make sure we've completed both steps
    if (paymentMethodType === "ach" && achStep === "ach-details") {
      // Move to backup card step
      setACHStep("backup-card");
      return;
    }
    
    onAddPaymentMethod(paymentMethodType);
  };

  const handleClose = () => {
    // Reset steps when closing
    setACHStep("ach-details");
    onClose();
  };

  const handleBackToACHDetails = () => {
    setACHStep("ach-details");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {paymentMethodType === "ach" && achStep === "backup-card" ? (
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mr-2 h-8 w-8 p-0" 
                  onClick={handleBackToACHDetails}
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
            {paymentMethodType === "ach" && achStep === "backup-card" 
              ? "A backup credit card is required when using ACH payments." 
              : "Enter your payment details to add a new payment method."}
          </DialogDescription>
        </DialogHeader>
        
        {paymentMethodType === "ach" && achStep === "backup-card" ? (
          <ScrollArea className="flex-1 px-1">
            <div className="py-4">
              <CreditCardForm
                newPaymentMethod={{
                  cardNumber: newACHMethod.backupCardNumber,
                  cardholderName: newACHMethod.backupCardholderName,
                  expiry: newACHMethod.backupExpiry,
                  cvc: newACHMethod.backupCvc,
                  makeDefault: false, // Backup card can't be default
                }}
                setNewPaymentMethod={(values) => {
                  setNewACHMethod({
                    ...newACHMethod,
                    backupCardNumber: values.cardNumber,
                    backupCardholderName: values.cardholderName,
                    backupExpiry: values.expiry,
                    backupCvc: values.cvc,
                  });
                }}
              />
            </div>
          </ScrollArea>
        ) : (
          <>
            <Tabs 
              defaultValue="card" 
              value={paymentMethodType}
              onValueChange={(value) => {
                setPaymentMethodType(value as PaymentMethodType);
                setACHStep("ach-details"); // Reset ACH step when changing tab
              }}
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="card" className="flex items-center gap-2">
                  <CreditCardIcon className="h-4 w-4" />
                  Credit Card
                </TabsTrigger>
                <TabsTrigger value="ach" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Bank Account (ACH)
                </TabsTrigger>
              </TabsList>
              
              <ScrollArea className="flex-1 mt-4 px-1 max-h-[50vh]">
                <TabsContent value="card" className="mt-4">
                  <CreditCardForm 
                    newPaymentMethod={newPaymentMethod}
                    setNewPaymentMethod={setNewPaymentMethod}
                  />
                </TabsContent>
                
                <TabsContent value="ach" className="mt-4">
                  <ACHForm 
                    newACHMethod={newACHMethod}
                    setNewACHMethod={setNewACHMethod}
                    showBackupCardSection={false}
                  />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </>
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
