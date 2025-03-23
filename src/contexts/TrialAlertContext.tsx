
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface TrialContextType {
  trialDaysLeft: number;
  isTrialActive: boolean;
  isPastTrial: boolean;
  requestTrialExtension: () => void;
  trialStartDate: Date | null;
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
  const [trialDaysLeft, setTrialDaysLeft] = useState<number>(14);
  const [trialStartDate, setTrialStartDate] = useState<Date | null>(null);
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
        mockStartDate.setDate(mockStartDate.getDate() - 7); // 7 days into trial
        
        setTrialStartDate(mockStartDate);
        const daysElapsed = Math.floor((Date.now() - mockStartDate.getTime()) / (1000 * 60 * 60 * 24));
        setTrialDaysLeft(14 - daysElapsed);
      } catch (error) {
        console.error("Failed to load trial data:", error);
      }
    };
    
    mockLoadTrialData();
  }, []);

  // Check for trial alerts
  useEffect(() => {
    // Show alerts on specific days
    if (trialDaysLeft === 7) {
      toast({
        title: "Trial Update",
        description: "You have 7 days left in your trial. Explore all our features!",
        duration: 6000,
      });
    } else if (trialDaysLeft === 4) {
      toast({
        title: "Trial Update",
        description: "Only 4 days left in your trial. Consider upgrading to continue accessing all features.",
        duration: 6000,
      });
    } else if (trialDaysLeft === 1) {
      toast({
        variant: "destructive",
        title: "Trial Ending Soon",
        description: "Your trial ends tomorrow! Upgrade now to avoid interruption.",
        duration: 8000,
      });
    }
  }, [trialDaysLeft, toast]);

  const requestTrialExtension = () => {
    // In a real app, this would call your API
    toast({
      title: "Extension Requested",
      description: "Your trial extension request has been submitted. Our team will contact you shortly.",
    });
  };

  const value = {
    trialDaysLeft,
    isTrialActive: trialDaysLeft > 0,
    isPastTrial: trialDaysLeft <= 0,
    requestTrialExtension,
    trialStartDate,
  };

  return (
    <TrialAlertContext.Provider value={value}>
      {children}
    </TrialAlertContext.Provider>
  );
};
