
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCardIcon, PlusCircle, Trash2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type PaymentMethod = {
  id: string;
  type: string;
  lastFour: string;
  expiryDate: string;
  isDefault: boolean;
};

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

  const handleAddPaymentMethod = () => {
    // In a real app, this would send the payment info to a payment processor
    const newMethod: PaymentMethod = {
      id: `pm_${Math.random().toString(36).substring(2, 9)}`,
      type: "Visa", // This would be detected from the card number
      lastFour: newPaymentMethod.cardNumber.slice(-4),
      expiryDate: newPaymentMethod.expiry,
      isDefault: newPaymentMethod.makeDefault,
    };
    
    // If this is set as default, update other cards
    let updatedMethods = [...paymentMethods];
    if (newPaymentMethod.makeDefault) {
      updatedMethods = updatedMethods.map(method => ({
        ...method,
        isDefault: false,
      }));
    }
    
    setPaymentMethods([...updatedMethods, newMethod]);
    setIsAddDialogOpen(false);
    setNewPaymentMethod({
      cardNumber: "",
      cardholderName: "",
      expiry: "",
      cvc: "",
      makeDefault: false,
    });
    
    toast({
      title: "Payment method added",
      description: "Your new payment method has been added successfully.",
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
          <div key={method.id} className="border rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CreditCardIcon className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{method.type} ending in {method.lastFour}</p>
                <p className="text-sm text-muted-foreground">Expires {method.expiryDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {method.isDefault ? (
                <Badge>Default</Badge>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSetDefault(method.id)}
                >
                  Set Default
                </Button>
              )}
              {!method.isDefault && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive"
                  onClick={() => handleRequestRemove(method.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
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
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Enter your card details to add a new payment method.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                value={newPaymentMethod.cardholderName}
                onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardholderName: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={newPaymentMethod.cardNumber}
                onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardNumber: e.target.value})}
                placeholder="•••• •••• •••• ••••"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  value={newPaymentMethod.expiry}
                  onChange={(e) => setNewPaymentMethod({...newPaymentMethod, expiry: e.target.value})}
                  placeholder="MM/YY"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  value={newPaymentMethod.cvc}
                  onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cvc: e.target.value})}
                  placeholder="•••"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="makeDefault"
                checked={newPaymentMethod.makeDefault}
                onChange={(e) => setNewPaymentMethod({...newPaymentMethod, makeDefault: e.target.checked})}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="makeDefault" className="text-sm font-medium">
                Make this my default payment method
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPaymentMethod}>
              Add Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Remove Payment Method Dialog */}
      <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remove Payment Method</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this payment method?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRemoveDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRemovePaymentMethod}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
