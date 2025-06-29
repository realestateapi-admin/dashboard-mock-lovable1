
/**
 * Format card number with spaces every 4 digits
 * @param value - Raw card number string
 * @returns Formatted card number string
 */
export const formatCardNumber = (value: string): string => {
  // Remove all non-digits
  const digitsOnly = value.replace(/[^\d]/g, '');
  
  // Limit to 19 digits (max for any card type)
  const limitedDigits = digitsOnly.slice(0, 19);
  
  // Add spaces every 4 digits
  return limitedDigits.replace(/(.{4})/g, '$1 ').trim();
};

/**
 * Format expiry date as MM/YY
 * @param value - Raw expiry string
 * @returns Formatted expiry string
 */
export const formatExpiryDate = (value: string): string => {
  // Remove all non-digits
  const digitsOnly = value.replace(/[^\d]/g, '');
  
  // Limit to 4 digits
  const limitedDigits = digitsOnly.slice(0, 4);
  
  // Add slash after 2 digits
  if (limitedDigits.length >= 2) {
    return limitedDigits.slice(0, 2) + '/' + limitedDigits.slice(2);
  }
  
  return limitedDigits;
};

/**
 * Format CVC to limit digits
 * @param value - Raw CVC string
 * @returns Formatted CVC string
 */
export const formatCvc = (value: string): string => {
  // Remove all non-digits and limit to 4 digits
  return value.replace(/[^\d]/g, '').slice(0, 4);
};

/**
 * Format ZIP code
 * @param value - Raw ZIP string
 * @returns Formatted ZIP string
 */
export const formatZipCode = (value: string): string => {
  // Allow digits, letters, spaces, and hyphens for international postal codes
  return value.replace(/[^a-zA-Z0-9\s-]/g, '').slice(0, 10);
};
