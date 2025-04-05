
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface BillingAddressSectionProps {
  useSameAddress: boolean;
  handleUseSameAddressChange: (checked: boolean) => void;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  handleAddressChange: (field: string, value: string) => void;
}

export const BillingAddressSection: React.FC<BillingAddressSectionProps> = ({
  useSameAddress,
  handleUseSameAddressChange,
  address,
  handleAddressChange,
}) => {
  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-lg font-semibold">Billing Address</h3>
      
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox 
          id="useSameAddress" 
          checked={useSameAddress}
          onCheckedChange={(checked) => handleUseSameAddressChange(checked as boolean)}
        />
        <Label htmlFor="useSameAddress" className="text-sm font-medium">
          Use same address as previously entered
        </Label>
      </div>
      
      {!useSameAddress && (
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="addressLine1">Address Line 1</Label>
            <Input 
              id="addressLine1" 
              value={address.line1}
              onChange={(e) => handleAddressChange("line1", e.target.value)}
              placeholder="123 Main St"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
            <Input 
              id="addressLine2" 
              value={address.line2}
              onChange={(e) => handleAddressChange("line2", e.target.value)}
              placeholder="Suite 100"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                value={address.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                placeholder="San Francisco"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input 
                id="state" 
                value={address.state}
                onChange={(e) => handleAddressChange("state", e.target.value)}
                placeholder="CA"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input 
                id="zipCode" 
                value={address.zipCode}
                onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                placeholder="94103"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input 
                id="country" 
                value={address.country}
                onChange={(e) => handleAddressChange("country", e.target.value)}
                placeholder="United States"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
