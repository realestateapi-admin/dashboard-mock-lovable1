
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { ArrowRight } from "lucide-react";
import { PlanCard } from "./PlanCard";
import { PlanData } from "@/types/billing";
import { useIsMobile } from "@/hooks/use-mobile";

interface StepOneProps {
  plans: PlanData[];
  selectedPlan: string;
  setSelectedPlan: (planId: string) => void;
  isLoading: boolean;
  handleContinue: () => void;
}

export const StepOne = ({
  plans,
  selectedPlan,
  setSelectedPlan,
  isLoading,
  handleContinue
}: StepOneProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Choose your plan</h1>
        <p className="text-muted-foreground">
          Start with a free plan or choose a paid option with more features
        </p>
      </div>
      
      <div className={`${isMobile ? "overflow-x-auto pb-4" : ""}`}>
        <div className="max-w-[1200px] mx-auto">
          <RadioGroup 
            value={selectedPlan} 
            onValueChange={setSelectedPlan} 
            className="grid grid-cols-1 md:grid-cols-5 gap-6"
          >
            {plans.map((plan) => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                isSelected={selectedPlan === plan.id} 
                className="h-full"
              />
            ))}
          </RadioGroup>
        </div>
      </div>
      
      <div className="max-w-md mx-auto">
        <Button
          onClick={handleContinue}
          className="w-full mt-8"
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
