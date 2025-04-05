
import { useState } from "react";
import { PaymentMethod } from "../types";

export const usePaymentMethodState = () => {
  // Payment methods list state
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "pm_123", type: "Visa", lastFour: "4242", expiryDate: "12/2025", isDefault: true },
    { id: "pm_456", type: "Mastercard", lastFour: "5555", expiryDate: "10/2024", isDefault: false },
  ]);
  
  // Dialog state management
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [methodToRemove, setMethodToRemove] = useState<string | null>(null);
  
  // Form state for credit card
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: "",
    cardholderName: "",
    expiry: "",
    cvc: "",
    makeDefault: false,
  });
  
  // Form state for ACH method
  const [newACHMethod, setNewACHMethod] = useState({
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

  return {
    paymentMethods,
    setPaymentMethods,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isRemoveDialogOpen,
    setIsRemoveDialogOpen,
    methodToRemove,
    setMethodToRemove,
    newPaymentMethod,
    setNewPaymentMethod,
    newACHMethod,
    setNewACHMethod
  };
};
