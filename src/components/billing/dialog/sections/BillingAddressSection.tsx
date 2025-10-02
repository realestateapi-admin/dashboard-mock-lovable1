
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

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

const validatePhysicalAddress = (address: string): { isValid: boolean; error?: string } => {
  const poBoxPatterns = [
    /\bP\.?\s*O\.?\s*BOX\b/i,
    /\bPOST\s*OFFICE\s*BOX\b/i,
    /\bPO\s*BOX\b/i,
    /\bP\.?\s*O\.?\s*B\b/i,
    /\bBOX\s*\d+\b/i
  ];
  
  for (const pattern of poBoxPatterns) {
    if (pattern.test(address)) {
      return { 
        isValid: false, 
        error: "PO Boxes are not accepted. Please provide a physical address." 
      };
    }
  }
  
  return { isValid: true };
};

export const BillingAddressSection: React.FC<BillingAddressSectionProps> = ({
  useSameAddress,
  handleUseSameAddressChange,
  address,
  handleAddressChange,
}) => {
  const [addressError, setAddressError] = useState("");

  const handleAddressLine1Change = (value: string) => {
    handleAddressChange("line1", value);
    
    if (value.trim()) {
      const validation = validatePhysicalAddress(value);
      if (!validation.isValid) {
        setAddressError(validation.error || "Invalid address");
      } else {
        setAddressError("");
      }
    } else {
      setAddressError("");
    }
  };

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
            <Label htmlFor="addressLine1">
              Address Line 1 <span className="text-red-500">*</span>
            </Label>
            <Input 
              id="addressLine1" 
              value={address.line1}
              onChange={(e) => handleAddressLine1Change(e.target.value)}
              placeholder="123 Main St (No PO Boxes)"
              required
              className={addressError ? 'border-red-500' : ''}
            />
            {addressError && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {addressError}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="addressLine2">Address Line 2</Label>
            <Input 
              id="addressLine2" 
              value={address.line2}
              onChange={(e) => handleAddressChange("line2", e.target.value)}
              placeholder="Suite 100 (optional)"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="city" 
                value={address.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                placeholder="San Francisco"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">
                State <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={address.state} 
                onValueChange={(value) => handleAddressChange("state", value)}
                required
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
              <Label htmlFor="zipCode">
                ZIP Code <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="zipCode" 
                value={address.zipCode}
                onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                placeholder="94103"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input 
                id="country" 
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
