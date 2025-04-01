
import { RadioGroup } from "@/components/ui/radio-group";
import { VolumeOption } from "../types/OnboardingTypes";
import RadioOption, { RadioOptionProps } from "./RadioOption";

interface VolumeStepProps {
  volume: VolumeOption | null;
  updateField: (field: "volume", value: VolumeOption) => void;
}

const volumeOptions: RadioOptionProps[] = [
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
        <RadioOption key={option.value} value={option.value} label={option.label} />
      ))}
    </RadioGroup>
  );
};

export default VolumeStep;
