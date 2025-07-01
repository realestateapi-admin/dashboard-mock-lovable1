
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { PlanData, AddOnData } from "@/types/billing";
import { ConfirmationHeader } from "./confirmation/ConfirmationHeader";

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
  const navigate = useNavigate();
  const plan = plans.find(p => p.id === selectedPlan);
  const selectedAddOns = addOns.filter(addon => activeAddOns.includes(addon.id));

  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Subscription Changes Confirmed</h1>
        <p className="text-muted-foreground mt-2">
          Your plan modifications have been successfully processed
        </p>
      </div>

      <ConfirmationHeader billingCycle={billingCycle} />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Plan Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Plan Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">{plan?.name} Plan</p>
              <p className="text-sm text-muted-foreground">
                {billingCycle === 'annual' ? 'Annual' : 'Monthly'} billing
              </p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Base Price</p>
              <p className="text-lg font-semibold">{costs.basePrice}</p>
            </div>
            
            {overageHandling && (
              <div>
                <p className="text-sm font-medium">Overage Handling</p>
                <Badge variant="outline" className="mt-1">
                  {overageHandling.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add-ons & Payment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Add-ons & Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Active Add-ons</p>
              {selectedAddOns.length > 0 ? (
                <div className="mt-2 space-y-1">
                  {selectedAddOns.map(addon => (
                    <p key={addon.id} className="text-sm">{addon.name}</p>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">No add-ons selected</p>
              )}
            </div>
            
            <div>
              <p className="text-sm font-medium">Payment Method</p>
              <p className="text-sm text-muted-foreground">
                {paymentMethodType === 'card' ? 'Credit Card' : 'Bank Account (ACH)'}
              </p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Total Cost</p>
              <p className="text-lg font-semibold">{costs.total}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What happens next?</CardTitle>
          <CardDescription>Here's what you can expect after your subscription changes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Changes take effect immediately</p>
              <p className="text-sm text-muted-foreground">Your new plan limits and add-ons are now active</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Billing updates on next cycle</p>
              <p className="text-sm text-muted-foreground">Your next invoice will reflect the new pricing</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="font-medium">API access updated</p>
              <p className="text-sm text-muted-foreground">New endpoints and limits are available in your dashboard</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Return to Dashboard Button */}
      <div className="flex justify-center pt-4">
        <Button 
          onClick={handleReturnToDashboard}
          size="lg"
          className="px-8"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};
