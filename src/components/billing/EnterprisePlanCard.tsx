
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanData } from "@/types/billing";
import { CheckCircle, Phone, Building2 } from "lucide-react";

interface EnterprisePlanCardProps {
  plan: PlanData;
  selectedPlan: string;
  onPlanChange: (planId: string) => void;
}

export const EnterprisePlanCard = ({
  plan,
  selectedPlan,
  onPlanChange
}: EnterprisePlanCardProps) => {
  const isSelected = selectedPlan === plan.id;
  
  return (
    <Card className="mt-6 border-2 border-dashed border-primary/40 bg-primary/5">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{plan.name} Solution</CardTitle>
          </div>
          {isSelected && (
            <div className="text-primary">
              <CheckCircle className="h-5 w-5" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {plan.description}
            </p>
            <div className="py-2">
              <div className="text-sm font-semibold mb-1">Custom Pricing for:</div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-3 w-3 text-primary" />
                <span>Enterprise-level API access</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-3 w-3 text-primary" />
                <span>SLA guarantees</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-3 w-3 text-primary" />
                <span>Dedicated support team</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-2">
              {plan.features.slice(0, 8).map((feature, i) => (
                <div key={i} className="bg-primary/10 px-2 py-1 rounded-md text-xs flex items-center">
                  <CheckCircle className="h-3 w-3 text-primary mr-1" />
                  {feature}
                </div>
              ))}
              {plan.features.length > 8 && (
                <div className="bg-primary/10 px-2 py-1 rounded-md text-xs">
                  +{plan.features.length - 8} more
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4 mt-2">
        <div>
          <span className="text-lg font-semibold">Custom Pricing</span>
          <p className="text-xs text-muted-foreground">Tailored to your specific needs</p>
        </div>
        <Button 
          variant="outline" 
          className="border-primary text-primary hover:bg-primary/10"
          onClick={() => onPlanChange(plan.id)}
        >
          <Phone className="h-4 w-4 mr-2" />
          Contact Sales
        </Button>
      </CardFooter>
    </Card>
  );
}
