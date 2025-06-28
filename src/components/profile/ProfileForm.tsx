
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Briefcase, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProfileFormProps {
  initialName: string;
  initialEmail: string;
  initialCompanyName: string;
  onEmailChange?: (email: string) => void;
}

export const ProfileForm = ({ 
  initialName,
  initialEmail,
  initialCompanyName,
  onEmailChange
}: ProfileFormProps) => {
  const { toast } = useToast();
  const [name, setName] = React.useState(initialName);
  const [email, setEmail] = React.useState(initialEmail);
  
  // Get team name from localStorage if available, otherwise use initialCompanyName
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
    return initialCompanyName;
  };
  
  const [companyName, setCompanyName] = React.useState(getInitialCompanyName());
  const [companyNameError, setCompanyNameError] = React.useState("");
  const [isCompanyNameValid, setIsCompanyNameValid] = React.useState(false);

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

  // Validate company name on component mount
  React.useEffect(() => {
    if (companyName) {
      validateCompanyName(companyName);
    }
  }, [companyName]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (onEmailChange) {
      onEmailChange(newEmail);
    }
  };

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCompanyName = e.target.value;
    setCompanyName(newCompanyName);
    validateCompanyName(newCompanyName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate company name before submitting
    if (!validateCompanyName(companyName)) {
      toast({
        title: "Validation Error",
        description: "Please fix the company name before saving.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would save the profile info to a server here
    
    // Store the email in localStorage to persist it
    localStorage.setItem('userEmail', email);
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved."
    });
  };

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  readOnly
                  className="bg-muted cursor-not-allowed"
                  placeholder="Your email"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Your email address is linked to your account and cannot be changed.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="company" className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              Company Name
            </Label>
            <div className="relative">
              <Input 
                id="company" 
                value={companyName} 
                onChange={handleCompanyNameChange}
                placeholder="Your company name"
                className={`pr-10 ${
                  companyNameError ? 'border-red-500 focus-visible:ring-red-500' : 
                  isCompanyNameValid ? 'border-green-500 focus-visible:ring-green-500' : ''
                }`}
                maxLength={50}
              />
              {companyName && (
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
        </div>

        <Button type="submit" disabled={!isCompanyNameValid}>
          Save Changes
        </Button>
      </form>
    </TooltipProvider>
  );
};
