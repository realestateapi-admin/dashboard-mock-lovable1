
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { PlanData } from "@/types/billing";
import { Card } from "@/components/ui/card";

interface PlanCardProps {
  plan: PlanData;
  isSelected: boolean;
}

export const PlanCard = ({ plan, isSelected }: PlanCardProps) => {
  return (
    <div className="relative">
      {plan.popular && (
        <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-xs font-medium px-4 py-1 rounded-full z-10">
          Most Popular
        </div>
      )}
      <Card 
        className={`transition-all border-2 ${
          isSelected 
            ? "border-primary ring-2 ring-primary ring-offset-2" 
            : "border-transparent hover:border-primary/50"
        }`}
      >
        <Label
          htmlFor={plan.id}
          className="flex cursor-pointer p-6 rounded-lg"
        >
          <RadioGroupItem
            value={plan.id}
            id={plan.id}
            className="sr-only"
          />
          
          <div className="w-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {plan.description}
                </p>
              </div>
              <div className={`flex-shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                <Check className={`h-5 w-5 ${isSelected ? "opacity-100" : "opacity-0"}`} />
              </div>
            </div>
            
            <div className="flex gap-1 items-baseline mb-4">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-sm text-muted-foreground">
                per month
              </span>
            </div>
            
            <div className="mb-4 py-2 px-3 bg-muted/50 rounded-md flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Records:</span>
              <span className="text-sm font-semibold">{plan.records} per month</span>
            </div>
            
            <div className="mt-4">
              <div className="font-medium text-sm mb-2">Included Endpoints:</div>
              <ul className="text-sm space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Label>
      </Card>
    </div>
  );
};
