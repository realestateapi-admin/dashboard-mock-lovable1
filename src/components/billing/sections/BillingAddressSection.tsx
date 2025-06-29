
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validFields, setValidFields] = useState<Record<string, boolean>>({});

  // Validation functions
  const validateAddressLine1 = (value: string) => {
    if (!value.trim()) {
      return "Address line 1 is required";
    }
    if (value.length < 3) {
      return "Address must be at least 3 characters";
    }
    if (value.length > 100) {
      return "Address must be less than 100 characters";
    }
    return "";
  };

  const validateCity = (value: string) => {
    if (!value.trim()) {
      return "City is required";
    }
    if (value.length < 2) {
      return "City must be at least 2 characters";
    }
    if (value.length > 50) {
      return "City must be less than 50 characters";
    }
    if (!/^[a-zA-Z\s\-'\.]+$/.test(value)) {
      return "City contains invalid characters";
    }
    return "";
  };

  const validateState = (value: string) => {
    if (!value.trim()) {
      return "State is required";
    }
    return "";
  };

  const validateZipCode = (value: string, country: string) => {
    if (!value.trim()) {
      return "ZIP code is required";
    }
    
    // Only validate format for US addresses
    if (country === 'US' || country === 'United States') {
      const zipRegex = /^\d{5}(-\d{4})?$/;
      if (!zipRegex.test(value)) {
        return "Please enter a valid US ZIP code (12345 or 12345-6789)";
      }
    }
    return "";
  };

  const validateCountry = (value: string) => {
    if (!value.trim()) {
      return "Country is required";
    }
    return "";
  };

  // Generic validation handler
  const validateField = (field: string, value: string) => {
    let error = "";
    
    switch (field) {
      case 'line1':
        error = validateAddressLine1(value);
        break;
      case 'city':
        error = validateCity(value);
        break;
      case 'state':
        error = validateState(value);
        break;
      case 'zipCode':
        error = validateZipCode(value, billingAddress.country);
        break;
      case 'country':
        error = validateCountry(value);
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    setValidFields(prev => ({ ...prev, [field]: !error && value.trim() !== '' }));
    
    return !error;
  };

  // Validate fields on change
  useEffect(() => {
    if (!useSameAddress || hideCheckbox) {
      Object.keys(billingAddress).forEach(field => {
        if (field !== 'line2') { // line2 is optional
          validateField(field, billingAddress[field as keyof typeof billingAddress]);
        }
      });
    }
  }, [billingAddress, useSameAddress, hideCheckbox]);

  const handleFieldChange = (field: string, value: string) => {
    handleBillingAddressChange(field, value);
    
    // Validate immediately on change
    if (!useSameAddress || hideCheckbox) {
      validateField(field, value);
    }
  };

  const getFieldClassName = (field: string) => {
    const hasError = errors[field];
    const isValid = validFields[field];
    
    let className = "pr-10";
    if (hasError) {
      className += " border-red-500 focus-visible:ring-red-500";
    } else if (isValid) {
      className += " border-green-500 focus-visible:ring-green-500";
    }
    return className;
  };

  const renderFieldIcon = (field: string, value: string) => {
    if (!value) return null;
    
    const hasError = errors[field];
    const isValid = validFields[field];
    
    return (
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        {isValid ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : hasError ? (
          <AlertCircle className="h-4 w-4 text-red-500" />
        ) : null}
      </div>
    );
  };

  const renderFieldError = (field: string) => {
    const error = errors[field];
    if (!error) return null;
    
    return (
      <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
        <AlertCircle className="h-3 w-3" />
        {error}
      </p>
    );
  };

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
            <Label htmlFor="billingLine1">Address Line 1 *</Label>
            <div className="relative">
              <Input 
                id="billingLine1" 
                value={billingAddress.line1}
                onChange={(e) => handleFieldChange("line1", e.target.value)}
                placeholder="123 Main St"
                disabled={isLoading}
                className={getFieldClassName('line1')}
              />
              {renderFieldIcon('line1', billingAddress.line1)}
            </div>
            {renderFieldError('line1')}
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
              <Label htmlFor="billingCity">City *</Label>
              <div className="relative">
                <Input 
                  id="billingCity" 
                  value={billingAddress.city}
                  onChange={(e) => handleFieldChange("city", e.target.value)}
                  placeholder="San Francisco"
                  disabled={isLoading}
                  className={getFieldClassName('city')}
                />
                {renderFieldIcon('city', billingAddress.city)}
              </div>
              {renderFieldError('city')}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="billingState">State *</Label>
              <div className="relative">
                <Select 
                  value={billingAddress.state} 
                  onValueChange={(value) => handleFieldChange("state", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className={getFieldClassName('state')}>
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
                {renderFieldIcon('state', billingAddress.state)}
              </div>
              {renderFieldError('state')}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="billingZipCode">ZIP Code *</Label>
              <div className="relative">
                <Input 
                  id="billingZipCode" 
                  value={billingAddress.zipCode}
                  onChange={(e) => handleFieldChange("zipCode", e.target.value)}
                  placeholder="94103"
                  disabled={isLoading}
                  className={getFieldClassName('zipCode')}
                />
                {renderFieldIcon('zipCode', billingAddress.zipCode)}
              </div>
              {renderFieldError('zipCode')}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="billingCountry">Country *</Label>
              <div className="relative">
                <Input 
                  id="billingCountry" 
                  value={billingAddress.country}
                  onChange={(e) => handleFieldChange("country", e.target.value)}
                  placeholder="United States"
                  disabled={isLoading}
                  className={getFieldClassName('country')}
                />
                {renderFieldIcon('country', billingAddress.country)}
              </div>
              {renderFieldError('country')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
