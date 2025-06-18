
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useOnboardingState } from "./hooks/useOnboardingState";
import IndustryStep from "./wizard/IndustryStep";
import TeamStep from "./wizard/TeamStep";
import VolumeStep from "./wizard/VolumeStep";
import ReferralStep from "./wizard/ReferralStep";
import CreditCardStep from "./wizard/CreditCardStep";
import WizardFooter from "./wizard/WizardFooter";
import WizardProgress from "./wizard/WizardProgress";
import { WizardStep, IndustryData, TeamData, VolumeOption, ReferralOption } from "./types/OnboardingTypes";

interface OnboardingWizardProps {
  userName?: string;
}

const OnboardingWizard = ({ userName = "" }: OnboardingWizardProps) => {
  const { step, data, handleNext, handleBack, updateField } = useOnboardingState();
  
  const steps: WizardStep[] = [
    {
      title: "What industry are you in?",
      description: "This helps us personalize your experience",
      field: "industry",
    },
    {
      title: "Set up your team",
      description: "Create a new team or join an existing one",
      field: "team",
    },
    {
      title: "How many property addresses do you need data for monthly?",
      description: "We'll recommend the right plan for your needs",
      field: "volume",
    },
    {
      title: "How did you hear about us?",
      description: "We're always looking to improve our outreach",
      field: "referralSource",
    },
    {
      title: "Set up your free trial",
      description: "Your card won't be charged until you select a subscription plan.",
      field: "creditCardInfo",
    }
  ];

  const currentStep = steps[step];
  const isCurrentStepValid = !!data[currentStep.field];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="border shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold tracking-tight">{currentStep.title}</CardTitle>
                <CardDescription className="mt-1">{currentStep.description}</CardDescription>
              </div>
              <div className="text-sm font-medium">
                Step {step + 1} of {steps.length}
              </div>
            </div>
            
            <WizardProgress step={step} totalSteps={steps.length} showProgress={true} />
          </CardHeader>
          
          <CardContent className="py-4">
            {step === 0 && (
              <IndustryStep 
                industry={data.industry as IndustryData | null} 
                updateField={updateField}
              />
            )}
            
            {step === 1 && (
              <TeamStep 
                team={data.team as TeamData | null} 
                updateField={updateField}
                userName={userName}
              />
            )}
            
            {step === 2 && (
              <VolumeStep 
                volume={data.volume as VolumeOption | null} 
                updateField={updateField}
              />
            )}
            
            {step === 3 && (
              <ReferralStep
                referralSource={data.referralSource as ReferralOption | null}
                updateField={updateField}
              />
            )}

            {step === 4 && (
              <CreditCardStep
                creditCardInfo={data.creditCardInfo}
                updateField={updateField}
                userName={userName}
              />
            )}
          </CardContent>
          
          <CardFooter>
            <WizardFooter 
              step={step}
              totalSteps={steps.length}
              handleBack={handleBack}
              handleNext={handleNext}
              isCurrentStepValid={isCurrentStepValid}
            />
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardingWizard;
