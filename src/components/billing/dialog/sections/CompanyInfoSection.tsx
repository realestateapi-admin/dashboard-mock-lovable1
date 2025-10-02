
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building2, User, FileText } from "lucide-react";

interface CompanyInfoSectionProps {
  companyName: string;
  billingEmail: string;
  customerType?: 'business' | 'individual';
  taxId?: string;
  handleCompanyInfoChange: (field: string, value: string) => void;
}

export const CompanyInfoSection: React.FC<CompanyInfoSectionProps> = ({
  companyName,
  billingEmail,
  customerType = 'business',
  taxId = '',
  handleCompanyInfoChange,
}) => {
  const [localCustomerType, setLocalCustomerType] = useState<'business' | 'individual'>(customerType);

  const handleCustomerTypeChange = (value: 'business' | 'individual') => {
    setLocalCustomerType(value);
    handleCompanyInfoChange("customerType", value);
  };

  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-lg font-semibold">Company Information</h3>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
        <p className="text-sm text-blue-900">
          The following information is required for tax compliance reasons. If your state of residence assesses a sales tax on services, we might need to charge and remit it on your behalf. If you believe you are exempt please contact your Solutions Engineer.
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Customer Type <span className="text-red-500">*</span></Label>
        <RadioGroup 
          value={localCustomerType} 
          onValueChange={handleCustomerTypeChange}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="business" id="dialog-business" />
            <Label htmlFor="dialog-business" className="font-normal cursor-pointer flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              Business
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="individual" id="dialog-individual" />
            <Label htmlFor="dialog-individual" className="font-normal cursor-pointer flex items-center gap-1">
              <User className="h-4 w-4" />
              Individual
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">
            {localCustomerType === 'business' ? (
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                Legal Company Name <span className="text-red-500">*</span>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Legal Name <span className="text-red-500">*</span>
              </span>
            )}
          </Label>
          <Input 
            id="companyName" 
            value={companyName}
            onChange={(e) => handleCompanyInfoChange("companyName", e.target.value)}
            placeholder={localCustomerType === 'business' ? "Acme Corporation Inc." : "John Doe"}
            required
          />
          <p className="text-xs text-muted-foreground">
            {localCustomerType === 'business' 
              ? 'Full legal name as registered with your state or country' 
              : 'Your full legal name as it appears on government documents'}
          </p>
        </div>
        
        {localCustomerType === 'business' && (
          <div className="space-y-2">
            <Label htmlFor="taxId" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Tax Identification Number (Optional)
            </Label>
            <Input 
              id="taxId" 
              value={taxId}
              onChange={(e) => handleCompanyInfoChange("taxId", e.target.value)}
              placeholder="XX-XXXXXXX"
              maxLength={20}
            />
            <p className="text-xs text-muted-foreground">
              EIN or other business tax identification number
            </p>
          </div>
        )}
        
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
