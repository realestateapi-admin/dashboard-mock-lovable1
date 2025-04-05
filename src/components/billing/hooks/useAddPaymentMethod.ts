
import { useToast } from "@/hooks/use-toast";
import { PaymentMethod } from "../types";
import { usePaymentMethodValidation } from "./usePaymentMethodValidation";

type PaymentMethodType = "card" | "ach";

export const useAddPaymentMethod = (
  paymentMethods: PaymentMethod[],
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>,
  setIsAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setNewPaymentMethod: React.Dispatch<React.SetStateAction<{
    cardNumber: string;
    cardholderName: string;
    expiry: string;
    cvc: string;
    makeDefault: boolean;
  }>>,
  setNewACHMethod: React.Dispatch<React.SetStateAction<{
    accountName: string;
    routingNumber: string;
    accountNumber: string;
    accountType: string;
    makeDefault: boolean;
    backupCardNumber: string;
    backupCardholderName: string;
    backupExpiry: string;
    backupCvc: string;
  }>>
) => {
  const { toast } = useToast();
  const { isACHFormValid, isCreditCardFormValid, showValidationError } = usePaymentMethodValidation();

  const handleAddPaymentMethod = (
    type: PaymentMethodType,
    newPaymentMethod: {
      cardNumber: string;
      cardholderName: string;
      expiry: string;
      cvc: string;
      makeDefault: boolean;
    },
    newACHMethod: {
      accountName: string;
      routingNumber: string;
      accountNumber: string;
      accountType: string;
      makeDefault: boolean;
      backupCardNumber: string;
      backupCardholderName: string;
      backupExpiry: string;
      backupCvc: string;
    }
  ) => {
    // In a real app, this would send the payment info to a payment processor
    let newMethod: PaymentMethod;
    
    if (type === "card") {
      // For credit card payment method
      if (!isCreditCardFormValid(newPaymentMethod)) {
        showValidationError("Please complete all required credit card fields.");
        return;
      }
      
      newMethod = {
        id: `pm_${Math.random().toString(36).substring(2, 9)}`,
        type: "Visa", // This would be detected from the card number
        lastFour: newPaymentMethod.cardNumber.slice(-4),
        expiryDate: newPaymentMethod.expiry,
        isDefault: newPaymentMethod.makeDefault,
      };
    } else {
      // For ACH payment method
      if (!isACHFormValid(newACHMethod)) {
        showValidationError("Please complete all required fields including backup credit card information.");
        return;
      }
      
      // ACH payment method with backup card
      newMethod = {
        id: `pm_${Math.random().toString(36).substring(2, 9)}`,
        type: "ACH",
        lastFour: newACHMethod.accountNumber.slice(-4),
        expiryDate: "N/A", // ACH doesn't have expiry
        isDefault: newACHMethod.makeDefault,
        accountType: newACHMethod.accountType,
        accountName: newACHMethod.accountName,
      };
      
      // In a real app, we would also store the backup card info
      console.log("Backup credit card info:", {
        cardNumber: newACHMethod.backupCardNumber,
        cardholderName: newACHMethod.backupCardholderName,
        expiry: newACHMethod.backupExpiry,
        cvc: newACHMethod.backupCvc,
      });
    }
    
    // If this is set as default, update other payment methods
    let updatedMethods = [...paymentMethods];
    if ((type === "card" && newPaymentMethod.makeDefault) || 
        (type === "ach" && newACHMethod.makeDefault)) {
      updatedMethods = updatedMethods.map(method => ({
        ...method,
        isDefault: false,
      }));
    }
    
    // Add the new payment method to the list
    setPaymentMethods([...updatedMethods, newMethod]);
    setIsAddDialogOpen(false);
    
    // Reset form states
    setNewPaymentMethod({
      cardNumber: "",
      cardholderName: "",
      expiry: "",
      cvc: "",
      makeDefault: false,
    });
    
    setNewACHMethod({
      accountName: "",
      routingNumber: "",
      accountNumber: "",
      accountType: "checking",
      makeDefault: false,
      backupCardNumber: "",
      backupCardholderName: "",
      backupExpiry: "",
      backupCvc: "",
    });
    
    toast({
      title: "Payment method added",
      description: `Your new ${type === "card" ? "card" : "bank account"} payment method has been added successfully.`,
    });
  };

  return { handleAddPaymentMethod };
};
