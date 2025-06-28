
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { isPaidPlan } from '@/services/subscriptionService';

interface TrialContextType {
  trialDaysLeft: number;
  isTrialActive: boolean;
  isPastTrial: boolean;
  requestTrialExtension: () => void;
  trialStartDate: Date | null;
  isFreeUser: boolean;
  isOnPaidPlan: boolean;
  setIsFreeUser: (value: boolean) => void;
  setIsOnPaidPlan: (value: boolean) => void;
  startFreeTrial: () => void;
}

const TrialAlertContext = createContext<TrialContextType | undefined>(undefined);

export const useTrialAlert = () => {
  const context = useContext(TrialAlertContext);
  if (context === undefined) {
    throw new Error('useTrialAlert must be used within a TrialAlertProvider');
  }
  return context;
};

interface TrialAlertProviderProps {
  children: ReactNode;
}

export const TrialAlertProvider = ({ children }: TrialAlertProviderProps) => {
  // DEMO: Set to 0 days left to show red styling (expired state)
  const [trialDaysLeft, setTrialDaysLeft] = useState<number>(0);
  const [trialStartDate, setTrialStartDate] = useState<Date | null>(null);
  const [isFreeUser, setIsFreeUser] = useState<boolean>(true);
  const [isOnPaidPlan, setIsOnPaidPlan] = useState<boolean>(false);
  const { toast } = useToast();

  // Mock loading trial data
  useEffect(() => {
    // Check if there's saved trial data
    const savedTrialStartDate = localStorage.getItem('trialStartDate');
    const savedIsFreeUser = localStorage.getItem('isFreeUser');
    const savedIsOnPaidPlan = localStorage.getItem('isOnPaidPlan');
    
    if (savedTrialStartDate) {
      const startDate = new Date(savedTrialStartDate);
      setTrialStartDate(startDate);
      // DEMO: Force 0 days left for demonstration (expired)
      setTrialDaysLeft(0);
    }
    
    if (savedIsFreeUser) {
      setIsFreeUser(savedIsFreeUser === 'true');
    }
    
    if (savedIsOnPaidPlan) {
      setIsOnPaidPlan(savedIsOnPaidPlan === 'true');
    }
    
    // If no saved data, use the mock data
    if (!savedTrialStartDate && !savedIsFreeUser && !savedIsOnPaidPlan) {
      // Mock data - this would come from your backend
      const mockStartDate = new Date();
      mockStartDate.setDate(mockStartDate.getDate() - 14); // 14 days ago = expired
      
      setTrialStartDate(mockStartDate);
      // DEMO: Force 0 days left for demonstration (expired)
      setTrialDaysLeft(0);
      
      // For demo purposes, set the user to be on a free plan to show the trial banner
      setIsFreeUser(true);
      setIsOnPaidPlan(false);
      
      // Save to localStorage
      localStorage.setItem('trialStartDate', mockStartDate.toISOString());
      localStorage.setItem('isFreeUser', 'true');
      localStorage.setItem('isOnPaidPlan', 'false');
    }
  }, []);

  // When isOnPaidPlan or isFreeUser changes, update localStorage
  useEffect(() => {
    localStorage.setItem('isOnPaidPlan', isOnPaidPlan.toString());
    localStorage.setItem('isFreeUser', isFreeUser.toString());
    
    // If a user is on a paid plan, they are no longer considered a free user
    if (isOnPaidPlan && isFreeUser) {
      setIsFreeUser(false);
      localStorage.setItem('isFreeUser', 'false');
    }
  }, [isOnPaidPlan, isFreeUser]);

  // Check for trial alerts
  useEffect(() => {
    // Only show alerts for free users who are not on a paid plan
    if (!isFreeUser || isOnPaidPlan) return;
    
    // Show alerts on specific days
    if (trialDaysLeft === 7) {
      toast({
        title: "Free Plan Update",
        description: "You have 7 days left in your free plan. Explore all our features!",
        duration: 6000,
      });
    } else if (trialDaysLeft === 3) {
      toast({
        title: "Free Plan Update",
        description: "Only 3 days left in your free plan. Consider upgrading to continue accessing all features.",
        duration: 6000,
      });
    } else if (trialDaysLeft === 1) {
      toast({
        variant: "destructive",
        title: "Free Plan Ending Soon",
        description: "Your free plan ends tomorrow! Upgrade now to avoid interruption.",
        duration: 8000,
      });
    }
  }, [trialDaysLeft, toast, isFreeUser, isOnPaidPlan]);

  // Start a fresh free trial
  const startFreeTrial = () => {
    const newStartDate = new Date();
    setTrialStartDate(newStartDate);
    setTrialDaysLeft(14);
    setIsFreeUser(true);
    setIsOnPaidPlan(false);
    
    // Store in localStorage for persistence
    localStorage.setItem('trialStartDate', newStartDate.toISOString());
    localStorage.setItem('isFreeUser', 'true');
    localStorage.setItem('isOnPaidPlan', 'false');
  };

  const requestTrialExtension = () => {
    // In a real app, this would call your API
    toast({
      title: "Extension Requested",
      description: "Your free plan extension request has been submitted. Our team will contact you shortly.",
    });
  };

  const value = {
    trialDaysLeft,
    isTrialActive: trialDaysLeft >= 0, // Changed from > 0 to >= 0 to show expired banners
    isPastTrial: trialDaysLeft < 0, // This would be for truly past trials
    requestTrialExtension,
    trialStartDate,
    isFreeUser,
    isOnPaidPlan,
    setIsFreeUser,
    setIsOnPaidPlan,
    startFreeTrial,
  };

  return (
    <TrialAlertContext.Provider value={value}>
      {children}
    </TrialAlertContext.Provider>
  );
};
