import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaymentMethodSkeleton } from "../billing/wizard/SkeletonLoading";

interface PaymentMethodFormProps {
  isLoading?: boolean;
  creditCardInfo?: {
    cardName?: string;
    cardNumber?: string;
    expiry?: string;
    cvc?: string;
    zipCode?: string;
  } | null;
}

export const PaymentMethodForm = ({ 
  isLoading = false, 
  creditCardInfo = null
}: PaymentMethodFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");
  
  // State for credit card form fields
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [zipCode, setZipCode] = useState("");
  
  // Pre-fill form with creditCardInfo if provided
  useEffect(() => {
    if (creditCardInfo) {
      setCardName(creditCardInfo.cardName || "");
      setCardNumber(creditCardInfo.cardNumber || "");
      setExpiry(creditCardInfo.expiry || "");
      setCvc(creditCardInfo.cvc || "");
      setZipCode(creditCardInfo.zipCode || "");
    } else {
      // Try to get stored credit card info from localStorage
      const storedCreditCardInfo = localStorage.getItem("creditCardInfo");
      if (storedCreditCardInfo) {
        try {
          const parsedInfo = JSON.parse(storedCreditCardInfo);
          setCardName(parsedInfo.cardName || "");
          setCardNumber(parsedInfo.cardNumber || "");
          setExpiry(parsedInfo.expiry || "");
          setCvc(parsedInfo.cvc || "");
          setZipCode(parsedInfo.zipCode || "");
        } catch (error) {
          console.error("Error parsing stored credit card info:", error);
        }
      }
    }
  }, [creditCardInfo]);
  
  if (isLoading) {
    return <PaymentMethodSkeleton />;
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Payment Method</h3>
      
      <Tabs defaultValue="card" onValueChange={(value) => setPaymentMethod(value as "card" | "bank")}>
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="card" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Credit Card</span>
          </TabsTrigger>
          <TabsTrigger value="bank" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>Bank Account</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="card" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input 
                id="cardName" 
                placeholder="John Smith" 
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input 
                id="cardNumber" 
                placeholder="1234 5678 9012 3456" 
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="billingAddress">Billing Address</Label>
            <Input id="billingAddress" placeholder="123 Main St" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input 
                id="expiry" 
                placeholder="MM/YY" 
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input 
                id="cvc" 
                placeholder="123" 
                type="password"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP/Postal Code</Label>
            <Input 
              id="zipCode" 
              placeholder="12345" 
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="bank" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Holder Name</Label>
              <Input id="accountName" placeholder="John Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountType">Account Type</Label>
              <Input id="accountType" placeholder="Checking" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="routingNumber">Routing Number</Label>
            <Input id="routingNumber" placeholder="123456789" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input id="accountNumber" placeholder="1234567890123456" />
          </div>
          
          <div className="p-4 bg-muted/20 border border-muted rounded-md">
            <p className="text-sm text-muted-foreground">
              By providing your bank account information, you authorize us to debit the above account for subscription charges.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
