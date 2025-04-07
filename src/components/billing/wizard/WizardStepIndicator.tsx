
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface WizardStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface WizardStepIndicatorProps {
  steps: WizardStep[];
  currentStep: number;
}

export const WizardStepIndicator = ({ steps, currentStep }: WizardStepIndicatorProps) => {
  // Calculate progress percentage
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-purple-700">
            {steps[currentStep].title}
          </h2>
          <p className="text-muted-foreground">
            {steps[currentStep].description}
          </p>
        </div>
        <div className="text-sm font-medium">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-slate-100 rounded-full h-2">
        <motion.div 
          className="bg-purple-600 h-2 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        ></motion.div>
      </div>
      
      {/* Step indicators */}
      <div className="hidden md:flex items-center w-full justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`h-10 w-10 rounded-full flex items-center justify-center border-2 
                  ${index < currentStep 
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : index === currentStep 
                      ? 'border-purple-600 text-purple-600' 
                      : 'border-gray-300 text-gray-300'
                  }`}
              >
                {index < currentStep ? (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <span 
                className={`text-xs mt-1 text-center max-w-[80px] 
                  ${index <= currentStep ? 'text-purple-600 font-medium' : 'text-gray-400'}`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
