
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BackupCreditCardSection } from "./BackupCreditCardSection";

interface BankAccountFormSectionProps {
  // Bank account fields
  // Credit card backup fields (reused from main form)
  cardName: string;
  setCardName: (value: string) => void;
  cardNumber: string;
  setCardNumber: (value: string) => void;
  expiry: string;
  setExpiry: (value: string) => void;
  cvc: string;
  setCvc: (value: string) => void;
  zipCode: string;
  setZipCode: (value: string) => void;
}

export const BankAccountFormSection = ({
  cardName,
  setCardName,
  cardNumber,
  setCardNumber,
  expiry,
  setExpiry,
  cvc,
  setCvc,
  zipCode,
  setZipCode,
}: BankAccountFormSectionProps) => {
  return (
    <div className="space-y-4">
      {/* Bank account input fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="accountName">Account Holder Name</Label>
          <Input id="accountName" placeholder="John Smith" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accountType">Account Type</Label>
          <Input id="accountType" placeholder="Checking" required />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="routingNumber">Routing Number</Label>
        <Input id="routingNumber" placeholder="123456789" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input id="accountNumber" placeholder="1234567890123456" required />
      </div>
      
      <div className="p-4 bg-muted/20 border border-muted rounded-md">
        <p className="text-sm text-muted-foreground">
          By providing your bank account information, you authorize us to debit the above account for subscription charges.
        </p>
      </div>
      
      {/* Credit card backup fields for bank account option */}
      <Alert className="mt-6 bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          A credit card is required as a backup payment method when using bank account
        </AlertDescription>
      </Alert>
      
      <BackupCreditCardSection
        cardName={cardName}
        setCardName={setCardName}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        expiry={expiry}
        setExpiry={setExpiry}
        cvc={cvc}
        setCvc={setCvc}
        zipCode={zipCode}
        setZipCode={setZipCode}
      />
    </div>
  );
};
