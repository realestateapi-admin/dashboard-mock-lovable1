
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check } from "lucide-react";
import { PlanData, AddOnData } from "@/types/billing";

interface ManageSubscriptionStepProps {
  currentPlan: PlanData;
  activeAddOns: AddOnData[];
  overageHandling: string;
  billingCycle: 'monthly' | 'annual';
  onChangePlan: () => void;
  onChangeAddOns: () => void;
  onChangeOverage: () => void;
}

export const ManageSubscriptionStep = ({
  currentPlan,
  activeAddOns,
  overageHandling,
  billingCycle,
  onChangePlan,
  onChangeAddOns,
  onChangeOverage
}: ManageSubscriptionStepProps) => {
  const formatOverageHandling = (value: string): string => {
    switch (value) {
      case 'cut-off':
        return 'Stop API calls when limit is reached';
      case 'allow-25':
        return 'Allow 25% overage';
      case 'allow-100':
        return 'Allow 100% overage';
      case 'unlimited':
        return 'Never cut off API key (mission critical)';
      default:
        return 'Not specified';
    }
  };

  // Get the appropriate price based on billing cycle
  const getPlanPrice = () => {
    if (billingCycle === 'annual') {
      // Check if there's an annual price in the data structure
      // @ts-ignore - We'll handle the case if annualPrice doesn't exist
      const annualPrice = currentPlan.annualPrice;
      return annualPrice || currentPlan.price;
    }
    return currentPlan.price;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Manage Your Subscription</h1>
        <p className="text-muted-foreground mt-2">
          Review your current plan and select what you'd like to change
        </p>
      </div>

      {/* Current Plan Card */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>Your Current Plan</span>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {billingCycle === 'annual' ? 'Annual Billing' : 'Monthly Billing'}
            </Badge>
          </CardTitle>
          <CardDescription>
            You're currently on the {currentPlan.name} plan with {activeAddOns.length} add-ons
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Plan Details */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-lg">{currentPlan.name}</h3>
                <p className="text-muted-foreground">{currentPlan.description}</p>
              </div>
              <div className="text-2xl font-bold">{getPlanPrice()}</div>
            </div>

            <div className="border-t pt-3">
              <h4 className="text-sm font-medium mb-2">Plan includes:</h4>
              <ul className="space-y-2">
                {currentPlan.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
                {currentPlan.features.length > 4 && (
                  <li className="text-sm text-muted-foreground">
                    +{currentPlan.features.length - 4} more features
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Add-ons */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Active Add-ons:</h4>
            {activeAddOns.length > 0 ? (
              <ul className="space-y-2">
                {activeAddOns.map((addon) => (
                  <li key={addon.id} className="flex justify-between text-sm">
                    <span>{addon.name}</span>
                    <span className="font-medium">{addon.prices[currentPlan.id]}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No add-ons currently active</p>
            )}
          </div>

          {/* Overage Handling */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Overage Handling:</h4>
            <p className="text-sm">{formatOverageHandling(overageHandling)}</p>
          </div>
        </CardContent>
      </Card>

      {/* What would you like to change? */}
      <Card>
        <CardHeader>
          <CardTitle>What would you like to change?</CardTitle>
          <CardDescription>
            Select an option below to modify your subscription
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-between h-auto py-6 text-left" 
            onClick={onChangePlan}
          >
            <div>
              <h3 className="font-medium text-base mb-1">Change Plan</h3>
              <p className="text-sm text-muted-foreground">
                Upgrade or downgrade your base plan
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-between h-auto py-6 text-left" 
            onClick={onChangeAddOns}
          >
            <div>
              <h3 className="font-medium text-base mb-1">Modify Add-ons</h3>
              <p className="text-sm text-muted-foreground">
                Add or remove additional features
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-between h-auto py-6 text-left" 
            onClick={onChangeOverage}
          >
            <div>
              <h3 className="font-medium text-base mb-1">Update Overage Handling</h3>
              <p className="text-sm text-muted-foreground">
                Change how we handle exceeding your plan limits
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
