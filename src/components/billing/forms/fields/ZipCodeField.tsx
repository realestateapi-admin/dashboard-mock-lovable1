
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatZipCode } from "@/components/onboarding/wizard/hooks/utils/creditCardFormatting";

interface ZipCodeFieldProps {
  zipCode: string;
  setZipCode: (value: string) => void;
  isLoading?: boolean;
}

export const ZipCodeField = ({
  zipCode,
  setZipCode,
  isLoading = false,
}: ZipCodeFieldProps) => {
  // Handle ZIP code input
  const handleZipCodeChange = (value: string) => {
    const formattedValue = formatZipCode(value);
    setZipCode(formattedValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
      <Input 
        id="zipCode" 
        placeholder="12345" 
        value={zipCode}
        onChange={(e) => handleZipCodeChange(e.target.value)}
        required
        disabled={isLoading}
      />
    </div>
  );
};
