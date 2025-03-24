
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { ArrowRight } from "lucide-react";
import { PlanCard } from "./PlanCard";
import { PlanData } from "@/types/billing";

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
  return (
    <div className="space-y-8">
      <RadioGroup 
        value={selectedPlan} 
        onValueChange={setSelectedPlan} 
        className="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-4 mx-auto max-w-6xl"
      >
        {plans.map((plan) => (
          <PlanCard 
            key={plan.id} 
            plan={plan} 
            isSelected={selectedPlan === plan.id} 
          />
        ))}
      </RadioGroup>
      
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
