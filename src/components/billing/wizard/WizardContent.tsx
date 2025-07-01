
import { BillingOptionStep } from "./BillingOptionStep";
import { AddOnsList } from "@/components/billing/AddOnsList";
import { OverageHandling } from "@/components/billing/OverageHandling";
import { PaymentMethodForm } from "@/components/billing/PaymentMethodForm";
import { SubscriptionSummary } from "@/components/billing/SubscriptionSummary";
import { TermsOfServiceStep } from "@/components/billing/wizard/TermsOfServiceStep";
import { SubscriptionConfirmationStep } from "@/components/billing/wizard/SubscriptionConfirmationStep";
import { PlanData, AddOnData } from "@/types/billing";
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";

interface WizardContentProps {
  currentStep: number;
  billingCycle: 'monthly' | 'annual';
  isLoading: boolean;
  selectedPlan: string;
  overageHandling: string | null;
  activeAddOns: string[];
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  regularPlans: PlanData[];
  enterprisePlan: PlanData | undefined;
  addOns: AddOnData[];
  plans: PlanData[];
  creditCardInfo?: any;
  termsAccepted: boolean;
  setOverageHandling: (option: string) => void;
  toggleAddOn: (addOnId: string) => void;
  onSelectEnterprise: () => void;
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  onPlanChange: (planId: string) => void;
  onTermsAccepted: (accepted: boolean) => void;
  onSubmit: () => void;
  onPaymentValidationChange?: (isValid: boolean) => void;
  onDefaultPaymentMethodValidationChange?: (hasDefault: boolean) => void;
}

const ScrollIndicator = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;
  
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
      <div className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg animate-bounce border-2 border-background">
        <ChevronDown className="h-5 w-5" />
      </div>
    </div>
  );
};

const ScrollableSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const hasMoreContent = scrollHeight > clientHeight + 10; // Add small buffer
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20; // More generous bottom detection
      
      setShowScrollIndicator(hasMoreContent && !isAtBottom);
      console.log('Scroll check:', { hasMoreContent, isAtBottom, scrollTop, scrollHeight, clientHeight });
    }
  };
  
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      // Check initial scroll position with delay to allow content to render
      const timeouts = [100, 500, 1000].map(delay => 
        setTimeout(checkScrollPosition, delay)
      );
      
      scrollElement.addEventListener('scroll', checkScrollPosition);
      return () => {
        timeouts.forEach(clearTimeout);
        scrollElement.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, [children]);
  
  // Also check when window resizes
  useEffect(() => {
    const handleResize = () => {
      setTimeout(checkScrollPosition, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className={`relative ${className}`}>
      <ScrollArea className="h-full" ref={scrollRef}>
        <div className="p-4 h-full pb-16">
          {children}
        </div>
      </ScrollArea>
      <ScrollIndicator isVisible={showScrollIndicator} />
    </div>
  );
};

export function WizardContent({
  currentStep,
  billingCycle,
  isLoading,
  selectedPlan,
  overageHandling,
  activeAddOns,
  costs,
  regularPlans,
  enterprisePlan,
  addOns,
  plans,
  creditCardInfo,
  termsAccepted,
  setOverageHandling,
  toggleAddOn,
  onSelectEnterprise,
  onBillingCycleChange,
  onPlanChange,
  onTermsAccepted,
  onSubmit,
  onPaymentValidationChange,
  onDefaultPaymentMethodValidationChange
}: WizardContentProps) {
  // Find the name of the selected plan for the OverageHandling component
  const selectedPlanName = plans.find(p => p.id === selectedPlan)?.name || 'Selected';
  
  // Track the payment method type selected in step 4
  const [paymentMethodType, setPaymentMethodType] = useState<'card' | 'ach'>('card');
  
  // Track which payment method is set as default
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState<'card' | 'ach'>('card');
  
  // Track card make default state specifically
  const [cardMakeDefault, setCardMakeDefault] = useState(true);
  
  // Track ACH make default state
  const [achMakeDefault, setAchMakeDefault] = useState(false);
  
  // Track if user has visited payment step
  const [hasVisitedPaymentStep, setHasVisitedPaymentStep] = useState(false);
  
  // Monitor changes to payment method type from PaymentMethodForm component
  useEffect(() => {
    const savedType = localStorage.getItem('paymentMethodType');
    if (savedType === 'card' || savedType === 'ach') {
      setPaymentMethodType(savedType as 'card' | 'ach');
    }
  }, [currentStep]);
  
  // Track when user reaches payment step (step 3)
  useEffect(() => {
    if (currentStep >= 3) {
      setHasVisitedPaymentStep(true);
    }
  }, [currentStep]);
  
  // Monitor changes to default payment method status
  useEffect(() => {
    const cardDefault = localStorage.getItem('cardMakeDefault') === 'true';
    const achDefault = localStorage.getItem('achMakeDefault') === 'true';
    
    setCardMakeDefault(cardDefault);
    setAchMakeDefault(achDefault);
    
    if (achDefault) {
      setDefaultPaymentMethod('ach');
    } else if (cardDefault) {
      setDefaultPaymentMethod('card');
    }
    
    // Notify parent about default payment method validation
    const hasDefaultPaymentMethod = cardDefault || achDefault;
    if (onDefaultPaymentMethodValidationChange) {
      onDefaultPaymentMethodValidationChange(hasDefaultPaymentMethod);
    }
  }, [currentStep, onDefaultPaymentMethodValidationChange]);
  
  // Handle payment method changes from the PaymentMethodForm
  const handlePaymentMethodChange = (type: 'card' | 'ach') => {
    setPaymentMethodType(type);
    localStorage.setItem('paymentMethodType', type);
  };

  // Handle card make default changes
  const handleCardMakeDefaultChange = (checked: boolean) => {
    setCardMakeDefault(checked);
    localStorage.setItem('cardMakeDefault', checked.toString());
    
    // If card is set as default, ACH should not be default
    if (checked) {
      setAchMakeDefault(false);
      localStorage.setItem('achMakeDefault', 'false');
      setDefaultPaymentMethod('card');
    }
  };

  // Handle ACH make default changes
  const handleAchMakeDefaultChange = (checked: boolean) => {
    setAchMakeDefault(checked);
    localStorage.setItem('achMakeDefault', checked.toString());
    
    // If ACH is set as default, card should not be default
    if (checked) {
      setCardMakeDefault(false);
      localStorage.setItem('cardMakeDefault', 'false');
      setDefaultPaymentMethod('ach');
    }
  };
  
  return (
    <div className="h-full">
      {/* For Terms of Service step, show just the Terms of Service content without the sidebar */}
      {currentStep === 4 ? (
        <div className="w-full mx-auto max-w-3xl h-full">
          <ScrollableSection className="h-full">
            <TermsOfServiceStep 
              isLoading={isLoading}
              termsAccepted={termsAccepted}
              onTermsAccepted={onTermsAccepted}
            />
          </ScrollableSection>
        </div>
      ) : currentStep === 5 ? (
        <div className="w-full mx-auto max-w-4xl h-full">
          <ScrollableSection className="h-full">
            <SubscriptionConfirmationStep
              selectedPlan={selectedPlan}
              plans={plans}
              activeAddOns={activeAddOns}
              addOns={addOns}
              overageHandling={overageHandling}
              costs={costs}
              billingCycle={billingCycle}
              isLoading={isLoading}
              paymentMethodType={defaultPaymentMethod}
              showDashboardButton={true}
            />
          </ScrollableSection>
        </div>
      ) : (
        // For other steps, show the main layout with sidebar
        !(currentStep === 4 || currentStep === 5) && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
            <div className="md:col-span-8 h-full overflow-hidden">
              <ScrollableSection className="h-full">
                {/* Step 1: Choose Billing Option */}
                {currentStep === 0 && (
                  <BillingOptionStep 
                    selectedPlan={selectedPlan}
                    billingCycle={billingCycle}
                    adjustedPlans={regularPlans}
                    enterprisePlan={enterprisePlan}
                    onPlanChange={onPlanChange}
                    onBillingCycleChange={onBillingCycleChange}
                    onSelectEnterprise={onSelectEnterprise}
                    isLoading={isLoading}
                  />
                )}
                
                {/* Step 2: Select Add-Ons */}
                {currentStep === 1 && (
                  <AddOnsList 
                    addOns={addOns}
                    selectedPlan={selectedPlan}
                    activeAddOns={activeAddOns}
                    onToggleAddOn={toggleAddOn}
                    isLoading={isLoading}
                  />
                )}
                
                {/* Step 3: Overage Handling */}
                {currentStep === 2 && (
                  <OverageHandling 
                    selectedPlanName={selectedPlanName}
                    overageHandling={overageHandling || ''}
                    onOverageHandlingChange={setOverageHandling}
                    isLoading={isLoading}
                    selectedPlan={selectedPlan}
                  />
                )}
                
                {/* Step 4: Payment Information */}
                {currentStep === 3 && (
                  <PaymentMethodForm 
                    isLoading={isLoading} 
                    creditCardInfo={creditCardInfo}
                    onPaymentMethodTypeChange={handlePaymentMethodChange}
                    onValidationChange={onPaymentValidationChange}
                  />
                )}
              </ScrollableSection>
            </div>
            
            <div className="md:col-span-4 h-full">
              <SubscriptionSummary 
                selectedPlan={selectedPlan}
                plans={plans}
                activeAddOns={activeAddOns}
                addOns={addOns}
                costs={costs}
                subscription={null}
                isLoading={isLoading}
                onSubmit={onSubmit}
                billingCycle={billingCycle}
                showSubmitButton={false}
                paymentMethodType={defaultPaymentMethod}
                cardMakeDefault={hasVisitedPaymentStep ? cardMakeDefault : false}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}
