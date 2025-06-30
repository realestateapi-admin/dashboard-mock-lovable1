import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

// Import wizard components
import { WizardHeader } from "@/components/billing/wizard/WizardHeader";
import { WizardFooter } from "@/components/billing/wizard/WizardFooter";
import { WizardContent } from "@/components/billing/wizard/WizardContent";

// Import the refactored useWizardState hook
import { useWizardState } from "@/hooks/useWizardState";
import { plans, addOns } from "@/data/billingData";

const PlanSignupWizard = () => {
  const [isPaymentFormValid, setIsPaymentFormValid] = useState(false);
  const [hasDefaultPaymentMethod, setHasDefaultPaymentMethod] = useState(true);
  const [showValidationError, setShowValidationError] = useState(false);
  
  const {
    currentStep,
    billingCycle,
    isLoading,
    isSubmitting,
    selectedPlan,
    overageHandling,
    setOverageHandling,
    activeAddOns,
    toggleAddOn,
    costs,
    steps,
    enterprisePlan,
    regularPlans,
    creditCardInfo,
    termsAccepted,
    handleTermsAccepted,
    handleSelectEnterprise,
    handleNext: wizardHandleNext,
    handleBack,
    handleBillingCycleChange,
    handlePlanChange,
    handleSubmit
  } = useWizardState();

  // Determine if the current step allows navigation
  const canContinue = () => {
    // Payment step (step 3) requires valid payment information AND a default payment method
    if (currentStep === 3) {
      return isPaymentFormValid && hasDefaultPaymentMethod;
    }
    // Other steps can continue as normal
    return true;
  };

  // Get validation error message based on current step
  const getValidationError = () => {
    if (currentStep === 3) {
      if (!isPaymentFormValid && !hasDefaultPaymentMethod) {
        return "Please complete your payment information and select a default payment method to continue.";
      } else if (!isPaymentFormValid) {
        return "Please complete all required payment information fields to continue.";
      } else if (!hasDefaultPaymentMethod) {
        return "Please select a default payment method to continue.";
      }
    }
    return "";
  };

  // Custom handleNext that shows validation errors when user tries to continue
  const handleNext = () => {
    if (canContinue()) {
      setShowValidationError(false);
      wizardHandleNext();
    } else {
      setShowValidationError(true);
    }
  };

  // Reset validation error when step changes
  React.useEffect(() => {
    setShowValidationError(false);
  }, [currentStep]);

  return (
    <div className="h-screen bg-background p-4 flex justify-center py-0 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="w-full max-w-7xl h-[90vh] max-h-[900px] mt-4"
      >
        <Card className="border shadow-lg h-full flex flex-col">
          <CardHeader className="flex-shrink-0 pb-4">
            <WizardHeader currentStep={currentStep} steps={steps} hideProgressBar={true} />
          </CardHeader>
          
          <CardContent className="flex-1 overflow-hidden py-0">
            <WizardContent 
              currentStep={currentStep} 
              billingCycle={billingCycle} 
              isLoading={isLoading} 
              selectedPlan={selectedPlan} 
              overageHandling={overageHandling} 
              setOverageHandling={setOverageHandling} 
              activeAddOns={activeAddOns} 
              toggleAddOn={toggleAddOn} 
              costs={costs} 
              regularPlans={regularPlans} 
              enterprisePlan={enterprisePlan} 
              addOns={addOns} 
              plans={plans} 
              creditCardInfo={creditCardInfo} 
              termsAccepted={termsAccepted} 
              onTermsAccepted={handleTermsAccepted} 
              onSelectEnterprise={handleSelectEnterprise} 
              onBillingCycleChange={handleBillingCycleChange} 
              onPlanChange={handlePlanChange} 
              onSubmit={handleSubmit}
              onPaymentValidationChange={setIsPaymentFormValid}
              onDefaultPaymentMethodValidationChange={setHasDefaultPaymentMethod}
            />
          </CardContent>
          
          <CardFooter className="flex-shrink-0 pt-4 pb-4">
            <WizardFooter 
              currentStep={currentStep} 
              totalSteps={steps.length} 
              handleBack={handleBack} 
              handleNext={handleNext} 
              handleSubmit={handleSubmit} 
              isLoading={currentStep === steps.length - 1 ? isSubmitting : isLoading}
              canContinue={canContinue()}
              validationError={getValidationError()}
              showValidationError={showValidationError}
            />
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default PlanSignupWizard;
