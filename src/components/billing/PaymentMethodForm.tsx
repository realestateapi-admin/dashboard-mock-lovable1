
import React, { useState } from "react";
import { CreditCardFormSection } from "./forms/CreditCardFormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface PaymentMethodFormProps {
  isLoading: boolean;
  creditCardInfo?: any;
}

export const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  isLoading,
  creditCardInfo,
}) => {
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
    useSameAddress: false
  });

  // Handle input changes for company and billing info
  const handleCompanyInfoChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle address changes
  const handleAddressChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  // Handle checkbox for using same address
  const handleUseSameAddressChange = (checked: boolean) => {
    setCompanyInfo(prev => ({
      ...prev,
      useSameAddress: checked
    }));
  };

  return (
    <div className="space-y-6">
      {/* Company Information Section */}
      <div className="space-y-4 mb-6">
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
        </div>
      </div>

      {/* Billing Address Section */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold">Billing Address</h3>
        
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="useSameAddress" 
            checked={companyInfo.useSameAddress}
            onCheckedChange={(checked) => handleUseSameAddressChange(checked as boolean)}
            disabled={isLoading}
          />
          <Label htmlFor="useSameAddress" className="text-sm font-medium">
            Use same address as previously entered
          </Label>
        </div>
        
        {!companyInfo.useSameAddress && (
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <Input 
                id="addressLine1" 
                value={companyInfo.address.line1}
                onChange={(e) => handleAddressChange("line1", e.target.value)}
                placeholder="123 Main St"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
              <Input 
                id="addressLine2" 
                value={companyInfo.address.line2}
                onChange={(e) => handleAddressChange("line2", e.target.value)}
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
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  placeholder="San Francisco"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input 
                  id="state" 
                  value={companyInfo.address.state}
                  onChange={(e) => handleAddressChange("state", e.target.value)}
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
                  onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                  placeholder="94103"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input 
                  id="country" 
                  value={companyInfo.address.country}
                  onChange={(e) => handleAddressChange("country", e.target.value)}
                  placeholder="United States"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Credit Card Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Details</h3>
        <CreditCardFormSection
          isLoading={isLoading}
          showMakeDefaultOption={false}
        />
      </div>
    </div>
  );
};
