
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ReferralOption } from "../types/OnboardingTypes";

interface ReferralStepProps {
  referralSource: ReferralOption | null;
  updateField: (field: "referralSource", value: ReferralOption) => void;
}

const referralOptions = [
  { value: "google", label: "Google" },
  { value: "reddit", label: "Reddit" },
  { value: "sourceforgeg2", label: "SourceForge / G2" },
  { value: "podcast", label: "Podcast" },
  { value: "industry-magazine", label: "Industry Magazine" },
  { value: "friend", label: "A Friend" },
  { value: "other", label: "Other" },
];

const ReferralStep = ({ referralSource, updateField }: ReferralStepProps) => {
  return (
    <RadioGroup
      value={referralSource || ""}
      onValueChange={(value) => updateField("referralSource", value as ReferralOption)}
      className="space-y-3"
    >
      {referralOptions.map((option) => (
        <div key={option.value} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 transition-colors">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value} className="flex-grow cursor-pointer">{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default ReferralStep;
