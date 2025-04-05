
import { RadioGroup } from "@/components/ui/radio-group";
import { IndustryOption, IndustryData } from "../types/OnboardingTypes";
import RadioOption, { RadioOptionProps } from "./RadioOption";

interface IndustryStepProps {
  industry: IndustryData | null;
  updateField: (field: "industry", value: IndustryData) => void;
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
  const handleIndustryChange = (value: string) => {
    const selectedOption = industryOptions.find(option => option.value === value);
    updateField("industry", {
      value: value as IndustryOption,
      name: selectedOption?.label || ""
    });
  };

  return (
    <RadioGroup
      value={industry?.value || ""}
      onValueChange={handleIndustryChange}
      className="space-y-3"
    >
      {industryOptions.map((option) => (
        <RadioOption key={option.value} value={option.value} label={option.label} />
      ))}
    </RadioGroup>
  );
};

export default IndustryStep;
