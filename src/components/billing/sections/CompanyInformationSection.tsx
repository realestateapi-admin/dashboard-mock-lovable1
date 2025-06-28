
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Briefcase, AlertCircle, CheckCircle } from 'lucide-react';

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

  // Initialize company name from profile if not already set
  useEffect(() => {
    if (!companyInfo.companyName) {
      const initialCompanyName = getInitialCompanyName();
      handleCompanyInfoChange("companyName", initialCompanyName);
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

  // Validate company name whenever it changes
  useEffect(() => {
    if (companyInfo.companyName) {
      validateCompanyName(companyInfo.companyName);
    }
  }, [companyInfo.companyName]);

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCompanyName = e.target.value;
    handleCompanyInfoChange("companyName", newCompanyName);
    validateCompanyName(newCompanyName);
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
    </TooltipProvider>
  );
};
