
import { RadioGroup } from "@/components/ui/radio-group";
import { ReferralOption } from "../types/OnboardingTypes";
import RadioOption, { RadioOptionProps } from "./RadioOption";

interface ReferralStepProps {
  referralSource: ReferralOption | null;
  updateField: (field: "referralSource", value: ReferralOption) => void;
}

const referralOptions: RadioOptionProps[] = [
  { value: "google", label: "Google" },
  { value: "reddit", label: "Reddit" },
  { value: "sourceforgeg2", label: "SourceForge / G2" },
  { value: "podcast", label: "Podcast" },
  { value: "industry-magazine", label: "Industry Magazine" },
  { value: "chat-gpt-perplexity", label: "Chat GPT/Perplexity" },
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
        <RadioOption key={option.value} value={option.value} label={option.label} />
      ))}
    </RadioGroup>
  );
};

export default ReferralStep;
