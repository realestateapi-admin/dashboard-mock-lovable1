
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface CreditCardFormSectionProps {
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
  isLoading?: boolean;
  showMakeDefaultOption?: boolean;
  makeDefault?: boolean;
  onMakeDefaultChange?: (checked: boolean) => void;
}

export const CreditCardFormSection = ({
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
  isLoading = false,
  showMakeDefaultOption = false,
  makeDefault = false,
  onMakeDefaultChange,
}: CreditCardFormSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cardName">Cardholder Name</Label>
          <Input 
            id="cardName" 
            placeholder="John Smith" 
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input 
            id="cardNumber" 
            placeholder="1234 5678 9012 3456" 
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input 
            id="expiry" 
            placeholder="MM/YY" 
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input 
            id="cvc" 
            placeholder="123" 
            type="password"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="zipCode">ZIP/Postal Code</Label>
        <Input 
          id="zipCode" 
          placeholder="12345" 
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      {showMakeDefaultOption && (
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox 
            id="makeDefaultCard"
            checked={makeDefault}
            onCheckedChange={(checked) => onMakeDefaultChange?.(checked as boolean)}
            disabled={isLoading}
          />
          <Label htmlFor="makeDefaultCard" className="text-sm font-medium">
            Make this my default payment method
          </Label>
        </div>
      )}
    </div>
  );
};
