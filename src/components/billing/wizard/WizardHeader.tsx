
import { motion } from "framer-motion";

interface WizardStep {
  title: string;
  description: string;
}

interface WizardHeaderProps {
  currentStep: number;
  steps: WizardStep[];
  hideProgressBar?: boolean;
}

export const WizardHeader = ({ currentStep, steps, hideProgressBar = false }: WizardHeaderProps) => {
  const progress = ((currentStep + 1) / steps.length) * 100;
  
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
      
      {/* Progress bar - only show if not hidden */}
      {!hideProgressBar && (
        <div className="w-full bg-slate-100 rounded-full h-2 mt-4">
          <motion.div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          ></motion.div>
        </div>
      )}
    </div>
  );
};
