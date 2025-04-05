
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CompanyInfoSectionProps {
  companyName: string;
  billingEmail: string;
  handleCompanyInfoChange: (field: string, value: string) => void;
}

export const CompanyInfoSection: React.FC<CompanyInfoSectionProps> = ({
  companyName,
  billingEmail,
  handleCompanyInfoChange,
}) => {
  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-lg font-semibold">Company Information</h3>
      
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input 
            id="companyName" 
            value={companyName}
            onChange={(e) => handleCompanyInfoChange("companyName", e.target.value)}
            placeholder="Acme Inc."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="billingEmail">Billing Email</Label>
          <Input 
            id="billingEmail" 
            type="email"
            value={billingEmail}
            onChange={(e) => handleCompanyInfoChange("billingEmail", e.target.value)}
            placeholder="billing@company.com"
          />
        </div>
      </div>
    </div>
  );
};
