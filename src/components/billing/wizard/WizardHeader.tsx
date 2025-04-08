
import { motion } from "framer-motion";

interface WizardStep {
  title: string;
  description: string;
}

interface WizardHeaderProps {
  currentStep: number;
  steps: WizardStep[];
}

export const WizardHeader = ({ currentStep, steps }: WizardHeaderProps) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {steps[currentStep].title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {steps[currentStep].description}
          </p>
        </div>
        <div className="text-sm font-medium">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
    </div>
  );
};
