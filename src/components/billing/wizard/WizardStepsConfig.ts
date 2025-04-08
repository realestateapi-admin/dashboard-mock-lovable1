
export interface WizardStep {
  title: string;
  description: string;
}

export const getWizardSteps = (): WizardStep[] => {
  return [
    {
      title: "Plan Selection",
      description: "Choose a subscription plan that fits your needs"
    },
    {
      title: "Add-Ons",
      description: "Select additional features and capabilities"
    },
    {
      title: "Overage Handling",
      description: "Configure how to handle usage beyond your plan limits"
    },
    {
      title: "Payment Method",
      description: "Update or confirm your payment information"
    },
    {
      title: "Terms of Service",
      description: "Review and accept the terms of service"
    },
    {
      title: "Confirmation",
      description: "Review your subscription changes before finalizing"
    }
  ];
};
