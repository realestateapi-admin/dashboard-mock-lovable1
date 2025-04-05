
import { useToast } from "@/hooks/use-toast";
import { PaymentMethod } from "../types";

export const usePaymentMethodOperations = (
  paymentMethods: PaymentMethod[],
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>,
  setIsRemoveDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setMethodToRemove: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const { toast } = useToast();

  const handleRemovePaymentMethod = (methodToRemove: string | null) => {
    if (!methodToRemove) return;
    
    setPaymentMethods(paymentMethods.filter(method => method.id !== methodToRemove));
    setIsRemoveDialogOpen(false);
    setMethodToRemove(null);
    
    toast({
      title: "Payment method removed",
      description: "Your payment method has been removed successfully.",
    });
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id,
    })));
    
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated successfully.",
    });
  };

  const handleRequestRemove = (id: string) => {
    if (paymentMethods.length === 1) {
      toast({
        title: "Cannot remove payment method",
        description: "You must have at least one payment method on file. Add a new method before removing this one.",
        variant: "destructive",
      });
      return;
    }
    
    // If it's the default payment method, show warning
    const method = paymentMethods.find(m => m.id === id);
    if (method?.isDefault) {
      toast({
        title: "Cannot remove default payment method",
        description: "Please set another payment method as default before removing this one.",
        variant: "destructive",
      });
      return;
    }
    
    setMethodToRemove(id);
    setIsRemoveDialogOpen(true);
  };

  return {
    handleRemovePaymentMethod,
    handleSetDefault,
    handleRequestRemove
  };
};
