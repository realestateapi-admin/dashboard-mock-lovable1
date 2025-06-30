import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, CreditCard, Building, ChevronDown, AlertCircle } from "lucide-react";
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

const formatOverageHandling = (value: string | null): string => {
  if (!value) return 'Not specified';
  
  switch (value) {
    case 'cut-off':
      return 'API calls will be stopped when the plan limit is reached';
    case 'allow-25':
      return 'Overage up to 25% of the plan limit will be allowed, billed at the plan\'s unit rate';
    case 'allow-100':
      return 'Overage up to 100% of the plan limit will be allowed, billed at the plan\'s unit rate';
    case 'unlimited':
      return 'API key will never be cut off, with overages billed at the plan\'s unit rate';
    default:
      return 'Not specified';
  }
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

  // Calculate financial details
  const subtotal = parseFloat(costs.total.replace(/[$,]/g, ''));
  const creditCardFee = paymentMethodType === 'card' ? subtotal * 0.03 : 0;
  const totalWithFee = subtotal + creditCardFee;

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  const cleanCurrency = (price: string) => price.replace(/^\$+/, '$');

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
                {formatOverageHandling(overageHandling)}
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
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Base Plan:</span>
                  <span className="text-sm">{cleanCurrency(costs.basePrice)} / {billingCycle === 'monthly' ? 'month' : 'year'}</span>
                </div>
                
                {parseFloat(costs.totalAddOns.replace(/[$,]/g, '')) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm">Add-Ons:</span>
                    <span className="text-sm">{cleanCurrency(costs.totalAddOns)} / {billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal:</span>
                  <span className="text-sm">{cleanCurrency(costs.total)} / {billingCycle === 'monthly' ? 'month' : 'year'}</span>
                </div>
                
                {paymentMethodType === 'card' && creditCardFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm">Transaction Fee (3%):</span>
                    <span className="text-sm">{formatCurrency(creditCardFee)} / {billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                )}
                
                <div className="flex justify-between pt-2 border-t font-medium">
                  <span>Total:</span>
                  <span>{formatCurrency(totalWithFee)} / {billingCycle === 'monthly' ? 'month' : 'year'}</span>
                </div>
              </div>
              
              {paymentMethodType === 'card' && creditCardFee > 0 && (
                <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-100 flex items-start gap-2 mt-4">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>A 3% transaction fee applies to all credit card payments. Switch to ACH (bank account) payments to avoid this fee.</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <ScrollIndicator isVisible={showScrollIndicator} />
    </>
  );
};
