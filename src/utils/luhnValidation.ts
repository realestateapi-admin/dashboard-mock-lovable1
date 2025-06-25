
/**
 * Luhn Algorithm implementation for credit card number validation
 * @param cardNumber - The card number to validate (digits only)
 * @returns boolean - true if valid, false if invalid
 */
export const validateLuhn = (cardNumber: string): boolean => {
  // Remove any non-digit characters
  const digits = cardNumber.replace(/\D/g, '');
  
  // Must be at least 13 digits for a valid card
  if (digits.length < 13) {
    return false;
  }
  
  let sum = 0;
  let alternate = false;
  
  // Process digits from right to left
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    
    if (alternate) {
      digit *= 2;
      if (digit > 9) {
        digit = (digit % 10) + 1;
      }
    }
    
    sum += digit;
    alternate = !alternate;
  }
  
  return sum % 10 === 0;
};

/**
 * Get card type from card number
 * @param cardNumber - The card number to analyze
 * @returns string - The card type (visa, mastercard, amex, etc.)
 */
export const getCardType = (cardNumber: string): string => {
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.match(/^4/)) return 'visa';
  if (digits.match(/^5[1-5]/)) return 'mastercard';
  if (digits.match(/^3[47]/)) return 'amex';
  if (digits.match(/^6(?:011|5)/)) return 'discover';
  
  return 'unknown';
};
