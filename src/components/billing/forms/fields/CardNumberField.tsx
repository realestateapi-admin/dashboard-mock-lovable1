
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { validateLuhn } from "@/utils/luhnValidation";
import { formatCardNumber } from "@/components/onboarding/wizard/hooks/utils/creditCardFormatting";

interface CardNumberFieldProps {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  isLoading?: boolean;
}

export const CardNumberField = ({
  cardNumber,
  setCardNumber,
  isLoading = false,
}: CardNumberFieldProps) => {
  const [cardNumberError, setCardNumberError] = useState<string>("");

  // Handle card number input with validation
  const handleCardNumberChange = (value: string) => {
    // Remove all non-digits first
    const digitsOnly = value.replace(/[^\d]/g, '');
    // Format the digits with spaces every 4 digits
    const formattedValue = formatCardNumber(digitsOnly);
    setCardNumber(formattedValue);
    
    // Luhn validation - only validate if we have enough digits for a complete card number
    const digitCount = digitsOnly.length;
    
    if (digitCount >= 13) {
      // Card numbers must be between 13-19 digits for Luhn validation
      if (digitCount > 19) {
        setCardNumberError("Card number is too long");
      } else if (!validateLuhn(digitsOnly)) {
        setCardNumberError("Invalid card number");
      } else {
        setCardNumberError("");
      }
    } else if (digitCount > 0) {
      // Clear error if user is still typing but hasn't reached minimum length
      setCardNumberError("");
    } else {
      setCardNumberError("");
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="cardNumber">Card Number</Label>
      <div className="relative">
        <Input 
          id="cardNumber" 
          placeholder="1234 5678 9012 3456" 
          value={cardNumber}
          onChange={(e) => handleCardNumberChange(e.target.value)}
          required
          disabled={isLoading}
          className={cardNumberError ? "border-red-500 focus-visible:ring-red-500" : ""}
          maxLength={23} // Allow for 19 digits + 4 spaces
        />
        <Lock className="absolute top-1/2 transform -translate-y-1/2 right-3 h-4 w-4 text-gray-400" />
      </div>
      {cardNumberError && (
        <p className="text-sm text-red-600">{cardNumberError}</p>
      )}
    </div>
  );
};
