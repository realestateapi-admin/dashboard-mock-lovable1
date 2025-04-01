
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { IndustryOption } from "../types/OnboardingTypes";

interface IndustryStepProps {
  industry: IndustryOption | null;
  updateField: (field: "industry", value: IndustryOption) => void;
}

const industryOptions = [
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
        <div key={option.value} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 transition-colors">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value} className="flex-grow cursor-pointer">{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default IndustryStep;
