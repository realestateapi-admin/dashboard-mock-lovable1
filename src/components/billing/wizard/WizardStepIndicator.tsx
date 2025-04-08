
import { CheckIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Step {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface WizardStepIndicatorProps {
  steps: Step[];
  currentStep: number;
  isUpgradeFlow?: boolean; // Add flag to determine which flow we're in
}

export const WizardStepIndicator = ({ 
  steps, 
  currentStep, 
  isUpgradeFlow = false 
}: WizardStepIndicatorProps) => {
  return (
    <div className="w-full">
      <div className="hidden md:flex justify-between mb-8">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          
          return (
            <div 
              key={step.title} 
              className={`flex flex-col items-center relative ${
                index === steps.length - 1 ? '' : 'flex-1'
              }`}
            >
              <div className="flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  className={`z-10 flex items-center justify-center w-10 h-10 rounded-full ${
                    isCompleted 
                      ? isUpgradeFlow ? 'bg-purple-600 text-white' : 'bg-[#04c8c8] text-white'
                      : isActive 
                        ? isUpgradeFlow ? 'bg-purple-100 border-2 border-purple-600 text-purple-600' : 'border-2 border-[#04c8c8] text-[#04c8c8]'
                        : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckIcon className="h-5 w-5" />
                  ) : (
                    <StepIcon className="h-5 w-5" />
                  )}
                </motion.div>
              </div>
              
              {index < steps.length - 1 && (
                <div 
                  className={`absolute top-5 left-1/2 w-full h-[2px] ${
                    index < currentStep 
                      ? isUpgradeFlow ? 'bg-purple-600' : 'bg-[#04c8c8]'
                      : 'bg-gray-200'
                  }`}
                ></div>
              )}
              
              <div className="mt-3 text-center">
                <p className={`text-sm font-medium ${
                  isActive 
                    ? isUpgradeFlow ? 'text-purple-600' : 'text-[#04c8c8]' 
                    : isCompleted ? 'text-gray-700' : 'text-gray-400'
                }`}>{step.title}</p>
                <p className="text-xs text-gray-500 hidden lg:block">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Mobile step indicator */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full 
            ${currentStep === steps.length - 1 
              ? isUpgradeFlow ? 'bg-purple-600 text-white' : 'bg-[#04c8c8] text-white'
              : isUpgradeFlow ? 'bg-purple-100 border-2 border-purple-600 text-purple-600' : 'border-2 border-[#04c8c8] text-[#04c8c8]'
            }`}
          >
            {currentStep === steps.length - 1 ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              <span className="text-sm font-medium">{currentStep + 1}</span>
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{steps[currentStep].title}</p>
            <p className="text-xs text-gray-500">{steps[currentStep].description}</p>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
      
      {/* Progress bar - only for upgrade flow */}
      {isUpgradeFlow && (
        <div className="w-full bg-gray-200 h-1 rounded-full mt-2 md:hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            className="bg-purple-600 h-1 rounded-full"
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      )}
    </div>
  );
};
