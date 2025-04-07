
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WizardSteps } from "./WizardSteps";
import { WizardContent } from "./WizardContent";
import { PlanData, AddOnData } from "@/types/billing";

interface UpgradeWizardV2Props {
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

export const UpgradeWizardV2 = ({
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
}: UpgradeWizardV2Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const selectedPlanName = plans.find(p => p.id === selectedPlan)?.name || 'Selected';
  
  // Filter out enterprise plan from the regular plans list
  const regularPlans = plans.filter(p => p.id !== "enterprise");
  
  const steps = [
    { title: "Choose Your Plan", description: "Select the right plan for your needs" },
    { title: "Select Add-Ons", description: "Enhance your plan with additional features" },
    { title: "Configure Overage Handling", description: "Decide how to handle usage beyond your plan limits" },
    { title: "Review & Confirm", description: "Review your selections before confirming" }
  ];
  
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
          <WizardSteps currentStep={currentStep} steps={steps} />
        </CardHeader>
        
        <CardContent className="pt-6 pb-2 mt-6">
          <WizardContent 
            currentStep={currentStep}
            selectedPlan={selectedPlan}
            billingCycle={billingCycle}
            activeAddOns={activeAddOns}
            overageHandling={overageHandling}
            plans={plans}
            regularPlans={regularPlans}
            enterprisePlan={enterprisePlan}
            addOns={addOns}
            costs={costs}
            selectedPlanName={selectedPlanName}
            isLoading={isLoading}
            onPlanChange={onPlanChange}
            onToggleAddOn={onToggleAddOn}
            onOverageHandlingChange={onOverageHandlingChange}
            onBillingCycleChange={onBillingCycleChange}
            onSelectEnterprise={onSelectEnterprise || (() => {})}
          />
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
