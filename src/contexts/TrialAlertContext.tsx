
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface TrialContextType {
  trialDaysLeft: number;
  isTrialActive: boolean;
  isPastTrial: boolean;
  requestTrialExtension: () => void;
  trialStartDate: Date | null;
  isFreeUser: boolean;
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
  const [trialDaysLeft, setTrialDaysLeft] = useState<number>(14); // Changed from 7 to 14 days for free plan
  const [trialStartDate, setTrialStartDate] = useState<Date | null>(null);
  const [isFreeUser, setIsFreeUser] = useState<boolean>(true); // Default to true for demo purposes
  const { toast } = useToast();

  // Mock loading trial data
  useEffect(() => {
    // In a real app, this would be fetched from your API
    const mockLoadTrialData = async () => {
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - this would come from your backend
        const mockStartDate = new Date();
        mockStartDate.setDate(mockStartDate.getDate() - 2); // 2 days into trial
        
        setTrialStartDate(mockStartDate);
        const daysElapsed = Math.floor((Date.now() - mockStartDate.getTime()) / (1000 * 60 * 60 * 24));
        setTrialDaysLeft(14 - daysElapsed); // Changed from 7 to 14 days for free plan
        
        // This would come from your backend to determine if user is on free plan
        setIsFreeUser(true); // Demo purposes - would be based on user's subscription
      } catch (error) {
        console.error("Failed to load trial data:", error);
      }
    };
    
    mockLoadTrialData();
  }, []);

  // Check for trial alerts
  useEffect(() => {
    // Only show alerts for free users
    if (!isFreeUser) return;
    
    // Show alerts on specific days
    if (trialDaysLeft === 7) { // Updated from 4 to 7 days
      toast({
        title: "Free Plan Update",
        description: "You have 7 days left in your free plan. Explore all our features!",
        duration: 6000,
      });
    } else if (trialDaysLeft === 3) { // Updated from 2 to 3 days
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
  }, [trialDaysLeft, toast, isFreeUser]);

  const requestTrialExtension = () => {
    // In a real app, this would call your API
    toast({
      title: "Extension Requested",
      description: "Your free plan extension request has been submitted. Our team will contact you shortly.",
    });
  };

  const value = {
    trialDaysLeft,
    isTrialActive: trialDaysLeft > 0,
    isPastTrial: trialDaysLeft <= 0,
    requestTrialExtension,
    trialStartDate,
    isFreeUser,
  };

  return (
    <TrialAlertContext.Provider value={value}>
      {children}
    </TrialAlertContext.Provider>
  );
};
