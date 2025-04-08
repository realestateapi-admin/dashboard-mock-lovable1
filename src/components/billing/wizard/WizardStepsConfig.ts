
import { Package, ListChecks, Settings, CreditCard, FileText, FileCheck } from "lucide-react";

export interface WizardStep {
  title: string;
  description: string;
  icon: React.ElementType;
}

export const getWizardSteps = (): WizardStep[] => {
  return [
    { 
      title: "Choose Your Plan", 
      description: "Select the right plan for your needs",
      icon: Package
    },
    { 
      title: "Select Add-Ons", 
      description: "Enhance your plan with additional features",
      icon: ListChecks
    },
    { 
      title: "Configure Overage", 
      description: "Decide how to handle usage beyond plan limits",
      icon: Settings
    },
    { 
      title: "Payment Information", 
      description: "Enter your payment details",
      icon: CreditCard
    },
    { 
      title: "Terms of Service", 
      description: "Review and accept our terms",
      icon: FileText
    },
    { 
      title: "Review & Confirm", 
      description: "Confirm your subscription changes",
      icon: FileCheck
    }
  ];
};
