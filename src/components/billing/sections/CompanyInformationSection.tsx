
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CompanyInformationProps {
  companyInfo: {
    companyName: string;
    billingEmail: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  isLoading: boolean;
  handleCompanyInfoChange: (field: string, value: string) => void;
  handleCompanyAddressChange: (field: string, value: string) => void;
}

export const CompanyInformationSection: React.FC<CompanyInformationProps> = ({
  companyInfo,
  isLoading,
  handleCompanyInfoChange,
  handleCompanyAddressChange,
}) => {
  return (
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
  );
};
