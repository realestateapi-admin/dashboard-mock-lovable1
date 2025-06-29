
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { validateRoutingNumber, validateAccountNumber, formatRoutingNumber, formatAccountNumber } from "@/utils/achValidation";

interface BankAccountFormSectionProps {
  makeDefault?: boolean;
  onMakeDefaultChange?: (checked: boolean) => void;
  accountName?: string;
  onAccountNameChange?: (value: string) => void;
  accountType?: string;
  onAccountTypeChange?: (value: string) => void;
  routingNumber?: string;
  onRoutingNumberChange?: (value: string) => void;
  accountNumber?: string;
  onAccountNumberChange?: (value: string) => void;
}

export const BankAccountFormSection = ({
  makeDefault = false,
  onMakeDefaultChange,
  accountName = "",
  onAccountNameChange,
  accountType = "checking",
  onAccountTypeChange,
  routingNumber = "",
  onRoutingNumberChange,
  accountNumber = "",
  onAccountNumberChange
}: BankAccountFormSectionProps) => {
  const [routingNumberError, setRoutingNumberError] = useState<string>("");
  const [accountNumberError, setAccountNumberError] = useState<string>("");

  const handleRoutingNumberChange = (value: string) => {
    const formatted = formatRoutingNumber(value);
    onRoutingNumberChange?.(formatted);
    
    // Validate if field has content
    if (formatted) {
      const validation = validateRoutingNumber(formatted);
      setRoutingNumberError(validation.error || "");
    } else {
      setRoutingNumberError("");
    }
  };

  const handleAccountNumberChange = (value: string) => {
    const formatted = formatAccountNumber(value);
    onAccountNumberChange?.(formatted);
    
    // Validate if field has content
    if (formatted) {
      const validation = validateAccountNumber(formatted);
      setAccountNumberError(validation.error || "");
    } else {
      setAccountNumberError("");
    }
  };

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
            onChange={(e) => onAccountNameChange?.(e.target.value)} 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accountType">Account Type</Label>
          <Select value={accountType} onValueChange={onAccountTypeChange}>
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
          onChange={(e) => handleRoutingNumberChange(e.target.value)} 
          required 
          className={routingNumberError ? "border-red-500" : ""}
        />
        {routingNumberError && (
          <p className="text-sm text-red-600">{routingNumberError}</p>
        )}
        <p className="text-xs text-muted-foreground">9-digit number found on your checks</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input 
          id="accountNumber" 
          placeholder="1234567890123456" 
          value={accountNumber} 
          onChange={(e) => handleAccountNumberChange(e.target.value)} 
          required 
          className={accountNumberError ? "border-red-500" : ""}
        />
        {accountNumberError && (
          <p className="text-sm text-red-600">{accountNumberError}</p>
        )}
        <p className="text-xs text-muted-foreground">4-17 digit account number</p>
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
