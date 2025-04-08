
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { PlanData, AddOnData } from "@/types/billing";

interface CurrentPlanCardProps {
  plan: PlanData;
  addOns: AddOnData[];
  overageHandling: string;
  billingCycle: 'monthly' | 'annual';
  getPlanPrice: (plan: PlanData) => string;
  formatOverageHandling: (value: string) => string;
}

export const CurrentPlanCard = ({
  plan,
  addOns,
  overageHandling,
  billingCycle,
  getPlanPrice,
  formatOverageHandling
}: CurrentPlanCardProps) => {
  return (
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
              <h3 className="font-medium text-lg">{plan.name}</h3>
              <p className="text-muted-foreground">{plan.description}</p>
            </div>
            <div className="text-2xl font-bold">{getPlanPrice(plan)}</div>
          </div>

          <div className="border-t pt-3">
            <h4 className="text-sm font-medium mb-2">Plan includes:</h4>
            <ul className="space-y-2">
              {plan.features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
              {plan.features.length > 4 && (
                <li className="text-sm text-muted-foreground">
                  +{plan.features.length - 4} more features
                </li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
