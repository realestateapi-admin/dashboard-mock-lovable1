
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, ArrowsRightLeft } from "lucide-react";
import { PlanData, AddOnData } from "@/types/billing";

interface ManageSubscriptionStepProps {
  currentPlan: PlanData;
  activeAddOns: AddOnData[];
  overageHandling: string;
  billingCycle: 'monthly' | 'annual';
  onChangePlan: () => void;
  onChangeAddOns: () => void;
  onChangeOverage: () => void;
  onFinalizePlan: () => void;
}

export const ManageSubscriptionStep = ({
  currentPlan,
  activeAddOns,
  overageHandling,
  billingCycle,
  onChangePlan,
  onChangeAddOns,
  onChangeOverage,
  onFinalizePlan
}: ManageSubscriptionStepProps) => {
  // Track if any changes have been made to show the comparison view
  const [hasChanges, setHasChanges] = useState(false);
  // Store the original plan before changes for comparison
  const [originalPlan, setOriginalPlan] = useState<PlanData | null>(null);
  
  // Set the original plan when component mounts if not already set
  React.useEffect(() => {
    if (!originalPlan) {
      setOriginalPlan(currentPlan);
    }
  }, [currentPlan, originalPlan]);

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
  const getPlanPrice = (plan: PlanData) => {
    if (billingCycle === 'annual') {
      // Check if there's an annual price in the data structure
      // @ts-ignore - We'll handle the case if annualPrice doesn't exist
      const annualPrice = plan.annualPrice;
      return annualPrice || plan.price;
    }
    return plan.price;
  };

  // Track if plan changes have been made
  const planChangedFromOriginal = originalPlan && originalPlan.id !== currentPlan.id;

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

      {/* Plan Cards - Side by side when changes exist */}
      <div className={`grid gap-6 ${planChangedFromOriginal ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Original Plan Card (Only shown if plan has changed) */}
        {planChangedFromOriginal && originalPlan && (
          <Card className="border-2 border-muted/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Original Plan</span>
                <Badge variant="outline" className="bg-muted/10 text-muted-foreground">
                  {billingCycle === 'annual' ? 'Annual Billing' : 'Monthly Billing'}
                </Badge>
              </CardTitle>
              <CardDescription>
                Your current subscription plan
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-lg">{originalPlan.name}</h3>
                    <p className="text-muted-foreground">{originalPlan.description}</p>
                  </div>
                  <div className="text-2xl font-bold">{getPlanPrice(originalPlan)}</div>
                </div>

                <div className="border-t pt-3">
                  <h4 className="text-sm font-medium mb-2">Plan includes:</h4>
                  <ul className="space-y-2">
                    {originalPlan.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {originalPlan.features.length > 4 && (
                      <li className="text-sm text-muted-foreground">
                        +{originalPlan.features.length - 4} more features
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current/New Plan Card */}
        <Card className={`border-2 ${planChangedFromOriginal ? 'border-primary/20' : 'border-primary/20'}`}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span>{planChangedFromOriginal ? 'New Plan' : 'Your Current Plan'}</span>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {billingCycle === 'annual' ? 'Annual Billing' : 'Monthly Billing'}
              </Badge>
            </CardTitle>
            <CardDescription>
              {planChangedFromOriginal 
                ? 'Your selected subscription plan'
                : `You're currently on the ${currentPlan.name} plan with ${activeAddOns.length} add-ons`}
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
                <div className="text-2xl font-bold">{getPlanPrice(currentPlan)}</div>
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
      </div>

      {/* Plan Comparison Indicator - Only shown when plans are different */}
      {planChangedFromOriginal && (
        <div className="flex items-center justify-center gap-2 py-2">
          <ArrowsRightLeft className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Plan has been changed</span>
        </div>
      )}

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
            onClick={() => {
              setHasChanges(true);
              onChangePlan();
            }}
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
            onClick={() => {
              setHasChanges(true);
              onChangeAddOns();
            }}
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
            onClick={() => {
              setHasChanges(true);
              onChangeOverage();
            }}
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
        <CardFooter className="pt-2">
          <Button 
            className="w-full"
            onClick={onFinalizePlan}
          >
            Finalize Plan Changes
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
