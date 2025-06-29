
import { useState, useEffect } from "react";
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
  const [displayCardNumber, setDisplayCardNumber] = useState<string>(cardNumber);
  const [cardNumberMasked, setCardNumberMasked] = useState<boolean>(false);
  const [isCardNumberFocused, setIsCardNumberFocused] = useState<boolean>(false);

  // Sync display values with prop changes
  useEffect(() => {
    setDisplayCardNumber(cardNumber);
  }, [cardNumber]);

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
    const digitCount = cardNumber.replace(/\s/g, '').length;
    if (cardNumber && digitCount >= 13 && digitCount <= 19 && !cardNumberError) {
      setTimeout(() => {
        if (!isCardNumberFocused) {
          setDisplayCardNumber(maskCardNumber(cardNumber));
          setCardNumberMasked(true);
        }
      }, 1000);
    }
  };

  // Initialize display values when component mounts or when props change
  useEffect(() => {
    const digitCount = cardNumber.replace(/\s/g, '').length;
    if (cardNumber && digitCount >= 13 && digitCount <= 19) {
      setDisplayCardNumber(maskCardNumber(cardNumber));
      setCardNumberMasked(true);
    } else {
      setDisplayCardNumber(cardNumber);
      setCardNumberMasked(false);
    }
  }, []);

  return (
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
  );
};
