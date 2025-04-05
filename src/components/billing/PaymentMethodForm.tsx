
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCardIcon, Building } from "lucide-react";
import { CreditCardFormSection } from "./forms/CreditCardFormSection";
import { BankAccountFormSection } from "./forms/BankAccountFormSection";

interface PaymentMethodFormProps {
  isLoading: boolean;
  creditCardInfo?: any;
}

export const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  isLoading,
  creditCardInfo,
}) => {
  // State for payment method type
  const [paymentMethodType, setPaymentMethodType] = useState<"card" | "ach">("card");
  
  // State for company and billing information
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    billingEmail: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States"
    },
  });

  // State for billing address
  const [billingAddress, setBillingAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States"
  });

  // State for using same address
  const [useSameAddress, setUseSameAddress] = useState(false);

  // Handle input changes for company info
  const handleCompanyInfoChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle company address changes
  const handleCompanyAddressChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  // Handle billing address changes
  const handleBillingAddressChange = (field: string, value: string) => {
    setBillingAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle checkbox for using same address
  const handleUseSameAddressChange = (checked: boolean) => {
    setUseSameAddress(checked);
  };

  // Credit card state
  const [cardDetails, setCardDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    zipCode: ""
  });

  // Backup credit card state for ACH
  const [backupCardDetails, setBackupCardDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    zipCode: ""
  });

  const handleCardDetailsChange = (field: string, value: string) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBackupCardDetailsChange = (field: string, value: string) => {
    setBackupCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentTypeChange = (value: string) => {
    setPaymentMethodType(value as "card" | "ach");
  };

  return (
    <div className="space-y-8">
      {/* Company Information Section (First) */}
      <div className="space-y-4 pb-6 border-b">
        <h3 className="text-lg font-semibold">Company Information</h3>
        
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input 
              id="companyName" 
              value={companyInfo.companyName}
              onChange={(e) => handleCompanyInfoChange("companyName", e.target.value)}
              placeholder="Acme Inc."
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="billingEmail">Billing Email</Label>
            <Input 
              id="billingEmail" 
              type="email"
              value={companyInfo.billingEmail}
              onChange={(e) => handleCompanyInfoChange("billingEmail", e.target.value)}
              placeholder="billing@company.com"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressLine1">Company Address</Label>
            <Input 
              id="addressLine1" 
              value={companyInfo.address.line1}
              onChange={(e) => handleCompanyAddressChange("line1", e.target.value)}
              placeholder="123 Main St"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
            <Input 
              id="addressLine2" 
              value={companyInfo.address.line2}
              onChange={(e) => handleCompanyAddressChange("line2", e.target.value)}
              placeholder="Suite 100"
              disabled={isLoading}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                value={companyInfo.address.city}
                onChange={(e) => handleCompanyAddressChange("city", e.target.value)}
                placeholder="San Francisco"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input 
                id="state" 
                value={companyInfo.address.state}
                onChange={(e) => handleCompanyAddressChange("state", e.target.value)}
                placeholder="CA"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input 
                id="zipCode" 
                value={companyInfo.address.zipCode}
                onChange={(e) => handleCompanyAddressChange("zipCode", e.target.value)}
                placeholder="94103"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input 
                id="country" 
                value={companyInfo.address.country}
                onChange={(e) => handleCompanyAddressChange("country", e.target.value)}
                placeholder="United States"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details Section (Second) */}
      <div className="space-y-4 pb-6 border-b">
        <h3 className="text-lg font-semibold">Payment Details</h3>
        
        <Tabs 
          value={paymentMethodType} 
          onValueChange={handlePaymentTypeChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger 
              value="card" 
              className="flex items-center gap-2"
            >
              <CreditCardIcon className="h-4 w-4" />
              Credit Card
            </TabsTrigger>
            <TabsTrigger 
              value="ach" 
              className="flex items-center gap-2"
            >
              <Building className="h-4 w-4" />
              Bank Account (ACH)
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-4">
            <TabsContent value="card" className="mt-0 p-0 space-y-4">
              <CreditCardFormSection
                cardName={cardDetails.cardName}
                setCardName={(value) => handleCardDetailsChange("cardName", value)}
                cardNumber={cardDetails.cardNumber}
                setCardNumber={(value) => handleCardDetailsChange("cardNumber", value)}
                expiry={cardDetails.expiry}
                setExpiry={(value) => handleCardDetailsChange("expiry", value)}
                cvc={cardDetails.cvc}
                setCvc={(value) => handleCardDetailsChange("cvc", value)}
                zipCode={cardDetails.zipCode}
                setZipCode={(value) => handleCardDetailsChange("zipCode", value)}
                isLoading={isLoading}
                showMakeDefaultOption={true}
              />
            </TabsContent>
            
            <TabsContent value="ach" className="mt-0 p-0 space-y-4">
              <BankAccountFormSection
                cardName={backupCardDetails.cardName}
                setCardName={(value) => handleBackupCardDetailsChange("cardName", value)}
                cardNumber={backupCardDetails.cardNumber}
                setCardNumber={(value) => handleBackupCardDetailsChange("cardNumber", value)}
                expiry={backupCardDetails.expiry}
                setExpiry={(value) => handleBackupCardDetailsChange("expiry", value)}
                cvc={backupCardDetails.cvc}
                setCvc={(value) => handleBackupCardDetailsChange("cvc", value)}
                zipCode={backupCardDetails.zipCode}
                setZipCode={(value) => handleBackupCardDetailsChange("zipCode", value)}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Billing Address Section (Third) */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Billing Address</h3>
        
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="useSameAddress" 
            checked={useSameAddress}
            onCheckedChange={(checked) => handleUseSameAddressChange(checked as boolean)}
            disabled={isLoading}
          />
          <Label htmlFor="useSameAddress" className="text-sm font-medium">
            Use same address as company address
          </Label>
        </div>
        
        {!useSameAddress && (
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="billingLine1">Address Line 1</Label>
              <Input 
                id="billingLine1" 
                value={billingAddress.line1}
                onChange={(e) => handleBillingAddressChange("line1", e.target.value)}
                placeholder="123 Main St"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="billingLine2">Address Line 2 (Optional)</Label>
              <Input 
                id="billingLine2" 
                value={billingAddress.line2}
                onChange={(e) => handleBillingAddressChange("line2", e.target.value)}
                placeholder="Suite 100"
                disabled={isLoading}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="billingCity">City</Label>
                <Input 
                  id="billingCity" 
                  value={billingAddress.city}
                  onChange={(e) => handleBillingAddressChange("city", e.target.value)}
                  placeholder="San Francisco"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="billingState">State</Label>
                <Input 
                  id="billingState" 
                  value={billingAddress.state}
                  onChange={(e) => handleBillingAddressChange("state", e.target.value)}
                  placeholder="CA"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="billingZipCode">ZIP Code</Label>
                <Input 
                  id="billingZipCode" 
                  value={billingAddress.zipCode}
                  onChange={(e) => handleBillingAddressChange("zipCode", e.target.value)}
                  placeholder="94103"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="billingCountry">Country</Label>
                <Input 
                  id="billingCountry" 
                  value={billingAddress.country}
                  onChange={(e) => handleBillingAddressChange("country", e.target.value)}
                  placeholder="United States"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
