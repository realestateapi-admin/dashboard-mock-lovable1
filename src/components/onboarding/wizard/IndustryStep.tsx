
import { motion } from "framer-motion";
import { RadioGroup } from "@/components/ui/radio-group";
import { IndustryOption } from "../types/OnboardingTypes";
import RadioOption, { RadioOptionProps } from "./RadioOption";

interface IndustryStepProps {
  industry: IndustryOption | null;
  updateField: (field: "industry", value: IndustryOption) => void;
}

const industryOptions: RadioOptionProps[] = [
  { value: "real-estate", label: "Real Estate" },
  { value: "proptech", label: "PropTech" },
  { value: "fintech", label: "FinTech" },
  { value: "home-services", label: "Home Services" },
  { value: "lead-generation", label: "Lead Generation" },
  { value: "e-commerce", label: "E-Commerce" },
  { value: "other", label: "Other" },
];

const IndustryStep = ({ industry, updateField }: IndustryStepProps) => {
  return (
    <RadioGroup
      value={industry || ""}
      onValueChange={(value) => updateField("industry", value as IndustryOption)}
      className="space-y-3"
    >
      {industryOptions.map((option) => (
        <RadioOption key={option.value} value={option.value} label={option.label} />
      ))}
    </RadioGroup>
  );
};

export default IndustryStep;
