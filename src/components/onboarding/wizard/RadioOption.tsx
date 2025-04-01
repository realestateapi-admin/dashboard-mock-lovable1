
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export interface RadioOptionProps {
  value: string;
  label: string;
}

const RadioOption = ({ value, label }: RadioOptionProps) => {
  return (
    <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 transition-colors">
      <RadioGroupItem value={value} id={value} />
      <Label htmlFor={value} className="flex-grow cursor-pointer">{label}</Label>
    </div>
  );
};

export default RadioOption;
