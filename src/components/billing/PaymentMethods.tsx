
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCardIcon, PlusCircle, Trash2, Building, AlertCircle } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [paymentMethodType, setPaymentMethodType] = useState<"card" | "ach">("card");
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
    // Add backup credit card fields for ACH
    backupCardNumber: "",
    backupCardholderName: "",
    backupExpiry: "",
    backupCvc: "",
  });

  // Validate ACH form before submission
  const isACHFormValid = () => {
    // When using ACH, backup credit card is required
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

  const handleAddPaymentMethod = () => {
    // In a real app, this would send the payment info to a payment processor
    let newMethod: PaymentMethod;
    
    if (paymentMethodType === "card") {
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
      
      // ACH payment method
      newMethod = {
        id: `pm_${Math.random().toString(36).substring(2, 9)}`,
        type: "ACH",
        lastFour: newACHMethod.accountNumber.slice(-4),
        expiryDate: "N/A", // ACH doesn't have expiry
        isDefault: newACHMethod.makeDefault,
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
    if ((paymentMethodType === "card" && newPaymentMethod.makeDefault) || 
        (paymentMethodType === "ach" && newACHMethod.makeDefault)) {
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
      description: `Your new ${paymentMethodType === "card" ? "card" : "bank account"} payment method has been added successfully.`,
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
              {method.type === "ACH" ? (
                <Building className="h-5 w-5 text-primary" />
              ) : (
                <CreditCardIcon className="h-5 w-5 text-primary" />
              )}
              <div>
                <p className="font-medium">{method.type} ending in {method.lastFour}</p>
                <p className="text-sm text-muted-foreground">
                  {method.type === "ACH" ? "Bank Account" : `Expires ${method.expiryDate}`}
                </p>
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
              Enter your payment details to add a new payment method.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs 
            defaultValue="card" 
            onValueChange={(value) => setPaymentMethodType(value as "card" | "ach")}
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="card" className="flex items-center gap-2">
                <CreditCardIcon className="h-4 w-4" />
                Credit Card
              </TabsTrigger>
              <TabsTrigger value="ach" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Bank Account (ACH)
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="card" className="mt-4">
              <div className="grid gap-4 py-2">
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
                    id="makeDefaultCard"
                    checked={newPaymentMethod.makeDefault}
                    onChange={(e) => setNewPaymentMethod({...newPaymentMethod, makeDefault: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="makeDefaultCard" className="text-sm font-medium">
                    Make this my default payment method
                  </Label>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ach" className="mt-4">
              <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <Label htmlFor="accountName">Account Holder Name</Label>
                  <Input
                    id="accountName"
                    value={newACHMethod.accountName}
                    onChange={(e) => setNewACHMethod({...newACHMethod, accountName: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input
                    id="routingNumber"
                    value={newACHMethod.routingNumber}
                    onChange={(e) => setNewACHMethod({...newACHMethod, routingNumber: e.target.value})}
                    placeholder="123456789"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={newACHMethod.accountNumber}
                    onChange={(e) => setNewACHMethod({...newACHMethod, accountNumber: e.target.value})}
                    placeholder="•••••••••••"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="checking"
                        value="checking"
                        checked={newACHMethod.accountType === "checking"}
                        onChange={() => setNewACHMethod({...newACHMethod, accountType: "checking"})}
                        className="h-4 w-4 border-gray-300"
                      />
                      <Label htmlFor="checking" className="ml-2 text-sm font-medium">Checking</Label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="savings"
                        value="savings"
                        checked={newACHMethod.accountType === "savings"}
                        onChange={() => setNewACHMethod({...newACHMethod, accountType: "savings"})}
                        className="h-4 w-4 border-gray-300"
                      />
                      <Label htmlFor="savings" className="ml-2 text-sm font-medium">Savings</Label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="makeDefaultACH"
                    checked={newACHMethod.makeDefault}
                    onChange={(e) => setNewACHMethod({...newACHMethod, makeDefault: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="makeDefaultACH" className="text-sm font-medium">
                    Make this my default payment method
                  </Label>
                </div>
                <div className="p-3 mt-2 bg-muted/20 border border-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    By providing your bank account information, you authorize us to debit the above account for all agreed-upon subscription charges.
                  </p>
                </div>
                
                {/* Required Backup Credit Card Section for ACH */}
                <Alert className="mt-4 bg-amber-50 border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    A credit card is required as a backup payment method when using bank account
                  </AlertDescription>
                </Alert>
                
                <div className="mt-2 p-4 border border-amber-200 rounded-md space-y-4">
                  <h4 className="font-medium text-sm">Backup Credit Card Information</h4>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="backupCardholderName">Cardholder Name</Label>
                    <Input
                      id="backupCardholderName"
                      value={newACHMethod.backupCardholderName}
                      onChange={(e) => setNewACHMethod({...newACHMethod, backupCardholderName: e.target.value})}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="backupCardNumber">Card Number</Label>
                    <Input
                      id="backupCardNumber"
                      value={newACHMethod.backupCardNumber}
                      onChange={(e) => setNewACHMethod({...newACHMethod, backupCardNumber: e.target.value})}
                      placeholder="•••• •••• •••• ••••"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="backupExpiry">Expiry Date</Label>
                      <Input
                        id="backupExpiry"
                        value={newACHMethod.backupExpiry}
                        onChange={(e) => setNewACHMethod({...newACHMethod, backupExpiry: e.target.value})}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="backupCvc">CVC</Label>
                      <Input
                        id="backupCvc"
                        value={newACHMethod.backupCvc}
                        onChange={(e) => setNewACHMethod({...newACHMethod, backupCvc: e.target.value})}
                        placeholder="•••"
                        type="password"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-4">
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
