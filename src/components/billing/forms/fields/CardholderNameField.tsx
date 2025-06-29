
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CardholderNameFieldProps {
  cardName: string;
  setCardName: (value: string) => void;
  isLoading?: boolean;
}

export const CardholderNameField = ({
  cardName,
  setCardName,
  isLoading = false,
}: CardholderNameFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="cardName">Cardholder Name</Label>
      <Input 
        id="cardName" 
        placeholder="John Smith" 
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        required
        disabled={isLoading}
      />
    </div>
  );
};
