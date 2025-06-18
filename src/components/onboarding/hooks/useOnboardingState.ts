
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { useAuth } from "@/contexts/AuthContext";
import { WizardData, IndustryData, TeamData, VolumeOption, ReferralOption } from "../types/OnboardingTypes";

export const useOnboardingState = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>({
    industry: null,
    team: null,
    volume: null,
    referralSource: null,
    creditCardInfo: null,
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setIsFreeUser, setIsOnPaidPlan, startFreeTrial } = useTrialAlert();
  const { setIsAuthenticated, setCurrentRole } = useAuth();
  
  const handleNext = () => {
    if (step < 4) {
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
    
    // Save credit card info to localStorage for use in the payment form later
    if (data.creditCardInfo) {
      localStorage.setItem('creditCardInfo', JSON.stringify(data.creditCardInfo));
    }
    
    // Save team information
    if (data.team) {
      localStorage.setItem('teamData', JSON.stringify(data.team));
    }
    
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
    
    // Explicitly mark onboarding as completed
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
