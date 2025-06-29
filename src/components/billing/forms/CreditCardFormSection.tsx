
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock } from "lucide-react";
import { validateLuhn } from "@/utils/luhnValidation";
import { formatCardNumber, formatExpiryDate, formatCvc, formatZipCode } from "@/components/onboarding/wizard/hooks/utils/creditCardFormatting";
import { validateExpiryDate } from "@/components/onboarding/wizard/hooks/utils/creditCardValidation";

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
  const [cardNumberError, setCardNumberError] = useState<string>("");
  const [expiryError, setExpiryError] = useState<string>("");
  const [displayCvc, setDisplayCvc] = useState<string>(cvc);
  const [cvcMasked, setCvcMasked] = useState<boolean>(false);
  const [displayCardNumber, setDisplayCardNumber] = useState<string>(cardNumber);
  const [cardNumberMasked, setCardNumberMasked] = useState<boolean>(false);
  const [isCardNumberFocused, setIsCardNumberFocused] = useState<boolean>(false);

  // Helper function to mask card number - show only last 4 digits
  const maskCardNumber = (cardNumber: string): string => {
    if (!cardNumber) return '';
    const digits = cardNumber.replace(/\s/g, '');
    if (digits.length >= 4) {
      const lastFour = digits.slice(-4);
      const maskedPortion = "•".repeat(Math.max(0, digits.length - 4));
      return (maskedPortion + lastFour).replace(/(.{4})/g, "$1 ").trim();
    }
    return cardNumber;
  };

  // Handle card number input with validation
  const handleCardNumberChange = (value: string) => {
    // Remove all non-digits first
    const digitsOnly = value.replace(/[^\d]/g, '');
    // Format the digits
    const formattedValue = formatCardNumber(digitsOnly);
    setCardNumber(formattedValue);
    setDisplayCardNumber(formattedValue);
    setCardNumberMasked(false);
    
    // Real-time Luhn validation
    if (digitsOnly.length >= 13) {
      if (!validateLuhn(digitsOnly)) {
        setCardNumberError("Invalid card number");
      } else {
        setCardNumberError("");
      }
    } else {
      setCardNumberError("");
    }
  };

  // Handle card number focus
  const handleCardNumberFocus = () => {
    setIsCardNumberFocused(true);
    // If card number is masked, show the actual value for editing
    if (cardNumberMasked) {
      setDisplayCardNumber(cardNumber);
      setCardNumberMasked(false);
    }
  };

  // Handle card number blur
  const handleCardNumberBlur = () => {
    setIsCardNumberFocused(false);
    // If there's a value and it's complete, mask it after a short delay
    if (cardNumber && cardNumber.replace(/\s/g, '').length >= 13) {
      setTimeout(() => {
        if (!isCardNumberFocused) {
          setDisplayCardNumber(maskCardNumber(cardNumber));
          setCardNumberMasked(true);
        }
      }, 1000);
    }
  };

  // Handle expiry date input with validation
  const handleExpiryChange = (value: string) => {
    const formattedValue = formatExpiryDate(value);
    setExpiry(formattedValue);
    
    // Validate expiry date
    if (formattedValue.length === 5) {
      if (!validateExpiryDate(formattedValue)) {
        setExpiryError("Expiry date must be in the future");
      } else {
        setExpiryError("");
      }
    } else {
      setExpiryError("");
    }
  };

  // Handle CVC input with masking
  const handleCvcChange = (value: string) => {
    const formattedValue = formatCvc(value);
    setCvc(formattedValue);
    setDisplayCvc(formattedValue);
    setCvcMasked(false);
    
    // Mask CVC after 2 seconds if 3 or more digits
    if (formattedValue.length >= 3) {
      setTimeout(() => {
        setCvcMasked(true);
        setDisplayCvc("•".repeat(formattedValue.length));
      }, 2000);
    }
  };

  // Handle ZIP code input
  const handleZipCodeChange = (value: string) => {
    const formattedValue = formatZipCode(value);
    setZipCode(formattedValue);
  };

  // Initialize display values when component mounts or when props change
  useEffect(() => {
    if (cardNumber && cardNumber.replace(/\s/g, '').length >= 13) {
      setDisplayCardNumber(maskCardNumber(cardNumber));
      setCardNumberMasked(true);
    } else {
      setDisplayCardNumber(cardNumber);
      setCardNumberMasked(false);
    }
  }, []);

  // Initialize CVC display
  useEffect(() => {
    if (cvc && cvc.length >= 3) {
      setCvcMasked(true);
      setDisplayCvc("•".repeat(cvc.length));
    }
  }, []);

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
          <div className="relative">
            <Input 
              id="cardNumber" 
              placeholder="1234 5678 9012 3456" 
              value={displayCardNumber}
              onChange={(e) => handleCardNumberChange(e.target.value)}
              onFocus={handleCardNumberFocus}
              onBlur={handleCardNumberBlur}
              required
              disabled={isLoading}
              className={cardNumberError ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            <Lock className="absolute top-1/2 transform -translate-y-1/2 right-3 h-4 w-4 text-gray-400" />
          </div>
          {cardNumberError && (
            <p className="text-sm text-red-600">{cardNumberError}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input 
            id="expiry" 
            placeholder="MM/YY" 
            value={expiry}
            onChange={(e) => handleExpiryChange(e.target.value)}
            required
            disabled={isLoading}
            className={expiryError ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {expiryError && (
            <p className="text-sm text-red-600">{expiryError}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input 
            id="cvc" 
            placeholder="123" 
            value={displayCvc}
            onChange={(e) => handleCvcChange(e.target.value)}
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
          onChange={(e) => handleZipCodeChange(e.target.value)}
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
