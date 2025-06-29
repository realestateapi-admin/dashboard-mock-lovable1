
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface MakeDefaultCheckboxProps {
  makeDefault: boolean;
  onMakeDefaultChange: (checked: boolean) => void;
  isLoading?: boolean;
}

export const MakeDefaultCheckbox = ({
  makeDefault,
  onMakeDefaultChange,
  isLoading = false,
}: MakeDefaultCheckboxProps) => {
  return (
    <div className="flex items-center space-x-2 pt-2">
      <Checkbox 
        id="makeDefaultCard"
        checked={makeDefault}
        onCheckedChange={(checked) => onMakeDefaultChange(checked as boolean)}
        disabled={isLoading}
      />
      <Label htmlFor="makeDefaultCard" className="text-sm font-medium">
        Make this my default payment method
      </Label>
    </div>
  );
};
