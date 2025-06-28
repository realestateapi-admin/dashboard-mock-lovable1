
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Briefcase, AlertCircle, CheckCircle, Mail } from 'lucide-react';

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
  const [companyNameError, setCompanyNameError] = useState("");
  const [isCompanyNameValid, setIsCompanyNameValid] = useState(false);
  const [billingEmailError, setBillingEmailError] = useState("");
  const [isBillingEmailValid, setIsBillingEmailValid] = useState(false);

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

  // Get admin email from localStorage
  const getAdminEmail = () => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.email) {
          return parsedUserData.email;
        }
      }
    } catch (error) {
      console.log('Error parsing user data:', error);
    }
    return 'admin@company.com'; // fallback default
  };

  // Initialize company name and billing email from profile/user data if not already set
  useEffect(() => {
    if (!companyInfo.companyName) {
      const initialCompanyName = getInitialCompanyName();
      handleCompanyInfoChange("companyName", initialCompanyName);
    }
    if (!companyInfo.billingEmail) {
      const initialBillingEmail = getAdminEmail();
      handleCompanyInfoChange("billingEmail", initialBillingEmail);
    }
  }, []);

  const validateCompanyName = (name: string) => {
    // Check minimum length
    if (name.length < 1) {
      setCompanyNameError("Company name is required");
      setIsCompanyNameValid(false);
      return false;
    }
    
    // Check maximum length
    if (name.length > 50) {
      setCompanyNameError("Company name must be 50 characters or less");
      setIsCompanyNameValid(false);
      return false;
    }
    
    // Check for at least one alphanumeric character
    const hasAlphanumeric = /[a-zA-Z0-9]/.test(name);
    if (!hasAlphanumeric) {
      setCompanyNameError("Company name must contain at least one letter or number");
      setIsCompanyNameValid(false);
      return false;
    }
    
    setCompanyNameError("");
    setIsCompanyNameValid(true);
    return true;
  };

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

  // Validate company name whenever it changes
  useEffect(() => {
    if (companyInfo.companyName) {
      validateCompanyName(companyInfo.companyName);
    }
  }, [companyInfo.companyName]);

  // Validate billing email whenever it changes
  useEffect(() => {
    validateBillingEmail(companyInfo.billingEmail);
  }, [companyInfo.billingEmail]);

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCompanyName = e.target.value;
    handleCompanyInfoChange("companyName", newCompanyName);
    validateCompanyName(newCompanyName);
  };

  const handleBillingEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBillingEmail = e.target.value;
    handleCompanyInfoChange("billingEmail", newBillingEmail);
    validateBillingEmail(newBillingEmail);
  };

  return (
    <TooltipProvider>
      <div className="space-y-4 pb-6 border-b">
        <h3 className="text-lg font-semibold">Company Information</h3>
        
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              Company Name
            </Label>
            <div className="relative">
              <Input 
                id="companyName" 
                value={companyInfo.companyName}
                onChange={handleCompanyNameChange}
                placeholder="Your company name"
                disabled={isLoading}
                className={`pr-10 ${
                  companyNameError ? 'border-red-500 focus-visible:ring-red-500' : 
                  isCompanyNameValid ? 'border-green-500 focus-visible:ring-green-500' : ''
                }`}
                maxLength={50}
              />
              {companyInfo.companyName && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {isCompanyNameValid ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : companyNameError ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : null}
                </div>
              )}
            </div>
            {companyNameError && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {companyNameError}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              1-50 characters, must include at least one letter or number
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="billingEmail" className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              Billing Email
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
        </div>
      </div>
    </TooltipProvider>
  );
};
