
import { Check, Phone, Clock, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { PlanData } from "@/types/billing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlanCardProps {
  plan: PlanData;
  isSelected: boolean;
  className?: string;
}

export const PlanCard = ({ plan, isSelected, className = "" }: PlanCardProps) => {
  return (
    <div className={`relative ${className}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-max bg-primary text-primary-foreground text-xs font-medium px-4 py-1 rounded-full z-10">
          Most Popular
        </div>
      )}
      {plan.isFree && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-max bg-amber-500 text-white text-xs font-medium px-4 py-1 rounded-full z-10">
          Temporary
        </div>
      )}
      <Card 
        className={`h-full transition-all border-2 ${
          isSelected 
            ? "border-primary ring-2 ring-primary ring-offset-2" 
            : "border-transparent hover:border-primary/50"
        }`}
      >
        <Label
          htmlFor={plan.id}
          className="flex flex-col h-full cursor-pointer p-4"
        >
          <RadioGroupItem
            value={plan.id}
            id={plan.id}
            className="sr-only"
          />
          
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className={`flex-shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                <Check className={`h-5 w-5 ${isSelected ? "opacity-100" : "opacity-0"}`} />
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              {plan.description}
            </p>
            
            {plan.id === "enterprise" ? (
              <div className="mb-4">
                <Button variant="outline" size="sm" className="border-primary text-primary">
                  Contact <ArrowRight className="h-3 w-3 ml-1" /> Sales
                </Button>
                <p className="text-sm mt-2">
                  Custom pricing
                </p>
              </div>
            ) : plan.isFree ? (
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Limited access
                </div>
                <div className="flex items-center text-amber-500 text-xs mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>14 days only</span>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-xs text-muted-foreground ml-1">
                    per month
                  </span>
                </div>
              </div>
            )}
            
            {plan.records && (
              <div className="mb-3 text-sm">
                <span className="text-muted-foreground">Records:</span>{" "}
                <span className="font-semibold">{plan.records}</span>
              </div>
            )}
            
            <div className="mt-2 flex-grow">
              <div className="text-sm mb-1">Includes:</div>
              <ul className="text-sm space-y-2">
                {plan.features.slice(0, 4).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.features.length > 4 && (
                  <li className="text-sm text-muted-foreground">+{plan.features.length - 4} more</li>
                )}
              </ul>
            </div>
            
            {plan.isFree && (
              <div className="mt-3 pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> Credit card for verification only.
                </p>
              </div>
            )}
          </div>
        </Label>
      </Card>
    </div>
  );
};
