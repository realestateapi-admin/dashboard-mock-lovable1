
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckIcon, CreditCard, FileText, Settings, Package, ListChecks, FileCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PlanData, AddOnData } from "@/types/billing";

// Import wizard step components
import { WizardStepIndicator } from "./WizardStepIndicator";
import { PlanSelectionStep } from "./steps/PlanSelectionStep";
import { AddOnsStep } from "./steps/AddOnsStep";
import { OverageHandlingStep } from "./steps/OverageHandlingStep";
import { PaymentInfoStep } from "./steps/PaymentInfoStep";
import { TermsOfServiceStep } from "./steps/TermsOfServiceStep";
import { SummaryStep } from "./steps/SummaryStep";

interface UpgradeWizardProps {
  plans: PlanData[];
  addOns: AddOnData[];
  selectedPlan: string;
  billingCycle: 'monthly' | 'annual';
  activeAddOns: string[];
  overageHandling: string;
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  onPlanChange: (planId: string) => void;
  onToggleAddOn: (addOnId: string) => void;
  onOverageHandlingChange: (value: string) => void;
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  onSaveBillingPreferences: () => void;
  onFinish: () => void;
  enterprisePlan?: PlanData;
  onSelectEnterprise?: () => void;
}

export const UpgradeWizard = ({
  plans,
  addOns,
  selectedPlan,
  billingCycle,
  activeAddOns,
  overageHandling,
  costs,
  onPlanChange,
  onToggleAddOn,
  onOverageHandlingChange,
  onBillingCycleChange,
  onSaveBillingPreferences,
  onFinish,
  enterprisePlan,
  onSelectEnterprise
}: UpgradeWizardProps) => {
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
  
  // Get selected plan name
  const selectedPlanName = plans.find(p => p.id === selectedPlan)?.name || 'Selected';
  
  // Filter out enterprise plan from the regular plans list
  const regularPlans = plans.filter(p => p.id !== "enterprise");
  
  // Define the steps
  const steps = [
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
  
  // Scroll to top when changing steps
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
      window.scrollTo(0, 0);
    }
  }, [currentStep]);
  
  // Update form data when props change
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
    // Validate current step
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
    
    if (currentStep < steps.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(prevStep => prevStep + 1);
        setIsLoading(false);
      }, 300);
    } else {
      // Final step - save changes
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
      // Return to the billing page if on first step
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
  
  // Visually distinct styling with purple accent
  const accentColor = "bg-gradient-to-r from-purple-600 to-indigo-600";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="border shadow-lg overflow-hidden">
        {/* Header with accent color */}
        <div className={`${accentColor} h-2 w-full`}></div>
        
        <CardHeader className="pb-0">
          <WizardStepIndicator 
            steps={steps} 
            currentStep={currentStep} 
          />
        </CardHeader>
        
        <CardContent className="pt-6 pb-2 mt-6" ref={contentRef}>
          {/* Step 1: Choose Plan */}
          {currentStep === 0 && (
            <PlanSelectionStep 
              selectedPlan={selectedPlan}
              billingCycle={billingCycle}
              regularPlans={regularPlans}
              enterprisePlan={enterprisePlan}
              onPlanChange={onPlanChange}
              onBillingCycleChange={onBillingCycleChange}
              onSelectEnterprise={onSelectEnterprise}
              isLoading={isLoading}
              updateFormData={updateFormData}
            />
          )}
          
          {/* Step 2: Select Add-Ons */}
          {currentStep === 1 && (
            <AddOnsStep 
              addOns={addOns}
              selectedPlan={selectedPlan}
              activeAddOns={activeAddOns}
              onToggleAddOn={onToggleAddOn}
              isLoading={isLoading}
              updateFormData={updateFormData}
            />
          )}
          
          {/* Step 3: Overage Handling */}
          {currentStep === 2 && (
            <OverageHandlingStep 
              selectedPlanName={selectedPlanName}
              overageHandling={overageHandling}
              onOverageHandlingChange={onOverageHandlingChange}
              isLoading={isLoading}
              updateFormData={updateFormData}
            />
          )}
          
          {/* Step 4: Payment Information */}
          {currentStep === 3 && (
            <PaymentInfoStep 
              paymentMethod={paymentMethod}
              onPaymentMethodChange={handlePaymentMethodChange}
              formData={formData}
              updateFormData={updateFormData}
              isLoading={isLoading}
            />
          )}
          
          {/* Step 5: Terms of Service */}
          {currentStep === 4 && (
            <TermsOfServiceStep 
              termsAccepted={termsAccepted}
              onTermsAccepted={handleTermsAccepted}
              isLoading={isLoading}
              updateFormData={updateFormData}
            />
          )}
          
          {/* Step 6: Review & Confirm */}
          {currentStep === 5 && (
            <SummaryStep 
              selectedPlan={selectedPlan}
              plans={plans}
              activeAddOns={activeAddOns}
              addOns={addOns}
              overageHandling={overageHandling}
              costs={costs}
              billingCycle={billingCycle}
              formData={formData}
              isLoading={isLoading}
            />
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between pt-6">
          <Button
            onClick={handleBack}
            variant="outline"
          >
            {currentStep === 0 ? (
              <span>Cancel</span>
            ) : (
              <>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </>
            )}
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? (
              <span>Processing...</span>
            ) : currentStep === steps.length - 1 ? (
              <span>Confirm Changes</span>
            ) : (
              <span>Next <ArrowRight className="ml-2 h-4 w-4" /></span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
