
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCardIcon, Building, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  achDetails?: {
    accountName: string;
    accountType: string;
    routingNumber: string;
    accountNumber: string;
  };
  handleCardDetailsChange: (field: string, value: string) => void;
  handleBackupCardDetailsChange: (field: string, value: string) => void;
  handleACHDetailsChange?: (field: string, value: string) => void;
  isLoading: boolean;
  cardMakeDefault?: boolean;
  achMakeDefault?: boolean;
  onCardMakeDefaultChange?: (checked: boolean) => void;
  onAchMakeDefaultChange?: (checked: boolean) => void;
}

export const PaymentDetailsSection: React.FC<PaymentDetailsProps> = ({
  paymentMethodType,
  handlePaymentTypeChange,
  cardDetails,
  backupCardDetails,
  achDetails,
  handleCardDetailsChange,
  handleBackupCardDetailsChange,
  handleACHDetailsChange,
  isLoading,
  cardMakeDefault = true,
  achMakeDefault = false,
  onCardMakeDefaultChange,
  onAchMakeDefaultChange,
}) => {
  const handleCardMakeDefaultChange = (checked: boolean) => {
    if (onCardMakeDefaultChange) {
      onCardMakeDefaultChange(checked);
    }
    if (checked && onAchMakeDefaultChange) {
      onAchMakeDefaultChange(false);
    }
  };

  const handleAchMakeDefaultChange = (checked: boolean) => {
    if (onAchMakeDefaultChange) {
      onAchMakeDefaultChange(checked);
    }
    if (checked && onCardMakeDefaultChange) {
      onCardMakeDefaultChange(false);
    }
  };

  return (
    <div className="space-y-4 pb-6 border-b">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Payment Details</h3>
        <p className="text-sm text-muted-foreground">
          Pay for your subscription either by credit card or ACH
        </p>
      </div>
      
      {/* Warning message when ACH is set as default */}
      {achMakeDefault && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            A credit card is required as a backup payment method when using bank account. Please fill out the Credit Card section as well.
          </AlertDescription>
        </Alert>
      )}
      
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
              makeDefault={cardMakeDefault}
              onMakeDefaultChange={handleCardMakeDefaultChange}
            />
          </TabsContent>
          
          <TabsContent value="ach" className="mt-0 p-0 space-y-4">
            <BankAccountFormSection
              makeDefault={achMakeDefault}
              onMakeDefaultChange={handleAchMakeDefaultChange}
              accountName={achDetails?.accountName}
              onAccountNameChange={(value) => handleACHDetailsChange?.("accountName", value)}
              accountType={achDetails?.accountType}
              onAccountTypeChange={(value) => handleACHDetailsChange?.("accountType", value)}
              routingNumber={achDetails?.routingNumber}
              onRoutingNumberChange={(value) => handleACHDetailsChange?.("routingNumber", value)}
              accountNumber={achDetails?.accountNumber}
              onAccountNumberChange={(value) => handleACHDetailsChange?.("accountNumber", value)}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
