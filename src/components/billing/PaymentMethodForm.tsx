
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Check, Lock } from "lucide-react";
import { BuildingBank } from "lucide-react"; // Using BuildingBank instead of Bank
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const PaymentMethodForm = () => {
  const [paymentType, setPaymentType] = useState<'card' | 'bank'>('card');
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Payment Method</h3>
        <div className="grid grid-cols-2 gap-3">
          <div 
            className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer ${
              paymentType === 'card' 
                ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setPaymentType('card')}
          >
            <CreditCard className="h-5 w-5" />
            <span>Card</span>
          </div>
          
          <div 
            className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer ${
              paymentType === 'bank' 
                ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setPaymentType('bank')}
          >
            <BuildingBank className="h-5 w-5" />
            <span>US bank account</span>
          </div>
        </div>
      </div>
      
      {paymentType === 'card' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <div className="relative">
              <Input id="fullName" placeholder="Name on card" />
              <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card number</Label>
            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry date</Label>
              <Input id="expiryDate" placeholder="MM / YY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="CVC" type="password" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">Billing address</Label>
            <Select defaultValue="us">
              <SelectTrigger id="country">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="Address" />
          </div>
          
          <div className="pt-2">
            <Button variant="link" className="p-0 h-auto text-sm text-primary">
              Enter address manually
            </Button>
          </div>
        </div>
      )}
      
      {paymentType === 'bank' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <div className="relative">
              <Input id="fullName" placeholder="Full name" />
              <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">Billing address</Label>
            <Select defaultValue="us">
              <SelectTrigger id="country">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="Address" />
          </div>
          
          <div className="pt-2 mb-4">
            <Button variant="link" className="p-0 h-auto text-sm text-primary">
              Enter address manually
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="bankSearch">Bank account</Label>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Lock className="h-3 w-3" />
                <span>Secured by Stripe</span>
              </div>
            </div>
            <div className="relative">
              <Input id="bankSearch" placeholder="Search for your bank" className="pl-10" />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
              <p className="font-medium">Test Institution</p>
            </div>
            <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
              <p className="font-medium">Test OAuth</p>
              <p className="text-sm text-muted-foreground">Institution</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
