
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatExpiryDate } from "@/components/onboarding/wizard/hooks/utils/creditCardFormatting";
import { validateExpiryDate } from "@/components/onboarding/wizard/hooks/utils/creditCardValidation";

interface ExpiryDateFieldProps {
  expiry: string;
  setExpiry: (value: string) => void;
  isLoading?: boolean;
}

export const ExpiryDateField = ({
  expiry,
  setExpiry,
  isLoading = false,
}: ExpiryDateFieldProps) => {
  const [expiryError, setExpiryError] = useState<string>("");

  // Handle expiry date input with validation
  const handleExpiryChange = (value: string) => {
    const formattedValue = formatExpiryDate(value);
    setExpiry(formattedValue);
    
    // Validate expiry date
    if (formattedValue.length === 5) {
      if (!validateExpiryDate(formattedValue)) {
        setExpiryError("Expiry date must be in the future");
      } else {
        setExpiryError("");
      }
    } else {
      setExpiryError("");
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="expiry">Expiry Date</Label>
      <Input 
        id="expiry" 
        placeholder="MM/YY" 
        value={expiry}
        onChange={(e) => handleExpiryChange(e.target.value)}
        required
        disabled={isLoading}
        className={expiryError ? "border-red-500 focus-visible:ring-red-500" : ""}
      />
      {expiryError && (
        <p className="text-sm text-red-600">{expiryError}</p>
      )}
    </div>
  );
};
