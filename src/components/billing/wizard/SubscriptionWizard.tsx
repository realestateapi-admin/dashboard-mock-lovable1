
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PlanData, AddOnData, SubscriptionData } from "@/types/billing";
import { WizardHeader } from "./WizardHeader";
import { PlanSelectionStep } from "./steps/PlanSelectionStep";
import { AddOnsStep } from "./steps/AddOnsStep";
import { OverageHandlingStep } from "./steps/OverageHandlingStep";
import { PaymentInfoStep } from "./steps/PaymentInfoStep";
import { TermsOfServiceStep } from "./steps/TermsOfServiceStep";
import { ConfirmationStep } from "./steps/ConfirmationStep";

interface SubscriptionWizardProps {
  plans: PlanData[];
  addOns: AddOnData[];
  selectedPlan: string;
  activeAddOns: string[];
  overageHandling: string;
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  billingCycle: 'monthly' | 'annual';
  subscription?: SubscriptionData | null;
  isLoadingSubscription: boolean;
  onPlanChange: (planId: string) => void;
  onToggleAddOn: (addOnId: string) => void;
  onOverageHandlingChange: (value: string) => void;
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  onSaveBillingPreferences: () => void;
  onFinish: () => void;
  enterprisePlan?: PlanData;
  onSelectEnterprise?: () => void;
}

export const SubscriptionWizard = ({
  plans,
  addOns,
  selectedPlan,
  activeAddOns,
  overageHandling,
  costs,
  billingCycle,
  subscription,
  isLoadingSubscription,
  onPlanChange,
  onToggleAddOn,
  onOverageHandlingChange,
  onBillingCycleChange,
  onSaveBillingPreferences,
  onFinish,
  enterprisePlan,
  onSelectEnterprise
}: SubscriptionWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { toast } = useToast();
  
  const selectedPlanName = plans.find(p => p.id === selectedPlan)?.name || 'Selected';
  
  // Filter out enterprise plan from the regular plans list
  const regularPlans = plans.filter(p => p.id !== "enterprise");
  
  const steps = [
    { title: "Choose Your Plan", description: "Select the right plan for your needs" },
    { title: "Select Add-Ons", description: "Enhance your plan with additional features" },
    { title: "Overage Handling", description: "Decide how to handle usage beyond your plan limits" },
    { title: "Payment Information", description: "Update your payment details" },
    { title: "Terms of Service", description: "Review and accept our terms" },
    { title: "Review & Confirm", description: "Review your selections before confirming" }
  ];
  
  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);
  
  const handleNext = () => {
    // Validate current step if needed
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
  
  // Handle terms acceptance
  const handleTermsAccepted = (accepted: boolean) => {
    setTermsAccepted(accepted);
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
          <WizardHeader currentStep={currentStep} steps={steps} />
        </CardHeader>
        
        <CardContent className="pt-6 pb-2 mt-6">
          {/* Step 1: Choose Plan */}
          {currentStep === 0 && (
            <PlanSelectionStep 
              selectedPlan={selectedPlan}
              billingCycle={billingCycle}
              regularPlans={regularPlans}
              enterprisePlan={enterprisePlan}
              onPlanChange={onPlanChange}
              onBillingCycleChange={onBillingCycleChange}
              onSelectEnterprise={onSelectEnterprise || (() => {})}
              isLoading={isLoading}
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
            />
          )}
          
          {/* Step 3: Overage Handling */}
          {currentStep === 2 && (
            <OverageHandlingStep 
              selectedPlanName={selectedPlanName}
              overageHandling={overageHandling}
              onOverageHandlingChange={onOverageHandlingChange}
              isLoading={isLoading}
            />
          )}
          
          {/* Step 4: Payment Information */}
          {currentStep === 3 && (
            <PaymentInfoStep isLoading={isLoading} />
          )}
          
          {/* Step 5: Terms of Service */}
          {currentStep === 4 && (
            <TermsOfServiceStep 
              termsAccepted={termsAccepted}
              onTermsAccepted={handleTermsAccepted}
              isLoading={isLoading}
            />
          )}
          
          {/* Step 6: Review & Confirm */}
          {currentStep === 5 && (
            <ConfirmationStep 
              selectedPlan={selectedPlan}
              plans={plans}
              activeAddOns={activeAddOns}
              addOns={addOns}
              overageHandling={overageHandling}
              costs={costs}
              billingCycle={billingCycle}
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
              <span className="flex items-center">
                Confirm & Subscribe <Check className="ml-2 h-4 w-4" />
              </span>
            ) : (
              <span className="flex items-center">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
