
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, CreditCard, Building, ChevronDown } from "lucide-react";
import { PlanData, AddOnData } from "@/types/billing";

interface SubscriptionConfirmationStepProps {
  selectedPlan: string;
  plans: PlanData[];
  activeAddOns: string[];
  addOns: AddOnData[];
  overageHandling: string | null;
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  billingCycle: 'monthly' | 'annual';
  isLoading: boolean;
  paymentMethodType: 'card' | 'ach';
}

const ScrollIndicator = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
      <div className="bg-white/80 text-gray-600 rounded-full p-2 shadow-md border border-gray-200">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
};

export const SubscriptionConfirmationStep: React.FC<SubscriptionConfirmationStepProps> = ({
  selectedPlan,
  plans,
  activeAddOns,
  addOns,
  overageHandling,
  costs,
  billingCycle,
  isLoading,
  paymentMethodType
}) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const checkScrollPosition = () => {
    const scrollContainer = document.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer && contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const contentHeight = contentRef.current.scrollHeight;
      
      const hasMoreContent = contentHeight > clientHeight - 100;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
      
      setShowScrollIndicator(hasMoreContent && !isNearBottom);
    }
  };
  
  useEffect(() => {
    const scrollContainer = document.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      const timeouts = [100, 500, 1000, 2000].map(delay => 
        setTimeout(checkScrollPosition, delay)
      );
      
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      return () => {
        timeouts.forEach(clearTimeout);
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      setTimeout(checkScrollPosition, 100);
    };
    
    window.addEventListener('resize', handleResize);
    checkScrollPosition();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedPlan, activeAddOns]);

  // Find the selected plan
  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);
  
  // Filter active add-ons to get their full data
  const activeAddOnsData = addOns.filter(addOn => activeAddOns.includes(addOn.id));

  return (
    <>
      <div ref={contentRef} className="space-y-8">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Plan Details</h3>
              <div className="flex items-center space-x-2">
                <span>Plan:</span>
                <Badge variant="secondary">{selectedPlanData?.name}</Badge>
                <span>{billingCycle === 'monthly' ? 'Monthly' : 'Annual'}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedPlanData?.description}
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Add-Ons</h3>
              {activeAddOnsData.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {activeAddOnsData.map(addOn => (
                    <li key={addOn.id}>{addOn.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No add-ons selected.</p>
              )}
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Overage Handling</h3>
              <p className="text-sm">
                {overageHandling === 'cut-off' && 'API calls will be stopped when the plan limit is reached.'}
                {overageHandling === 'allow-25' && 'Overage up to 25% of the plan limit will be allowed, billed at the plan\'s unit rate.'}
                {overageHandling === 'allow-100' && 'Overage up to 100% of the plan limit will be allowed, billed at the plan\'s unit rate.'}
                {overageHandling === 'unlimited' && 'API key will never be cut off, with overages billed at the plan\'s unit rate.'}
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Payment Method</h3>
              <div className="flex items-center space-x-2">
                {paymentMethodType === 'card' ? (
                  <>
                    <CreditCard className="h-4 w-4" />
                    <span>Credit Card</span>
                  </>
                ) : (
                  <>
                    <Building className="h-4 w-4" />
                    <span>Bank Account (ACH)</span>
                  </>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Cost Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Base Plan:</p>
                  <p className="text-sm text-muted-foreground">${costs.basePrice} / {billingCycle === 'monthly' ? 'month' : 'year'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Add-Ons:</p>
                  <p className="text-sm text-muted-foreground">${costs.totalAddOns} / {billingCycle === 'monthly' ? 'month' : 'year'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total:</p>
                  <p className="text-sm font-semibold">${costs.total} / {billingCycle === 'monthly' ? 'month' : 'year'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ScrollIndicator isVisible={showScrollIndicator} />
    </>
  );
};
