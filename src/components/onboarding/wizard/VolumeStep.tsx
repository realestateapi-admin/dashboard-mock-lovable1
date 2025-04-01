
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { VolumeOption } from "../types/OnboardingTypes";

interface VolumeStepProps {
  volume: VolumeOption | null;
  updateField: (field: "volume", value: VolumeOption) => void;
}

const volumeOptions = [
  { value: "under-2k", label: "Under 2,000" },
  { value: "2k-30k", label: "2,000 - 30,000" },
  { value: "30k-150k", label: "30,000 - 150,000" },
  { value: "150k-400k", label: "150,000 - 400,000" },
  { value: "400k-plus", label: "400,000+" },
];

const VolumeStep = ({ volume, updateField }: VolumeStepProps) => {
  return (
    <RadioGroup
      value={volume || ""}
      onValueChange={(value) => updateField("volume", value as VolumeOption)}
      className="space-y-3"
    >
      {volumeOptions.map((option) => (
        <div key={option.value} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 transition-colors">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value} className="flex-grow cursor-pointer">{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default VolumeStep;
