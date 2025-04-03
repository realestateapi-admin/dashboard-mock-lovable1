import { useState, useEffect } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { ReferralOption } from "../types/OnboardingTypes";
import RadioOption, { RadioOptionProps } from "./RadioOption";
import { Textarea } from "@/components/ui/textarea";

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
  const [otherReferral, setOtherReferral] = useState("");

  useEffect(() => {
    if (referralSource === "other" && otherReferral.trim()) {
      localStorage.setItem("otherReferralSource", otherReferral);
    }
  }, [otherReferral, referralSource]);

  return (
    <div className="space-y-4">
      <RadioGroup
        value={referralSource || ""}
        onValueChange={(value) => updateField("referralSource", value as ReferralOption)}
        className="space-y-3"
      >
        {referralOptions.map((option) => (
          <RadioOption key={option.value} value={option.value} label={option.label} />
        ))}
      </RadioGroup>

      {referralSource === "other" && (
        <div className="mt-4">
          <label htmlFor="other-referral" className="block text-sm font-medium mb-2">
            Please specify where you heard about us:
          </label>
          <Textarea
            id="other-referral"
            placeholder="Tell us where you heard about us..."
            value={otherReferral}
            onChange={(e) => setOtherReferral(e.target.value)}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default ReferralStep;
