import { CheckCircle, Phone } from "lucide-react";
import { PlanData } from "@/types/billing";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { annualPlanPrices } from "@/data/plans";

interface PlanCardProps {
  plan: PlanData & { originalPrice?: string };
  isSelected: boolean;
  onSelect: () => void;
  billingCycle?: 'monthly' | 'annual';
}

export const PlanCard = ({ plan, isSelected, onSelect, billingCycle = 'monthly' }: PlanCardProps) => {
  // Calculate discounted price for annual billing
  const getDisplayPrice = () => {
    if (plan.id === "enterprise") {
      return { discounted: "Custom", original: null };
    }
    
    if (billingCycle === 'annual') {
      // Check if there's a specific annual price defined
      const specificAnnualPrice = annualPlanPrices[plan.id as keyof typeof annualPlanPrices];
      if (specificAnnualPrice) {
        return { discounted: specificAnnualPrice, original: plan.price };
      }
      
      // Otherwise calculate 20% discount
      const numericPrice = parseFloat(plan.price.replace(/[$,]/g, ''));
      if (!isNaN(numericPrice)) {
        const discountedPrice = Math.round(numericPrice * 0.8);
        return { discounted: `$${discountedPrice}`, original: plan.price };
      }
    }
    
    return { discounted: plan.price, original: null };
  };

  const { discounted, original } = getDisplayPrice();

  // Define additional features for each plan
  const getAdditionalFeatures = (planId: string) => {
    switch (planId) {
      case 'starter':
        return [
          "Auto-Complete (unlimited)",
          "Property Search", 
          "Property Detail",
          "Address Verification",
          "PropGPT"
        ];
      default:
        return [];
    }
  };

  const additionalFeatures = getAdditionalFeatures(plan.id);
  const hasMoreFeatures = plan.features.length > 3;

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
              For companies with higher data needs
            </p>
          </div>
          <div className="mb-2 flex items-center gap-2">
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
            {/* Price display - simplified without strikethrough */}
            <div className="flex gap-1 items-baseline">
              <span className="text-xl font-semibold">{discounted}</span>
              <span className="text-xs text-muted-foreground">/month</span>
            </div>
            
            {/* Fixed height container for billing cycle text to maintain consistent height */}
            <div className="mt-1 text-xs text-muted-foreground h-4 flex items-start">
              {billingCycle === 'annual' && "12-month agreement, billed monthly"}
            </div>
          </div>
          <div className="mb-2 flex items-center gap-2">
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
              {hasMoreFeatures && (
                <li className="text-xs text-muted-foreground">
                  {additionalFeatures.length > 0 ? (
                    <HoverCard>
                      <HoverCardTrigger className="cursor-pointer hover:text-primary">
                        +{plan.features.length - 3} more features
                      </HoverCardTrigger>
                      <HoverCardContent className="w-64">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">Additional Features:</h4>
                          <ul className="text-xs space-y-1">
                            {additionalFeatures.map((feature, i) => (
                              <li key={i} className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3 text-primary/70" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <span>+{plan.features.length - 3} more features</span>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
