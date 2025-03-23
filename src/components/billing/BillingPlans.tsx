
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CheckCircle } from "lucide-react";
import { PlanData, AddOnData } from "@/types/billing";
import { useToast } from "@/hooks/use-toast";

interface BillingPlansProps {
  plans: PlanData[];
  addOns: AddOnData[];
  selectedPlan: string;
  activeAddOns: string[];
  overageHandling: string;
  onPlanChange: (planId: string) => void;
  onToggleAddOn: (addOnId: string) => void;
  onOverageHandlingChange: (value: string) => void;
  onSaveBillingPreferences: () => void;
}

export const BillingPlans = ({
  plans,
  addOns,
  selectedPlan,
  activeAddOns,
  overageHandling,
  onPlanChange,
  onToggleAddOn,
  onOverageHandlingChange,
  onSaveBillingPreferences
}: BillingPlansProps) => {
  // Get the selected plan's name for displaying in overage options
  const selectedPlanName = plans.find(p => p.id === selectedPlan)?.name || "selected plan";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          Manage your current plan and subscription settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <div key={plan.id} className="relative">
              {plan.popular && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                  Popular
                </div>
              )}
              <div
                className={`p-4 border rounded-lg transition-all hover:border-primary cursor-pointer ${
                  selectedPlan === plan.id
                    ? "ring-2 ring-primary ring-offset-2 border-primary"
                    : "border-border"
                }`}
                onClick={() => onPlanChange(plan.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>
                  <div className={selectedPlan === plan.id ? "text-primary" : "text-muted-foreground"}>
                    <CheckCircle className={`h-5 w-5 ${selectedPlan === plan.id ? "opacity-100" : "opacity-0"}`} />
                  </div>
                </div>
                <div className="flex gap-1 items-baseline mb-4">
                  <span className="text-xl font-semibold">{plan.price}</span>
                  <span className="text-xs text-muted-foreground">
                    /month
                  </span>
                </div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xs font-medium">Records:</span>
                  <span className="text-xs">{plan.records}/mo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium">Add-Ons</h3>
          <p className="text-sm text-muted-foreground">
            Enhance your subscription with premium features
          </p>
          
          <div className="space-y-4">
            {addOns.map(addon => {
              const addonPrice = addon.prices[selectedPlan as keyof typeof addon.prices];
              const isIncluded = addonPrice === "Included";
              
              return (
                <div key={addon.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">{addon.name}</p>
                    <p className="text-sm text-muted-foreground">{addon.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {isIncluded ? (
                      <span className="text-sm text-primary font-medium">Included with plan</span>
                    ) : (
                      <>
                        <span className="text-sm font-medium">{addonPrice}</span>
                        <Switch 
                          checked={activeAddOns.includes(addon.id)}
                          onCheckedChange={() => onToggleAddOn(addon.id)}
                          disabled={isIncluded}
                        />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium">Overage Handling</h3>
          <p className="text-sm text-muted-foreground">
            Choose how to handle API calls that exceed your plan limits
          </p>
          <RadioGroup value={overageHandling} onValueChange={onOverageHandlingChange} className="space-y-2">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="stop" id="stop-overages" />
              <div className="grid gap-1.5">
                <Label htmlFor="stop-overages" className="font-medium">Stop API Access</Label>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable API access when you reach your plan limits until the next billing cycle.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="allow-125" id="allow-125-overages" />
              <div className="grid gap-1.5">
                <Label htmlFor="allow-125-overages" className="font-medium">Allow Overages (Pay as you go)</Label>
                <p className="text-sm text-muted-foreground">
                  Continue API access up to 125% of my {selectedPlanName} usage has been reached. Then discontinue access until the next billing cycle.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="allow-200" id="allow-200-overages" />
              <div className="grid gap-1.5">
                <Label htmlFor="allow-200-overages" className="font-medium">Allow Overages (Pay as you go)</Label>
                <p className="text-sm text-muted-foreground">
                  Continue API access up to 200% of my {selectedPlanName} usage has been reached. Then discontinue access until the next billing cycle.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="allow-unlimited" id="allow-unlimited-overages" />
              <div className="grid gap-1.5">
                <Label htmlFor="allow-unlimited-overages" className="font-medium">Allow Overages (Pay as you go)</Label>
                <p className="text-sm text-muted-foreground">
                  Continue API access without limits. Do not restrict my API access, no matter how much volume is generated.
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onSaveBillingPreferences}>
          Save Billing Preferences
        </Button>
      </CardFooter>
    </Card>
  );
};
