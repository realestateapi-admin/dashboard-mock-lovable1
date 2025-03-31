
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProfileFormProps {
  initialName: string;
  initialEmail: string;
  initialCompanyName: string;
}

export const ProfileForm = ({ 
  initialName,
  initialEmail,
  initialCompanyName
}: ProfileFormProps) => {
  const { toast } = useToast();
  const [name, setName] = React.useState(initialName);
  const [email, setEmail] = React.useState(initialEmail);
  const [companyName, setCompanyName] = React.useState(initialCompanyName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the profile info to a server here
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved."
    });
  };

  return (
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
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Your email"
          />
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
  );
};
