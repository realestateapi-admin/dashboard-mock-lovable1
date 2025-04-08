
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PlanData, AddOnData, SubscriptionData } from "@/types/billing";
import { Skeleton } from "@/components/ui/skeleton";

interface CurrentPlanSummaryProps {
  plans: PlanData[];
  addOns: AddOnData[];
  subscription: SubscriptionData | null;
  selectedPlan: string;
  activeAddOns: string[];
  overageHandling: string;
  billingCycle: 'monthly' | 'annual';
  isLoading: boolean;
}

export const CurrentPlanSummary = ({
  plans,
  addOns,
  subscription,
  selectedPlan,
  activeAddOns,
  overageHandling,
  billingCycle,
  isLoading
}: CurrentPlanSummaryProps) => {
  const navigate = useNavigate();
  
  // Find the current plan details
  const currentPlan = plans.find(p => p.id === selectedPlan);
  
  // Find active add-ons
  const currentAddOns = addOns.filter(addon => activeAddOns.includes(addon.id));
  
  // Format price based on billing cycle
  const formatPrice = (price: number) => {
    if (billingCycle === 'annual') {
      // Calculate annual price (with 20% discount on base price)
      return `$${(price * 12 * 0.8).toFixed(0)}`;
    } else {
      return `$${price.toFixed(0)}`;
    }
  };
  
  const handleManageSubscription = () => {
    navigate('/dashboard/upgrade');
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-10 w-full" />
        <div className="space-y-2 mt-6">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Your Current Plan</h2>
          <p className="text-muted-foreground mt-1">
            You're currently on the {currentPlan?.name} plan with {activeAddOns.length} add-ons
          </p>
        </div>
        {billingCycle === 'annual' && (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Annual Billing
          </Badge>
        )}
      </div>
      
      <div className="flex justify-between items-start pt-2">
        <div>
          <h3 className="text-xl font-semibold">{currentPlan?.name}</h3>
          <p className="text-muted-foreground">{currentPlan?.description}</p>
        </div>
        <div className="text-3xl font-bold">
          {currentPlan && formatPrice(currentPlan.price)}
        </div>
      </div>
      
      <div className="border-t border-b py-6">
        <h4 className="font-medium mb-3">Plan includes:</h4>
        <ul className="space-y-2">
          {currentPlan?.features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-primary-teal mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-medium mb-3">Active Add-ons:</h4>
        {currentAddOns.length > 0 ? (
          <ul className="space-y-2">
            {currentAddOns.map((addon) => (
              <li key={addon.id} className="flex items-center">
                <Check className="h-5 w-5 text-primary-teal mr-2" />
                <span>{addon.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No add-ons currently active</p>
        )}
      </div>
      
      <div>
        <h4 className="font-medium mb-1">Overage Handling:</h4>
        <p className="text-muted-foreground mb-6">{overageHandling}</p>
        
        <Button 
          onClick={handleManageSubscription} 
          className="w-full"
        >
          Manage Your Subscription
        </Button>
      </div>
    </div>
  );
};
