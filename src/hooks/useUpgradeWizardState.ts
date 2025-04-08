
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { PlanData, AddOnData } from "@/types/billing";

export const useUpgradeWizardState = (props: {
  selectedPlan: string;
  billingCycle: 'monthly' | 'annual';
  activeAddOns: string[];
  overageHandling: string;
  onSaveBillingPreferences: () => void;
  onFinish: () => void;
}) => {
  const {
    selectedPlan,
    billingCycle,
    activeAddOns,
    overageHandling,
    onSaveBillingPreferences,
    onFinish
  } = props;

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ach'>('card');
  const [formData, setFormData] = useState({
    plan: selectedPlan,
    billingCycle,
    addOns: [...activeAddOns],
    overageHandling,
    paymentMethod: 'card',
    termsAccepted: false,
    cardInfo: {
      number: '',
      expiry: '',
      cvc: '',
      name: ''
    },
    achInfo: {
      accountNumber: '',
      routingNumber: '',
      accountType: 'checking',
      accountName: ''
    }
  });
  
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
      window.scrollTo(0, 0);
    }
  }, [currentStep]);
  
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      plan: selectedPlan,
      billingCycle,
      addOns: [...activeAddOns],
      overageHandling
    }));
  }, [selectedPlan, billingCycle, activeAddOns, overageHandling]);
  
  const handleNext = () => {
    if (currentStep === 2 && !overageHandling) {
      toast({
        title: "Selection Required",
        description: "Please select an overage handling option to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 4 && !termsAccepted) {
      toast({
        title: "Terms Acceptance Required",
        description: "Please accept the terms of service to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep < 5) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(prevStep => prevStep + 1);
        setIsLoading(false);
      }, 300);
    } else {
      setIsLoading(true);
      onSaveBillingPreferences();
      setTimeout(() => {
        toast({
          title: "Subscription Updated",
          description: "Your subscription changes have been saved successfully.",
        });
        setIsLoading(false);
        onFinish();
      }, 1000);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(prevStep => prevStep - 1);
        setIsLoading(false);
      }, 300);
    } else {
      onFinish();
    }
  };
  
  const handleTermsAccepted = (accepted: boolean) => {
    setTermsAccepted(accepted);
    setFormData(prev => ({
      ...prev,
      termsAccepted: accepted
    }));
  };
  
  const handlePaymentMethodChange = (method: 'card' | 'ach') => {
    setPaymentMethod(method);
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };
  
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    currentStep,
    isLoading,
    termsAccepted,
    paymentMethod,
    formData,
    contentRef,
    handleNext,
    handleBack,
    handleTermsAccepted,
    handlePaymentMethodChange,
    updateFormData
  };
};
