
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
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full z-10">
          Popular
        </div>
      )}
      <Card className={`h-full transition-all ${
        isSelected ? "ring-2 ring-primary ring-offset-2" : ""
      }`}>
        <Label
          htmlFor={plan.id}
          className={`flex flex-col h-full p-6 rounded-lg cursor-pointer transition-all hover:border-primary`}
        >
          <RadioGroupItem
            value={plan.id}
            id={plan.id}
            className="sr-only"
          />
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {plan.description}
              </p>
            </div>
            <div className={isSelected ? "text-primary" : "text-muted-foreground"}>
              <Check className={`h-5 w-5 ${isSelected ? "opacity-100" : "opacity-0"}`} />
            </div>
          </div>
          
          <div className="flex gap-1 items-baseline mb-6">
            <span className="text-3xl font-bold">{plan.price}</span>
            <span className="text-sm text-muted-foreground">
              per month
            </span>
          </div>
          
          <div className="mb-6 flex items-center gap-2">
            <span className="text-sm font-medium">Records:</span>
            <span className="text-sm font-semibold">{plan.records} per month</span>
          </div>
          
          <div className="font-medium text-sm mb-4">Included Endpoints:</div>
          <ul className="text-sm space-y-3 mt-auto">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </Label>
      </Card>
    </div>
  );
};
