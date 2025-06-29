
// ACH validation utilities

export const validateRoutingNumber = (routingNumber: string): { isValid: boolean; error?: string } => {
  // Remove any spaces or dashes
  const cleaned = routingNumber.replace(/[\s-]/g, '');
  
  // Check if it's exactly 9 digits
  if (!/^\d{9}$/.test(cleaned)) {
    return {
      isValid: false,
      error: 'Routing number must be exactly 9 digits'
    };
  }
  
  // ABA routing number checksum validation
  const digits = cleaned.split('').map(Number);
  const checksum = (
    3 * (digits[0] + digits[3] + digits[6]) +
    7 * (digits[1] + digits[4] + digits[7]) +
    1 * (digits[2] + digits[5] + digits[8])
  ) % 10;
  
  if (checksum !== 0) {
    return {
      isValid: false,
      error: 'Invalid routing number format'
    };
  }
  
  return { isValid: true };
};

export const validateAccountNumber = (accountNumber: string): { isValid: boolean; error?: string } => {
  // Remove any spaces or dashes
  const cleaned = accountNumber.replace(/[\s-]/g, '');
  
  // Check if it's empty
  if (!cleaned) {
    return {
      isValid: false,
      error: 'Account number is required'
    };
  }
  
  // Check if it contains only numbers
  if (!/^\d+$/.test(cleaned)) {
    return {
      isValid: false,
      error: 'Account number must contain only numbers'
    };
  }
  
  // Check length (typically 4-17 digits)
  if (cleaned.length < 4 || cleaned.length > 17) {
    return {
      isValid: false,
      error: 'Account number must be between 4 and 17 digits'
    };
  }
  
  return { isValid: true };
};

export const formatRoutingNumber = (value: string): string => {
  // Remove non-digits and limit to 9 characters
  return value.replace(/\D/g, '').slice(0, 9);
};

export const formatAccountNumber = (value: string): string => {
  // Remove non-digits and limit to 17 characters
  return value.replace(/\D/g, '').slice(0, 17);
};
