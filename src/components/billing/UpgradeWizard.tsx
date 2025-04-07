
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckIcon } from "lucide-react";

// Import wizard components
import { BillingOptionStep } from "./wizard/BillingOptionStep";
import { AddOnsList } from "./AddOnsList";
import { OverageHandling } from "./OverageHandling";
import { PaymentMethodForm } from "./PaymentMethodForm";
import { SubscriptionSummary } from "./SubscriptionSummary";

import { PlanData, AddOnData } from "@/types/billing";
import { useToast } from "@/hooks/use-toast";

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
          <div className="flex flex-col space-y-1.5">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-purple-700">
                  {steps[currentStep].title}
                </h2>
                <p className="text-muted-foreground">
                  {steps[currentStep].description}
                </p>
              </div>
              <div className="text-sm font-medium">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="w-full mt-4">
              <div className="flex items-center w-full">
                {steps.map((step, index) => (
                  <div key={index} className="flex-1 relative">
                    <div className="flex items-center">
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center border-2 
                        ${index < currentStep 
                          ? 'bg-purple-600 border-purple-600 text-white' 
                          : index === currentStep 
                            ? 'border-purple-600 text-purple-600' 
                            : 'border-gray-300 text-gray-300'
                        }`}
                      >
                        {index < currentStep ? (
                          <CheckIcon className="h-5 w-5" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      
                      {index < steps.length - 1 && (
                        <div className={`h-0.5 flex-1 ml-2 mr-2 
                          ${index < currentStep ? 'bg-purple-600' : 'bg-gray-200'}`}
                        ></div>
                      )}
                    </div>
                    
                    <span className={`absolute w-max text-xs mt-1 transform -translate-x-1/4
                      ${index <= currentStep ? 'text-purple-600 font-medium' : 'text-gray-400'}`}
                    >
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6 pb-2">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              {currentStep === 0 && (
                <BillingOptionStep 
                  selectedPlan={selectedPlan}
                  billingCycle={billingCycle}
                  adjustedPlans={regularPlans}
                  enterprisePlan={enterprisePlan}
                  onPlanChange={onPlanChange}
                  onBillingCycleChange={onBillingCycleChange}
                  onSelectEnterprise={onSelectEnterprise || (() => {})}
                  isLoading={isLoading}
                />
              )}
              
              {currentStep === 1 && (
                <AddOnsList 
                  addOns={addOns}
                  selectedPlan={selectedPlan}
                  activeAddOns={activeAddOns}
                  onToggleAddOn={onToggleAddOn}
                  isLoading={isLoading}
                />
              )}
              
              {currentStep === 2 && (
                <OverageHandling 
                  selectedPlanName={selectedPlanName}
                  overageHandling={overageHandling}
                  onOverageHandlingChange={onOverageHandlingChange}
                  isLoading={isLoading}
                />
              )}
              
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Review Your Subscription Changes</h3>
                  <div className="space-y-6 p-4 border rounded-lg bg-gray-50">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Selected Plan</p>
                      <p className="font-medium">{selectedPlanName} ({billingCycle === 'monthly' ? 'Monthly' : 'Annual'})</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Add-Ons</p>
                      {activeAddOns.length > 0 ? (
                        <ul className="space-y-1">
                          {activeAddOns.map(addonId => {
                            const addon = addOns.find(a => a.id === addonId);
                            return (
                              <li key={addonId} className="font-medium text-sm">
                                {addon?.name}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <p className="text-sm">No add-ons selected</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Overage Handling</p>
                      <p className="font-medium">
                        {overageHandling === 'cut-off' && 'Cut off access at plan limit'}
                        {overageHandling === 'allow-25' && 'Allow 25% overage billed at the plan\'s unit rate'}
                        {overageHandling === 'allow-100' && 'Allow 100% overage billed at the plan\'s unit rate'}
                        {overageHandling === 'unlimited' && 'No limit on overages (mission critical)'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="md:col-span-4">
              <SubscriptionSummary 
                selectedPlan={selectedPlan}
                plans={plans}
                activeAddOns={activeAddOns}
                addOns={addOns}
                costs={costs}
                subscription={null}
                isLoading={isLoading}
                onSubmit={() => {}}
                billingCycle={billingCycle}
                showSubmitButton={false}
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-6">
          <Button
            onClick={handleBack}
            disabled={currentStep === 0 || isLoading}
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
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
