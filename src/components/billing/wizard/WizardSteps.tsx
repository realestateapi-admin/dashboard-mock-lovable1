
import { CheckIcon } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

interface WizardStepsProps {
  currentStep: number;
  steps: Step[];
}

export const WizardSteps = ({ currentStep, steps }: WizardStepsProps) => {
  return (
    <div className="flex flex-col space-y-1.5">
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
      
      {/* Progress Indicator */}
      <div className="w-full mt-6">
        <div className="flex items-center w-full">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 relative">
              <div className="flex items-center">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center border-2 
                  ${index < currentStep 
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : index === currentStep 
                      ? 'border-purple-600 text-purple-600' 
                      : 'border-gray-300 text-gray-300'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckIcon className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 ml-2 mr-2 
                    ${index < currentStep ? 'bg-purple-600' : 'bg-gray-200'}`}
                  ></div>
                )}
              </div>
              
              <span className={`absolute w-max text-xs mt-1 transform -translate-x-1/4
                ${index <= currentStep ? 'text-purple-600 font-medium' : 'text-gray-400'}`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
