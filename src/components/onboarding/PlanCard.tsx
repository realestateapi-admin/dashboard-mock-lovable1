
import { Check, Phone, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { PlanData } from "@/types/billing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlanCardProps {
  plan: PlanData;
  isSelected: boolean;
}

export const PlanCard = ({ plan, isSelected }: PlanCardProps) => {
  return (
    <div className="relative h-full">
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
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {plan.description}
                </p>
              </div>
              <div className={`flex-shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                <Check className={`h-5 w-5 ${isSelected ? "opacity-100" : "opacity-0"}`} />
              </div>
            </div>
            
            {plan.id === "enterprise" ? (
              <div className="mb-4 text-center">
                <Button variant="outline" size="sm" className="w-full mt-2 border-primary text-primary">
                  <Phone className="h-3 w-3 mr-1" /> Contact Sales
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Custom pricing for enterprise
                </p>
              </div>
            ) : plan.isFree ? (
              <div className="flex gap-1 items-baseline mb-4">
                <span className="text-2xl font-bold">{plan.price}</span>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    Limited access
                  </span>
                  <div className="flex items-center text-amber-500 text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>14 days only</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-1 items-baseline mb-4">
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-xs text-muted-foreground">
                  per month
                </span>
              </div>
            )}
            
            <div className="mb-3 py-1 px-2 bg-muted/50 rounded-md flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Records:</span>
              <span className="text-xs font-semibold">
                {plan.isFree ? "5,000" : `${plan.records}`}
              </span>
            </div>
            
            <div className="mt-2 flex-grow">
              <div className="text-xs font-medium mb-1">Included:</div>
              <ul className="text-xs space-y-1.5">
                {plan.features.slice(0, 5).map((feature, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
                {plan.features.length > 5 && (
                  <li className="text-xs text-muted-foreground">+{plan.features.length - 5} more</li>
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
