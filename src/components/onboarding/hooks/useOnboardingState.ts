
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { useAuth } from "@/contexts/AuthContext";
import { WizardData } from "../types/OnboardingTypes";

export const useOnboardingState = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>({
    industry: null,
    volume: null,
    referralSource: null,
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setIsFreeUser, setIsOnPaidPlan, startFreeTrial } = useTrialAlert();
  const { setIsAuthenticated, setCurrentRole } = useAuth();
  
  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };
  
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const handleComplete = () => {
    console.log("Form data submitted:", data);
    
    if (startFreeTrial) {
      startFreeTrial();
    } else {
      setIsFreeUser(true);
      setIsOnPaidPlan(false);
      localStorage.setItem('isFreeUser', 'true');
      localStorage.setItem('isOnPaidPlan', 'false');
      localStorage.setItem('trialStartDate', new Date().toISOString());
    }
    
    setIsAuthenticated(true);
    setCurrentRole('admin');
    
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', 'admin');
    localStorage.setItem('hasCompletedOnboarding', 'true');
    
    toast({
      title: "Account setup complete!",
      description: "Welcome to your free trial. Your dashboard is ready.",
    });
    
    navigate("/dashboard");
  };
  
  const updateField = (field: keyof WizardData, value: any) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  return {
    step,
    data,
    handleNext,
    handleBack,
    updateField,
  };
};
