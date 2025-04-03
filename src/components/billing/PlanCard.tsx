
import { CheckCircle, Phone } from "lucide-react";
import { PlanData } from "@/types/billing";
import { Button } from "@/components/ui/button";

interface PlanCardProps {
  plan: PlanData & { originalPrice?: string };
  isSelected: boolean;
  onSelect: () => void;
  billingCycle?: 'monthly' | 'annual';
}

export const PlanCard = ({ plan, isSelected, onSelect, billingCycle = 'monthly' }: PlanCardProps) => {
  return (
    <div className="relative">
      {plan.popular && (
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
          Popular
        </div>
      )}
      {plan.id === "enterprise" ? (
        <div
          className={`p-4 border rounded-lg transition-all hover:border-primary cursor-pointer h-full flex flex-col ${
            isSelected
              ? "ring-2 ring-primary ring-offset-2 border-primary"
              : "border-border"
          }`}
          onClick={onSelect}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium">{plan.name}</h3>
              <p className="text-xs text-muted-foreground">
                {plan.description}
              </p>
            </div>
            <div className={isSelected ? "text-primary" : "text-muted-foreground"}>
              <CheckCircle className={`h-5 w-5 ${isSelected ? "opacity-100" : "opacity-0"}`} />
            </div>
          </div>
          <div className="mb-6 text-center">
            <Button variant="outline" size="sm" className="w-full mt-2 border-primary text-primary">
              <Phone className="h-4 w-4 mr-1" /> Contact Sales
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Custom pricing for your enterprise needs
            </p>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs font-medium">Records:</span>
            <span className="text-xs">{plan.records}/mo</span>
          </div>
          <div className="mt-auto">
            <span className="text-xs font-medium block mb-2">Features:</span>
            <ul className="text-xs space-y-1">
              {plan.features.slice(0, 3).map((feature, i) => (
                <li key={i} className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-primary/70" />
                  <span>{feature}</span>
                </li>
              ))}
              {plan.features.length > 3 && (
                <li className="text-xs text-muted-foreground">
                  +{plan.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div
          className={`p-4 border rounded-lg transition-all hover:border-primary cursor-pointer h-full flex flex-col ${
            isSelected
              ? "ring-2 ring-primary ring-offset-2 border-primary"
              : "border-border"
          }`}
          onClick={onSelect}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium">{plan.name}</h3>
              <p className="text-xs text-muted-foreground">
                {plan.description}
              </p>
            </div>
            <div className={isSelected ? "text-primary" : "text-muted-foreground"}>
              <CheckCircle className={`h-5 w-5 ${isSelected ? "opacity-100" : "opacity-0"}`} />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            {/* Price display with strikethrough for original price when on annual billing */}
            {billingCycle === 'annual' && plan.originalPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-semibold">{plan.price}</span>
                <span className="text-xl line-through text-muted-foreground">{plan.originalPrice}</span>
                <span className="text-xs text-muted-foreground">/month</span>
              </div>
            ) : (
              <div className="flex gap-1 items-baseline">
                <span className="text-xl font-semibold">{plan.price}</span>
                <span className="text-xs text-muted-foreground">/month</span>
              </div>
            )}
            
            {billingCycle === 'annual' && (
              <div className="mt-1 text-xs text-muted-foreground">
                12-month agreement, billed monthly
              </div>
            )}
          </div>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs font-medium">Records:</span>
            <span className="text-xs">{plan.records}/mo</span>
          </div>
          <div className="mt-auto">
            <span className="text-xs font-medium block mb-2">Features:</span>
            <ul className="text-xs space-y-1">
              {plan.features.slice(0, 3).map((feature, i) => (
                <li key={i} className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-primary/70" />
                  <span>{feature}</span>
                </li>
              ))}
              {plan.features.length > 3 && (
                <li className="text-xs text-muted-foreground">
                  +{plan.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
