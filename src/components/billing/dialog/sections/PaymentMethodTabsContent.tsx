
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCardIcon, Building } from "lucide-react";
import { CreditCardForm } from "../../CreditCardForm";
import { ACHForm } from "../../ACHForm";

type PaymentMethodType = "card" | "ach";

interface PaymentMethodTabsContentProps {
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
}

export const PaymentMethodTabsContent: React.FC<PaymentMethodTabsContentProps> = ({
  paymentMethodType,
  onPaymentTypeChange,
  newPaymentMethod,
  setNewPaymentMethod,
  newACHMethod,
  setNewACHMethod
}) => {
  // Handle tab change
  const handleTabChange = (value: string) => {
    onPaymentTypeChange(value as PaymentMethodType);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Payment Method</h3>
      <Tabs 
        value={paymentMethodType}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full sticky top-0 z-10 bg-background">
          <TabsTrigger 
            value="card" 
            className="flex items-center gap-2"
          >
            <CreditCardIcon className="h-4 w-4" />
            Credit Card
          </TabsTrigger>
          <TabsTrigger 
            value="ach" 
            className="flex items-center gap-2"
          >
            <Building className="h-4 w-4" />
            Bank Account (ACH)
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-4">
          <TabsContent value="card" className="mt-0 p-0">
            <CreditCardForm 
              newPaymentMethod={newPaymentMethod}
              setNewPaymentMethod={setNewPaymentMethod}
            />
          </TabsContent>
          
          <TabsContent value="ach" className="mt-0 p-0">
            <ACHForm 
              newACHMethod={newACHMethod}
              setNewACHMethod={setNewACHMethod}
              showBackupCardSection={false}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
