
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { PlanData } from "@/types/billing";

interface PlanCardProps {
  plan: PlanData;
  isSelected: boolean;
}

export const PlanCard = ({ plan, isSelected }: PlanCardProps) => {
  return (
    <div className="relative">
      {plan.popular && (
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full z-10">
          Popular
        </div>
      )}
      <Label
        htmlFor={plan.id}
        className={`flex flex-col h-full p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
          isSelected
            ? "ring-2 ring-primary ring-offset-2 border-primary"
            : "border-border"
        }`}
      >
        <RadioGroupItem
          value={plan.id}
          id={plan.id}
          className="sr-only"
        />
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium">{plan.name}</h3>
            <p className="text-sm text-muted-foreground">
              {plan.description}
            </p>
          </div>
          <div className={isSelected ? "text-primary" : "text-muted-foreground"}>
            <Check className={`h-5 w-5 ${isSelected ? "opacity-100" : "opacity-0"}`} />
          </div>
        </div>
        <div className="flex gap-1 items-baseline mb-4">
          <span className="text-xl font-semibold">{plan.price}</span>
          <span className="text-sm text-muted-foreground">
            per month
          </span>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm font-medium">Records:</span>
          <span className="text-sm">{plan.records} per month</span>
        </div>
        <div className="font-medium text-sm mb-2">Included Endpoints:</div>
        <ul className="text-sm space-y-2 mt-auto">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary/70" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </Label>
    </div>
  );
};
