
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

type IndustryOption = "real-estate" | "proptech" | "fintech" | "home-services" | "lead-generation" | "e-commerce" | "other";
type VolumeOption = "under-2k" | "2k-30k" | "30k-150k" | "150k-400k" | "400k-plus";
type ReferralOption = "google" | "reddit" | "sourceforgeg2" | "podcast" | "industry-magazine" | "friend" | "other";

interface WizardData {
  industry: IndustryOption | null;
  volume: VolumeOption | null;
  referralSource: ReferralOption | null;
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

const volumeOptions = [
  { value: "under-2k", label: "Under 2,000" },
  { value: "2k-30k", label: "2,000 - 30,000" },
  { value: "30k-150k", label: "30,000 - 150,000" },
  { value: "150k-400k", label: "150,000 - 400,000" },
  { value: "400k-plus", label: "400,000+" },
];

const referralOptions = [
  { value: "google", label: "Google" },
  { value: "reddit", label: "Reddit" },
  { value: "sourceforgeg2", label: "SourceForge / G2" },
  { value: "podcast", label: "Podcast" },
  { value: "industry-magazine", label: "Industry Magazine" },
  { value: "friend", label: "A Friend" },
  { value: "other", label: "Other" },
];

const OnboardingWizard = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>({
    industry: null,
    volume: null,
    referralSource: null,
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setIsFreeUser, setIsOnPaidPlan, startFreeTrial } = useTrialAlert();
  
  const steps = [
    {
      title: "What industry are you in?",
      description: "This helps us personalize your experience",
      field: "industry" as const,
      options: industryOptions,
    },
    {
      title: "How many property addresses do you need data for monthly?",
      description: "We'll recommend the right plan for your needs",
      field: "volume" as const,
      options: volumeOptions,
    },
    {
      title: "How did you hear about us?",
      description: "We're always looking to improve our outreach",
      field: "referralSource" as const,
      options: referralOptions,
    },
  ];

  const currentStep = steps[step];
  
  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Submit the form data
      handleComplete();
    }
  };
  
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const handleComplete = () => {
    // In a real app, you would send this data to an API
    console.log("Form data submitted:", data);
    
    // Start free trial
    if (startFreeTrial) {
      // Start the trial with 14 days
      startFreeTrial();
    } else {
      // If startFreeTrial is not available, set the trial state manually
      setIsFreeUser(true);
      setIsOnPaidPlan(false);
      // Store in localStorage for persistence
      localStorage.setItem('isFreeUser', 'true');
      localStorage.setItem('isOnPaidPlan', 'false');
      localStorage.setItem('trialStartDate', new Date().toISOString());
    }
    
    // Ensure the user is authenticated before redirecting to dashboard
    localStorage.setItem('isAuthenticated', 'true');
    
    // Show success message
    toast({
      title: "Account setup complete!",
      description: "Welcome to your free trial. Your dashboard is ready.",
    });
    
    // Redirect to dashboard
    navigate("/dashboard");
  };
  
  const updateField = (field: keyof WizardData, value: any) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  const isCurrentStepValid = !!data[currentStep.field];
  const progress = ((step + 1) / steps.length) * 100;

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
            
            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
              <div 
                className="h-full bg-[#04c8c8] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </CardHeader>
          
          <CardContent className="py-4">
            {currentStep.field === "industry" && (
              <RadioGroup
                value={data.industry || ""}
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
            )}
            
            {currentStep.field === "volume" && (
              <RadioGroup
                value={data.volume || ""}
                onValueChange={(value) => updateField("volume", value as VolumeOption)}
                className="space-y-3"
              >
                {volumeOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-grow cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            
            {currentStep.field === "referralSource" && (
              <RadioGroup
                value={data.referralSource || ""}
                onValueChange={(value) => updateField("referralSource", value as ReferralOption)}
                className="space-y-3"
              >
                {referralOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-grow cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            <Button
              onClick={handleNext}
              className="bg-[#04c8c8] hover:bg-[#04c8c8]/90"
              disabled={!isCurrentStepValid}
            >
              {step < steps.length - 1 ? (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Complete <Check className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardingWizard;
