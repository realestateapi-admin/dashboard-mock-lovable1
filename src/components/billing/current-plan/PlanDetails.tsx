
import React from "react";
import { Check } from "lucide-react";
import { PlanData } from "@/types/billing";

interface PlanDetailsProps {
  currentPlan: PlanData | undefined;
  formatPrice: (price: string | number) => string;
  billingCycle: 'monthly' | 'annual';
}

export const PlanDetails = ({
  currentPlan,
  formatPrice,
  billingCycle
}: PlanDetailsProps) => {
  if (!currentPlan) return null;
  
  return (
    <>
      <div className="flex justify-between items-start pt-2">
        <div>
          <h3 className="text-xl font-semibold">{currentPlan.name}</h3>
          <p className="text-muted-foreground">{currentPlan.description}</p>
        </div>
        <div className="text-3xl font-bold">
          {formatPrice(currentPlan.price)}
          <span className="text-sm text-muted-foreground block text-right">/month</span>
        </div>
      </div>
      
      <div className="border-t border-b py-6">
        <h4 className="font-medium mb-3">Plan includes:</h4>
        <ul className="space-y-2">
          {currentPlan.features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-primary-teal mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
