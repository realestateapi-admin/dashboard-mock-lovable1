
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PaymentMethod } from "./types";
import { PaymentMethodItem } from "./PaymentMethodItem";
import { AddPaymentMethodDialog } from "./AddPaymentMethodDialog";
import { RemovePaymentMethodDialog } from "./RemovePaymentMethodDialog";

export const PaymentMethods = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "pm_123", type: "Visa", lastFour: "4242", expiryDate: "12/2025", isDefault: true },
    { id: "pm_456", type: "Mastercard", lastFour: "5555", expiryDate: "10/2024", isDefault: false },
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [methodToRemove, setMethodToRemove] = useState<string | null>(null);
  
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: "",
    cardholderName: "",
    expiry: "",
    cvc: "",
    makeDefault: false,
  });
  
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

  // Validate ACH form before submission
  const isACHFormValid = () => {
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

  const handleAddPaymentMethod = (type: "card" | "ach") => {
    // In a real app, this would send the payment info to a payment processor
    let newMethod: PaymentMethod;
    
    if (type === "card") {
      newMethod = {
        id: `pm_${Math.random().toString(36).substring(2, 9)}`,
        type: "Visa", // This would be detected from the card number
        lastFour: newPaymentMethod.cardNumber.slice(-4),
        expiryDate: newPaymentMethod.expiry,
        isDefault: newPaymentMethod.makeDefault,
      };
    } else {
      // Validate ACH form first
      if (!isACHFormValid()) {
        toast({
          title: "Missing information",
          description: "Please complete all required fields including backup credit card information.",
          variant: "destructive",
        });
        return;
      }
      
      // ACH payment method - actually add it to the list now
      newMethod = {
        id: `pm_${Math.random().toString(36).substring(2, 9)}`,
        type: "ACH",
        lastFour: newACHMethod.accountNumber.slice(-4),
        expiryDate: "N/A", // ACH doesn't have expiry
        isDefault: newACHMethod.makeDefault,
        accountType: newACHMethod.accountType, // Add account type for display
        accountName: newACHMethod.accountName, // Add account name for display
      };
      
      // In a real app, we would also store the backup card info
      console.log("Backup credit card info:", {
        cardNumber: newACHMethod.backupCardNumber,
        cardholderName: newACHMethod.backupCardholderName,
        expiry: newACHMethod.backupExpiry,
        cvc: newACHMethod.backupCvc,
      });
    }
    
    // If this is set as default, update other cards
    let updatedMethods = [...paymentMethods];
    if ((type === "card" && newPaymentMethod.makeDefault) || 
        (type === "ach" && newACHMethod.makeDefault)) {
      updatedMethods = updatedMethods.map(method => ({
        ...method,
        isDefault: false,
      }));
    }
    
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

  const handleRemovePaymentMethod = () => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>
          Manage your payment methods and billing information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {paymentMethods.map((method) => (
          <PaymentMethodItem
            key={method.id}
            method={method}
            onSetDefault={handleSetDefault}
            onRequestRemove={handleRequestRemove}
          />
        ))}
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <PlusCircle className="h-4 w-4" />
          Add Payment Method
        </Button>
      </CardContent>
      
      {/* Add Payment Method Dialog */}
      <AddPaymentMethodDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddPaymentMethod={handleAddPaymentMethod}
        newPaymentMethod={newPaymentMethod}
        setNewPaymentMethod={setNewPaymentMethod}
        newACHMethod={newACHMethod}
        setNewACHMethod={setNewACHMethod}
      />
      
      {/* Remove Payment Method Dialog */}
      <RemovePaymentMethodDialog
        isOpen={isRemoveDialogOpen}
        onClose={() => setIsRemoveDialogOpen(false)}
        onConfirm={handleRemovePaymentMethod}
      />
    </Card>
  );
};
