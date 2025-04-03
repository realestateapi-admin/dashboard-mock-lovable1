
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the Solutions Engineer type
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
  isEnterprisePlan: boolean;
  showWidget: () => void;
  hideWidget: () => void;
  toggleWidget: () => void;
  setAe: (ae: AccountExecutive | null) => void;
  setIsEnterprisePlan: (isEnterprise: boolean) => void;
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
  // State for tracking if user is on enterprise plan
  const [isEnterprisePlan, setIsEnterprisePlan] = useState(false);
  
  // Mocked SE data - in a real app, this would come from the user object or API
  const [ae, setAe] = useState<AccountExecutive | null>({
    name: 'Alex Grant',
    email: 'alex@realestateapi.com',
    calendly: 'https://calendly.com/alex-reapi',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&q=80',
  });

  // Initialize widget closed state in localStorage if not set
  useEffect(() => {
    const widgetClosedCount = localStorage.getItem('widgetClosedCount');
    if (!widgetClosedCount) {
      localStorage.setItem('widgetClosedCount', '0');
    }
    
    // Check if user is on enterprise plan from localStorage
    const selectedPlan = localStorage.getItem('selectedPlan');
    if (selectedPlan === 'enterprise') {
      setIsEnterprisePlan(true);
      // Always show widget for enterprise users
      setIsWidgetVisible(true);
    }
  }, []);

  // Check if the SE widget should be shown automatically
  useEffect(() => {
    // Only show widget on support page or when triggered
    const checkPageAndTriggers = async () => {
      try {
        // Simulate API call to check user state
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real app, we would check for user.metadata.solutionsEngineer
        // If user has a solutions engineer assigned, we would setAe with that data
        
        // For demo purposes, let's assume showAE is false
        const mockShowAE = false;
        
        // Show the widget automatically in these conditions:
        // 1. User has just landed on the support page (determined by route)
        // 2. User has exceeded usage threshold
        // 3. User has a custom flag set to show the AE
        // 4. User is on enterprise plan (NEW)
        
        const isOnSupportPage = window.location.pathname.includes('/support');
        
        // Check if records fetched exceeds threshold (200)
        const mockRecordsFetched = 150;
        const showDueToUsage = mockRecordsFetched > 200;
        
        // Get the number of times widget was closed
        const widgetClosedCount = parseInt(localStorage.getItem('widgetClosedCount') || '0');
        
        // Show automatically on support page if widget wasn't closed too many times
        // Or if user is on enterprise plan
        if ((isOnSupportPage && widgetClosedCount < 3) || mockShowAE || showDueToUsage || isEnterprisePlan) {
          setIsWidgetVisible(true);
        }
      } catch (error) {
        console.error("Failed to check SE display triggers:", error);
      }
    };
    
    checkPageAndTriggers();
  }, [isEnterprisePlan]);

  // Actions for showing/hiding the widget
  const showWidget = () => setIsWidgetVisible(true);
  
  const hideWidget = () => {
    // Only allow hiding the widget if not on enterprise plan
    if (!isEnterprisePlan) {
      setIsWidgetVisible(false);
      
      // Increment the widget closed count in localStorage
      const currentCount = parseInt(localStorage.getItem('widgetClosedCount') || '0');
      localStorage.setItem('widgetClosedCount', (currentCount + 1).toString());
    }
  };
  
  const toggleWidget = () => {
    if (!isEnterprisePlan) {
      setIsWidgetVisible(prev => !prev);
    } else if (!isWidgetVisible) {
      // For enterprise users, only allow showing the widget if it's hidden
      setIsWidgetVisible(true);
    }
  };

  return (
    <AccountExecutiveContext.Provider
      value={{
        ae,
        isWidgetVisible,
        isEnterprisePlan,
        showWidget,
        hideWidget,
        toggleWidget,
        setAe,
        setIsEnterprisePlan
      }}
    >
      {children}
    </AccountExecutiveContext.Provider>
  );
};
