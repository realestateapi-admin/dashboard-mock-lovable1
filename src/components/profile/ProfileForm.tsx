
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Briefcase } from 'lucide-react';
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
  const [companyName, setCompanyName] = React.useState(initialCompanyName);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (onEmailChange) {
      onEmailChange(newEmail);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            <Input 
              id="company" 
              value={companyName} 
              onChange={(e) => setCompanyName(e.target.value)} 
              placeholder="Your company name"
            />
          </div>
        </div>

        <Button type="submit">
          Save Changes
        </Button>
      </form>
    </TooltipProvider>
  );
};
