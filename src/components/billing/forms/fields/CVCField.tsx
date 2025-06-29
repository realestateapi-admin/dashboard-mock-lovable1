
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCvc } from "@/components/onboarding/wizard/hooks/utils/creditCardFormatting";

interface CVCFieldProps {
  cvc: string;
  setCvc: (value: string) => void;
  isLoading?: boolean;
}

export const CVCField = ({
  cvc,
  setCvc,
  isLoading = false,
}: CVCFieldProps) => {
  const [displayCvc, setDisplayCvc] = useState<string>(cvc);
  const [cvcMasked, setCvcMasked] = useState<boolean>(false);

  // Sync display values with prop changes
  useEffect(() => {
    setDisplayCvc(cvc);
  }, [cvc]);

  // Handle CVC input with masking
  const handleCvcChange = (value: string) => {
    const formattedValue = formatCvc(value);
    setCvc(formattedValue);
    setDisplayCvc(formattedValue);
    setCvcMasked(false);
    
    // Mask CVC after 2 seconds if 3 or more digits
    if (formattedValue.length >= 3) {
      setTimeout(() => {
        setCvcMasked(true);
        setDisplayCvc("•".repeat(formattedValue.length));
      }, 2000);
    }
  };

  // Initialize CVC display
  useEffect(() => {
    if (cvc && cvc.length >= 3) {
      setCvcMasked(true);
      setDisplayCvc("•".repeat(cvc.length));
    }
  }, []);

  return (
    <div className="space-y-2">
      <Label htmlFor="cvc">CVC</Label>
      <Input 
        id="cvc" 
        placeholder="123" 
        value={displayCvc}
        onChange={(e) => handleCvcChange(e.target.value)}
        required
        disabled={isLoading}
      />
    </div>
  );
};
