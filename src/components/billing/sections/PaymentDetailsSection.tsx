
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCardIcon, Building } from "lucide-react";
import { CreditCardFormSection } from "../forms/CreditCardFormSection";
import { BankAccountFormSection } from "../forms/BankAccountFormSection";

interface PaymentDetailsProps {
  paymentMethodType: "card" | "ach";
  handlePaymentTypeChange: (value: string) => void;
  cardDetails: {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
    zipCode: string;
  };
  backupCardDetails: {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
    zipCode: string;
  };
  handleCardDetailsChange: (field: string, value: string) => void;
  handleBackupCardDetailsChange: (field: string, value: string) => void;
  isLoading: boolean;
}

export const PaymentDetailsSection: React.FC<PaymentDetailsProps> = ({
  paymentMethodType,
  handlePaymentTypeChange,
  cardDetails,
  backupCardDetails,
  handleCardDetailsChange,
  handleBackupCardDetailsChange,
  isLoading,
}) => {
  return (
    <div className="space-y-4 pb-6 border-b">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Payment Details</h3>
        <p className="text-sm text-muted-foreground">
          Pay for your subscription either by credit card or ACH
        </p>
      </div>
      
      <Tabs 
        value={paymentMethodType} 
        onValueChange={handlePaymentTypeChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full">
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
          <TabsContent value="card" className="mt-0 p-0 space-y-4">
            {/* Credit card transaction fee notice */}
            <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-100">
              Please note: A 3% transaction fee will be added to all credit card payments.
            </div>
            <CreditCardFormSection
              cardName={cardDetails.cardName}
              setCardName={(value) => handleCardDetailsChange("cardName", value)}
              cardNumber={cardDetails.cardNumber}
              setCardNumber={(value) => handleCardDetailsChange("cardNumber", value)}
              expiry={cardDetails.expiry}
              setExpiry={(value) => handleCardDetailsChange("expiry", value)}
              cvc={cardDetails.cvc}
              setCvc={(value) => handleCardDetailsChange("cvc", value)}
              zipCode={cardDetails.zipCode}
              setZipCode={(value) => handleCardDetailsChange("zipCode", value)}
              isLoading={isLoading}
              showMakeDefaultOption={true}
            />
          </TabsContent>
          
          <TabsContent value="ach" className="mt-0 p-0 space-y-4">
            <BankAccountFormSection
              cardName={backupCardDetails.cardName}
              setCardName={(value) => handleBackupCardDetailsChange("cardName", value)}
              cardNumber={backupCardDetails.cardNumber}
              setCardNumber={(value) => handleBackupCardDetailsChange("cardNumber", value)}
              expiry={backupCardDetails.expiry}
              setExpiry={(value) => handleBackupCardDetailsChange("expiry", value)}
              cvc={backupCardDetails.cvc}
              setCvc={(value) => handleBackupCardDetailsChange("cvc", value)}
              zipCode={backupCardDetails.zipCode}
              setZipCode={(value) => handleBackupCardDetailsChange("zipCode", value)}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
