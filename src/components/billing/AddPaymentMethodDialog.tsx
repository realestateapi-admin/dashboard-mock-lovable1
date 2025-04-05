
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
import { CreditCardIcon, Building } from "lucide-react";
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

  const handleAddPaymentMethod = () => {
    onAddPaymentMethod(paymentMethodType);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogDescription>
            Enter your payment details to add a new payment method.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs 
          defaultValue="card" 
          onValueChange={(value) => setPaymentMethodType(value as PaymentMethodType)}
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
          
          <ScrollArea className="max-h-[60vh]">
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
              />
            </TabsContent>
          </ScrollArea>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAddPaymentMethod}>
            Add Payment Method
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
