
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the Account Executive type
export interface AccountExecutive {
  name: string;
  email: string;
  calendly: string;
  photo?: string;
}

// Define the context type
interface AccountExecutiveContextType {
  ae: AccountExecutive | null;
  isWidgetVisible: boolean;
  showWidget: () => void;
  hideWidget: () => void;
  toggleWidget: () => void;
}

// Create the context with default values
const AccountExecutiveContext = createContext<AccountExecutiveContextType | undefined>(undefined);

// Create a hook to use the context
export const useAccountExecutive = () => {
  const context = useContext(AccountExecutiveContext);
  if (context === undefined) {
    throw new Error('useAccountExecutive must be used within an AccountExecutiveProvider');
  }
  return context;
};

interface AccountExecutiveProviderProps {
  children: ReactNode;
  initialVisibility?: boolean;
}

export const AccountExecutiveProvider = ({
  children,
  initialVisibility = false,
}: AccountExecutiveProviderProps) => {
  // State for the widget visibility
  const [isWidgetVisible, setIsWidgetVisible] = useState(initialVisibility);
  
  // Mocked AE data - in a real app, this would come from the user object or API
  const [ae, setAe] = useState<AccountExecutive | null>({
    name: 'Alex Grant',
    email: 'alex@realestateapi.com',
    calendly: 'https://calendly.com/alex-reapi',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&q=80',
  });

  // Check if the AE should be shown automatically (based on user record threshold or showAE flag)
  useEffect(() => {
    // Mock checking user state for showAE flag
    // In a real app, this would use actual user data
    const checkUserTriggers = async () => {
      try {
        // Simulate API call to check user state
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo purposes, let's assume showAE is false
        const mockShowAE = false;
        
        // Check if records fetched exceeds threshold (200)
        // This would come from actual usage data in a real app
        const mockRecordsFetched = 150;
        const showDueToUsage = mockRecordsFetched > 200;
        
        // Show the widget if either condition is true
        if (mockShowAE || showDueToUsage) {
          setIsWidgetVisible(true);
        }
      } catch (error) {
        console.error("Failed to check AE display triggers:", error);
      }
    };
    
    checkUserTriggers();
  }, []);

  // Actions for showing/hiding the widget
  const showWidget = () => setIsWidgetVisible(true);
  const hideWidget = () => setIsWidgetVisible(false);
  const toggleWidget = () => setIsWidgetVisible(prev => !prev);

  return (
    <AccountExecutiveContext.Provider
      value={{
        ae,
        isWidgetVisible,
        showWidget,
        hideWidget,
        toggleWidget
      }}
    >
      {children}
    </AccountExecutiveContext.Provider>
  );
};
