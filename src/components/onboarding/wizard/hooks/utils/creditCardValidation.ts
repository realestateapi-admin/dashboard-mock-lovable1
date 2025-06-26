
import { validateLuhn } from "@/utils/luhnValidation";

export const validateExpiryDate = (value: string): boolean => {
  if (value.length !== 5) return true; // Don't validate incomplete dates
  
  const [month, year] = value.split('/');
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(`20${year}`, 10);
  
  // Check if month is valid
  if (monthNum < 1 || monthNum > 12) return false;
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11
  
  // Check if the expiry date is in the future
  if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
    return false;
  }
  
  return true;
};

export const validateCardNumber = (value: string): boolean => {
  const digits = value.replace(/\s/g, '');
  return digits.length >= 13 && validateLuhn(digits);
};
