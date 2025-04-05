
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BackupCreditCardSectionProps {
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

export const BackupCreditCardSection = ({
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
}: BackupCreditCardSectionProps) => {
  return (
    <div className="mt-2 p-4 border border-amber-200 rounded-md space-y-4">
      <h4 className="font-medium text-sm">Backup Credit Card Information</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="backupCardName">Cardholder Name</Label>
          <Input 
            id="backupCardName" 
            placeholder="John Smith" 
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="backupCardNumber">Card Number</Label>
          <Input 
            id="backupCardNumber" 
            placeholder="1234 5678 9012 3456" 
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="backupExpiry">Expiry Date</Label>
          <Input 
            id="backupExpiry" 
            placeholder="MM/YY" 
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="backupCvc">CVC</Label>
          <Input 
            id="backupCvc" 
            placeholder="123" 
            type="password"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="backupZipCode">ZIP/Postal Code</Label>
        <Input 
          id="backupZipCode" 
          placeholder="12345" 
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
        />
      </div>
    </div>
  );
};
