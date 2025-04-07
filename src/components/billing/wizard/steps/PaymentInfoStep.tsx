
import { useState } from "react";
import { CreditCardIcon, Building } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

interface PaymentInfoStepProps {
  isLoading: boolean;
}

export const PaymentInfoStep = ({ isLoading }: PaymentInfoStepProps) => {
  const [cardInfo, setCardInfo] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    zipCode: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-1">Payment Information</h3>
        <p className="text-sm text-muted-foreground">
          Update your payment details for billing
        </p>
      </div>
      
      <Tabs defaultValue="credit-card" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="credit-card" className="flex items-center gap-2">
            <CreditCardIcon className="h-4 w-4" /> Credit Card
          </TabsTrigger>
          <TabsTrigger value="company-info" className="flex items-center gap-2">
            <Building className="h-4 w-4" /> Company Information
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="credit-card" className="space-y-4 mt-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input 
                id="cardName" 
                name="cardName"
                placeholder="John Smith" 
                value={cardInfo.cardName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input 
                id="cardNumber" 
                name="cardNumber"
                placeholder="1234 5678 9012 3456" 
                value={cardInfo.cardNumber}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input 
                  id="expiryDate" 
                  name="expiryDate"
                  placeholder="MM/YY" 
                  value={cardInfo.expiryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input 
                  id="cvc" 
                  name="cvc"
                  placeholder="123" 
                  value={cardInfo.cvc}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zipCode">Zip/Postal Code</Label>
                <Input 
                  id="zipCode" 
                  name="zipCode"
                  placeholder="12345" 
                  value={cardInfo.zipCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center">
              <div className="bg-gray-200 p-2 rounded-full">
                <CreditCardIcon className="h-4 w-4 text-gray-600" />
              </div>
              <p className="text-sm text-gray-600 ml-3">
                Your payment information is securely processed and stored by our payment provider.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="company-info" className="space-y-4 mt-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" placeholder="Acme Corp" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="taxId">Tax ID / VAT Number (optional)</Label>
              <Input id="taxId" placeholder="123456789" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="billingAddress">Billing Address</Label>
              <Input id="billingAddress" placeholder="123 Business St" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="San Francisco" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" placeholder="California" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="zipCodeBilling">Zip/Postal Code</Label>
                <Input id="zipCodeBilling" placeholder="94107" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="United States" />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
