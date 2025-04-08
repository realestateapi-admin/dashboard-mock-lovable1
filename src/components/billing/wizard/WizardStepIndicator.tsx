
import { CheckIcon } from "lucide-react";
import { WizardStep } from "./WizardStepsConfig";

interface WizardStepIndicatorProps {
  steps: WizardStep[];
  currentStep: number;
  isUpgradeFlow?: boolean;
}

export const WizardStepIndicator = ({ 
  steps, 
  currentStep,
  isUpgradeFlow = true
}: WizardStepIndicatorProps) => {
  // Set the accent color based on flow
  const accentColor = isUpgradeFlow ? "purple" : "[#04c8c8]";
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight text-${accentColor}-700`}>
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
      
      <div className="w-full">
        <div className="flex items-center w-full">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 relative">
              <div className="flex items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 
                  ${index < currentStep 
                    ? `bg-${accentColor}-600 border-${accentColor}-600 text-white` 
                    : index === currentStep 
                      ? `border-${accentColor}-600 text-${accentColor}-600` 
                      : 'border-gray-300 text-gray-300'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 ml-2 mr-2 
                    ${index < currentStep ? `bg-${accentColor}-600` : 'bg-gray-200'}`}
                  ></div>
                )}
              </div>
              
              <span className={`absolute text-xs mt-1 transform -translate-x-1/4
                ${index <= currentStep ? `text-${accentColor}-600 font-medium` : 'text-gray-400'}`}
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
