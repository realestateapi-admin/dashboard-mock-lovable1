
import { useToast } from "@/hooks/use-toast";
import { validateRoutingNumber, validateAccountNumber } from "@/utils/achValidation";

export const usePaymentMethodValidation = () => {
  const { toast } = useToast();

  // Validate ACH form before submission
  const isACHFormValid = (newACHMethod: {
    accountName: string;
    routingNumber: string;
    accountNumber: string;
    accountType: string;
    makeDefault: boolean;
    backupCardNumber: string;
    backupCardholderName: string;
    backupExpiry: string;
    backupCvc: string;
  }) => {
    if (!newACHMethod.accountName.trim()) {
      showValidationError("Account holder name is required");
      return false;
    }
    
    const routingValidation = validateRoutingNumber(newACHMethod.routingNumber);
    if (!routingValidation.isValid) {
      showValidationError(routingValidation.error || "Invalid routing number");
      return false;
    }
    
    const accountValidation = validateAccountNumber(newACHMethod.accountNumber);
    if (!accountValidation.isValid) {
      showValidationError(accountValidation.error || "Invalid account number");
      return false;
    }
    
    if (!newACHMethod.backupCardNumber.trim()) {
      showValidationError("Backup card number is required");
      return false;
    }
    if (!newACHMethod.backupCardholderName.trim()) {
      showValidationError("Backup cardholder name is required");
      return false;
    }
    if (!newACHMethod.backupExpiry.trim()) {
      showValidationError("Backup card expiry date is required");
      return false;
    }
    if (!newACHMethod.backupCvc.trim()) {
      showValidationError("Backup card CVC is required");
      return false;
    }
    
    return true;
  };

  // Validate credit card form before submission
  const isCreditCardFormValid = (newPaymentMethod: {
    cardNumber: string;
    cardholderName: string;
    expiry: string;
    cvc: string;
    makeDefault: boolean;
  }) => {
    if (!newPaymentMethod.cardholderName.trim()) {
      showValidationError("Cardholder name is required");
      return false;
    }
    if (!newPaymentMethod.cardNumber.trim()) {
      showValidationError("Card number is required");
      return false;
    }
    if (!newPaymentMethod.expiry.trim()) {
      showValidationError("Expiry date is required");
      return false;
    }
    if (!newPaymentMethod.cvc.trim()) {
      showValidationError("CVC is required");
      return false;
    }
    
    return true;
  };

  // Display validation error toast
  const showValidationError = (message: string) => {
    toast({
      title: "Missing information",
      description: message,
      variant: "destructive",
    });
  };

  return {
    isACHFormValid,
    isCreditCardFormValid,
    showValidationError
  };
};
