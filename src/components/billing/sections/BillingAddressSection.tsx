import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CheckCircle } from 'lucide-react';

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
  hideTitle?: boolean;
  hideCheckbox?: boolean;
}

// US States list
const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'District of Columbia' }
];

export const BillingAddressSection: React.FC<BillingAddressProps> = ({
  useSameAddress,
  handleUseSameAddressChange,
  billingAddress,
  handleBillingAddressChange,
  isLoading,
  hideTitle = false,
  hideCheckbox = false,
}) => {
  // Billing address is always optional - no validation needed
  
  return (
    <div className="space-y-4">
      {!hideTitle && <h3 className="text-lg font-semibold">Billing Address</h3>}
      
      {!hideCheckbox && (
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
      )}
      
      {(!useSameAddress || hideCheckbox) && (
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="billingLine1">Address Line 1 (Optional)</Label>
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
              <Label htmlFor="billingCity">City (Optional)</Label>
              <Input 
                id="billingCity" 
                value={billingAddress.city}
                onChange={(e) => handleBillingAddressChange("city", e.target.value)}
                placeholder="San Francisco"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="billingState">State (Optional)</Label>
              <Select 
                value={billingAddress.state} 
                onValueChange={(value) => handleBillingAddressChange("state", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-60 overflow-y-auto z-50">
                  {US_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="billingZipCode">ZIP Code (Optional)</Label>
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
                value="United States"
                disabled={true}
                className="bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
