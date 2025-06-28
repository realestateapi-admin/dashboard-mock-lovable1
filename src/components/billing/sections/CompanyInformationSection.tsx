
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CompanyInformationProps {
  companyInfo: {
    companyName: string;
    billingEmail: string;
  };
  isLoading: boolean;
  handleCompanyInfoChange: (field: string, value: string) => void;
}

export const CompanyInformationSection: React.FC<CompanyInformationProps> = ({
  companyInfo,
  isLoading,
  handleCompanyInfoChange,
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
      </div>
    </div>
  );
};
