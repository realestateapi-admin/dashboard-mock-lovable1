
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Briefcase, AlertCircle, CheckCircle, Mail, User, Building2, FileText } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CompanyInformationProps {
  companyInfo: {
    companyName: string;
    billingEmail: string;
    customerType?: 'business' | 'individual';
    taxId?: string;
  };
  isLoading: boolean;
  handleCompanyInfoChange: (field: string, value: string) => void;
  title?: string;
  showEmailFirst?: boolean;
}

export const CompanyInformationSection: React.FC<CompanyInformationProps> = ({
  companyInfo,
  isLoading,
  handleCompanyInfoChange,
  title = "Company Information",
  showEmailFirst = false,
}) => {
  const [billingEmailError, setBillingEmailError] = useState("");
  const [isBillingEmailValid, setIsBillingEmailValid] = useState(false);
  const [customerType, setCustomerType] = useState<'business' | 'individual'>(
    companyInfo.customerType || 'business'
  );

  // Get company name from localStorage (from profile section)
  const getInitialCompanyName = () => {
    try {
      const teamData = localStorage.getItem('teamData');
      if (teamData) {
        const parsedTeamData = JSON.parse(teamData);
        if (parsedTeamData.teamName) {
          return parsedTeamData.teamName;
        }
      }
    } catch (error) {
      console.log('Error parsing team data:', error);
    }
    return 'Acme Inc.'; // fallback default
  };

  // Get admin email from localStorage (from profile/onboarding)
  const getAdminEmail = () => {
    try {
      // First try to get from profile data
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.email) {
          return parsedUserData.email;
        }
      }
      
      // Fallback to userEmail if userData is not available
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        return userEmail;
      }
    } catch (error) {
      console.log('Error parsing user data:', error);
    }
    return 'admin@company.com'; // fallback default
  };

  // Get saved billing email from localStorage
  const getSavedBillingEmail = () => {
    try {
      const saved = localStorage.getItem('billingEmail');
      if (saved) {
        return saved;
      }
    } catch (error) {
      console.log('Error getting saved billing email:', error);
    }
    return getAdminEmail(); // fallback to admin email
  };

  // Initialize company name and billing email from profile/user data if not already set
  useEffect(() => {
    if (!companyInfo.companyName) {
      const initialCompanyName = getInitialCompanyName();
      handleCompanyInfoChange("companyName", initialCompanyName);
    }
    if (!companyInfo.billingEmail) {
      const initialBillingEmail = getSavedBillingEmail();
      handleCompanyInfoChange("billingEmail", initialBillingEmail);
    }
  }, []);

  // Save billing email to localStorage whenever it changes
  useEffect(() => {
    if (companyInfo.billingEmail) {
      localStorage.setItem('billingEmail', companyInfo.billingEmail);
    }
  }, [companyInfo.billingEmail]);

  const validateBillingEmail = (email: string) => {
    // If email is empty, it's valid (optional field)
    if (email.length === 0) {
      setBillingEmailError("");
      setIsBillingEmailValid(true);
      return true;
    }
    
    // If email is provided, validate format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setBillingEmailError("Please enter a valid email address");
      setIsBillingEmailValid(false);
      return false;
    }
    
    setBillingEmailError("");
    setIsBillingEmailValid(true);
    return true;
  };

  // Validate billing email whenever it changes
  useEffect(() => {
    validateBillingEmail(companyInfo.billingEmail);
  }, [companyInfo.billingEmail]);

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCompanyName = e.target.value;
    handleCompanyInfoChange("companyName", newCompanyName);
  };

  const handleBillingEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBillingEmail = e.target.value;
    handleCompanyInfoChange("billingEmail", newBillingEmail);
    validateBillingEmail(newBillingEmail);
  };

  const handleCustomerTypeChange = (value: 'business' | 'individual') => {
    setCustomerType(value);
    handleCompanyInfoChange("customerType", value);
  };

  // Field components for reordering
  const BillingEmailField = (
    <div className="space-y-2">
      <Label htmlFor="billingEmail" className="flex items-center gap-1">
        <Mail className="h-4 w-4" />
        Billing Email (Optional)
      </Label>
      <div className="relative">
        <Input 
          id="billingEmail" 
          type="email"
          value={companyInfo.billingEmail}
          onChange={handleBillingEmailChange}
          placeholder="billing@company.com"
          disabled={isLoading}
          className={`pr-10 ${
            billingEmailError ? 'border-red-500 focus-visible:ring-red-500' : 
            isBillingEmailValid ? 'border-green-500 focus-visible:ring-green-500' : ''
          }`}
        />
        {companyInfo.billingEmail && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {isBillingEmailValid ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : billingEmailError ? (
              <AlertCircle className="h-4 w-4 text-red-500" />
            ) : null}
          </div>
        )}
      </div>
      {billingEmailError && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {billingEmailError}
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        Update if billing communications should go to a different address.
      </p>
    </div>
  );

  const LegalNameField = (
    <div className="space-y-2">
      <Label htmlFor="companyName" className="flex items-center gap-1">
        {customerType === 'business' ? (
          <><Building2 className="h-4 w-4" /> Legal Company Name <span className="text-red-500">*</span></>
        ) : (
          <><User className="h-4 w-4" /> Legal Name <span className="text-red-500">*</span></>
        )}
      </Label>
      <Input 
        id="companyName" 
        value={companyInfo.companyName}
        onChange={handleCompanyNameChange}
        placeholder={customerType === 'business' ? "Acme Corporation Inc." : "John Doe"}
        disabled={isLoading}
        maxLength={100}
        required
      />
      <p className="text-xs text-muted-foreground">
        {customerType === 'business' 
          ? 'Full legal name as registered with your state or country' 
          : 'Your full legal name as it appears on government documents'}
      </p>
    </div>
  );

  const TaxIdField = customerType === 'business' ? (
    <div className="space-y-2">
      <Label htmlFor="taxId" className="flex items-center gap-1">
        <FileText className="h-4 w-4" />
        Tax Identification Number (Optional)
      </Label>
      <Input 
        id="taxId" 
        value={companyInfo.taxId || ''}
        onChange={(e) => handleCompanyInfoChange("taxId", e.target.value)}
        placeholder="XX-XXXXXXX"
        disabled={isLoading}
        maxLength={20}
      />
      <p className="text-xs text-muted-foreground">
        EIN, SSN, or other tax identification number
      </p>
    </div>
  ) : null;

  return (
    <TooltipProvider>
      <div className="space-y-4 pb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
          <p className="text-sm text-blue-900">
            The following information is required for tax compliance reasons. If your state of residence assesses a sales tax on services, we might need to charge and remit it on your behalf. If you believe you are exempt please contact your Solutions Engineer.
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Customer Type <span className="text-red-500">*</span></Label>
          <RadioGroup 
            value={customerType} 
            onValueChange={handleCustomerTypeChange}
            className="flex gap-4"
            disabled={isLoading}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="business" id="business" />
              <Label htmlFor="business" className="font-normal cursor-pointer flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                Business
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="individual" id="individual" />
              <Label htmlFor="individual" className="font-normal cursor-pointer flex items-center gap-1">
                <User className="h-4 w-4" />
                Individual
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="grid gap-4">
          {showEmailFirst ? (
            <>
              {BillingEmailField}
              {LegalNameField}
              {TaxIdField}
            </>
          ) : (
            <>
              {LegalNameField}
              {TaxIdField}
              {BillingEmailField}
            </>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};
