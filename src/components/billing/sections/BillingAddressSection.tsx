
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface BillingAddressProps {
  useSameAddress: boolean;
  handleUseSameAddressChange: (checked: boolean) => void;
  billingAddress: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  handleBillingAddressChange: (field: string, value: string) => void;
  isLoading: boolean;
}

export const BillingAddressSection: React.FC<BillingAddressProps> = ({
  useSameAddress,
  handleUseSameAddressChange,
  billingAddress,
  handleBillingAddressChange,
  isLoading,
}) => {
  return (
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
  );
};
