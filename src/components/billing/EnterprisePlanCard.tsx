
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
    <Card className="border-2 border-dashed border-primary/40 bg-primary/5">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">{plan.name} Solution</CardTitle>
          </div>
          {isSelected && (
            <div className="text-primary">
              <CheckCircle className="h-5 w-5" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              {plan.description}
            </p>
            
            <div className="py-2">
              <div className="text-sm font-semibold mb-2">Key Benefits:</div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Enterprise-level API access</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>SLA guarantees</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Dedicated support team</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Custom integration assistance</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div>
              <div className="text-sm font-semibold mb-2">Included Features:</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {plan.features.slice(0, 10).map((feature, i) => (
                  <div key={i} className="bg-primary/10 px-3 py-1 rounded-md text-sm flex items-center">
                    <CheckCircle className="h-3 w-3 text-primary mr-1.5" />
                    {feature}
                  </div>
                ))}
                {plan.features.length > 10 && (
                  <div className="bg-primary/10 px-3 py-1 rounded-md text-sm">
                    +{plan.features.length - 10} more features
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div>
                <span className="text-lg font-semibold">Custom Pricing</span>
                <p className="text-sm text-muted-foreground">Tailored to your specific needs</p>
              </div>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => onPlanChange(plan.id)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
