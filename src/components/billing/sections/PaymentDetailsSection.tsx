
import React from "react";
import { CreditCard, Building, AlertTriangle, ChevronDown } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CreditCardFormSection } from "../forms/CreditCardFormSection";
import { BankAccountFormSection } from "../forms/BankAccountFormSection";
import { useState } from "react";

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
  const [isCreditCardOpen, setIsCreditCardOpen] = useState(false);
  const [isACHOpen, setIsACHOpen] = useState(false);

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

  // Mask card number for display
  const getMaskedCardNumber = (cardNumber: string) => {
    if (!cardNumber) return "•••• •••• •••• ••••";
    const cleaned = cardNumber.replace(/\s/g, '');
    if (cleaned.length < 4) return "•••• •••• •••• ••••";
    return `•••• •••• •••• ${cleaned.slice(-4)}`;
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

      <div className="space-y-4">
        {/* Credit Card Section */}
        <div className="border rounded-lg">
          <Collapsible open={isCreditCardOpen} onOpenChange={setIsCreditCardOpen}>
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium flex items-center gap-2">
                    Credit Card
                    {cardMakeDefault && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {getMaskedCardNumber(cardDetails.cardNumber)}
                    {cardDetails.expiry && ` • Expires ${cardDetails.expiry}`}
                  </div>
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isCreditCardOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="p-4 pt-0 space-y-4">
                {/* Credit card transaction fee notice - only show when card is default */}
                {cardMakeDefault && (
                  <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-100">
                    Please note: A 3% transaction fee will be added to all credit card payments.
                  </div>
                )}
                
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
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Bank Account (ACH) Section */}
        <div className="border rounded-lg">
          <Collapsible open={isACHOpen} onOpenChange={setIsACHOpen}>
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium flex items-center gap-2">
                    Bank Account (ACH)
                    {achMakeDefault && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {achDetails?.accountName && achDetails?.accountNumber 
                      ? `${achDetails.accountName} • •••• ${achDetails.accountNumber.slice(-4)}`
                      : "No bank account added"
                    }
                  </div>
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isACHOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="p-4 pt-0">
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
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};
