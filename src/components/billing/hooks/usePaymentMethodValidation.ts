
import { useToast } from "@/hooks/use-toast";

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
    return (
      newACHMethod.accountName.trim() !== "" &&
      newACHMethod.routingNumber.trim() !== "" &&
      newACHMethod.accountNumber.trim() !== "" &&
      newACHMethod.backupCardNumber.trim() !== "" &&
      newACHMethod.backupCardholderName.trim() !== "" &&
      newACHMethod.backupExpiry.trim() !== "" &&
      newACHMethod.backupCvc.trim() !== ""
    );
  };

  // Validate credit card form before submission
  const isCreditCardFormValid = (newPaymentMethod: {
    cardNumber: string;
    cardholderName: string;
    expiry: string;
    cvc: string;
    makeDefault: boolean;
  }) => {
    return (
      newPaymentMethod.cardNumber.trim() !== "" || 
      newPaymentMethod.cardholderName.trim() !== "" ||
      newPaymentMethod.expiry.trim() !== "" ||
      newPaymentMethod.cvc.trim() !== ""
    );
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
