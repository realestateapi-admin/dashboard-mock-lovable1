
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="billingAddress">Billing Address</Label>
        <Input 
          id="billingAddress" 
          placeholder="123 Main St"
          required 
        />
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
        />
      </div>
    </div>
  );
};
