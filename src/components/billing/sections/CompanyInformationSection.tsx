
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

  const CompanyNameField = (
    <div className="space-y-2">
      <Label htmlFor="companyName" className="flex items-center gap-1">
        <Briefcase className="h-4 w-4" />
        Company Name (Optional)
      </Label>
      <Input 
        id="companyName" 
        value={companyInfo.companyName}
        onChange={handleCompanyNameChange}
        placeholder="Your company name"
        disabled={isLoading}
        maxLength={50}
      />
      <p className="text-xs text-muted-foreground">
        Up to 50 characters
      </p>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="space-y-4 pb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        
        <div className="grid gap-4">
          {showEmailFirst ? (
            <>
              {BillingEmailField}
              {CompanyNameField}
            </>
          ) : (
            <>
              {CompanyNameField}
              {BillingEmailField}
            </>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};
