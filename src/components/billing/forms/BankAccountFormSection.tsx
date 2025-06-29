
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface BankAccountFormSectionProps {
  makeDefault?: boolean;
  onMakeDefaultChange?: (checked: boolean) => void;
}

export const BankAccountFormSection = ({
  makeDefault = false,
  onMakeDefaultChange
}: BankAccountFormSectionProps) => {
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("checking");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  return (
    <div className="space-y-4">
      {/* Bank account input fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="accountName">Account Holder Name</Label>
          <Input 
            id="accountName" 
            placeholder="John Smith" 
            value={accountName} 
            onChange={(e) => setAccountName(e.target.value)} 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accountType">Account Type</Label>
          <Select value={accountType} onValueChange={setAccountType}>
            <SelectTrigger id="accountType">
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="checking">Checking</SelectItem>
              <SelectItem value="savings">Savings</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="routingNumber">Routing Number</Label>
        <Input 
          id="routingNumber" 
          placeholder="123456789" 
          value={routingNumber} 
          onChange={(e) => setRoutingNumber(e.target.value)} 
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input 
          id="accountNumber" 
          placeholder="1234567890123456" 
          value={accountNumber} 
          onChange={(e) => setAccountNumber(e.target.value)} 
          required 
        />
      </div>
      
      <div className="flex items-center space-x-2 pt-2">
        <Checkbox 
          id="makeDefaultBank" 
          checked={makeDefault} 
          onCheckedChange={(checked) => onMakeDefaultChange?.(checked as boolean)} 
        />
        <Label htmlFor="makeDefaultBank" className="text-sm font-medium">
          Make this my default payment method
        </Label>
      </div>
      
      <div className="p-4 bg-muted/20 border border-muted rounded-md">
        <p className="text-sm text-muted-foreground">
          By checking the box above you authorize us to debit your account for charges incurred for the duration of your subscription.
        </p>
      </div>
    </div>
  );
};
