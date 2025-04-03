
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { ArrowRight, Phone } from "lucide-react";
import { PlanCard } from "./PlanCard";
import { PlanData } from "@/types/billing";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";

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
  
  // Find the enterprise plan
  const enterprisePlan = plans.find(p => p.id === "enterprise");
  // Filter out enterprise plan from the regular plans list
  const regularPlans = plans.filter(p => p.id !== "enterprise");
  
  return (
    <div className="container w-full">
      <div className={`${isMobile ? "overflow-x-auto pb-4" : ""} grid grid-cols-1 md:grid-cols-3 gap-8`}>
        <div className="md:col-span-2">
          <RadioGroup 
            value={selectedPlan} 
            onValueChange={setSelectedPlan} 
            className="plan-grid"
          >
            {regularPlans.map((plan) => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                isSelected={selectedPlan === plan.id} 
                className="h-full"
              />
            ))}
          </RadioGroup>
          
          {/* Enterprise plan for mobile view */}
          {isMobile && enterprisePlan && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Enterprise Solution</h3>
              <RadioGroup 
                value={selectedPlan} 
                onValueChange={setSelectedPlan}
              >
                <PlanCard 
                  plan={enterprisePlan} 
                  isSelected={selectedPlan === enterprisePlan.id} 
                  className="h-full"
                />
              </RadioGroup>
            </div>
          )}
        </div>
        
        {/* Right sidebar - Only show on desktop */}
        {!isMobile && enterprisePlan && (
          <div className="md:col-span-1">
            {/* Enterprise compact card */}
            <Card className="border border-primary/40 bg-primary/5 mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Enterprise</h3>
                  {selectedPlan === enterprisePlan.id && (
                    <div className="text-primary text-sm font-medium">Selected</div>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mb-3">
                  For large organizations with complex needs
                </p>
                
                <div className="mb-3 py-1 px-2 bg-muted/50 rounded-md flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">Records:</span>
                  <span className="text-xs font-semibold">
                    {enterprisePlan.records}
                  </span>
                </div>
                
                <Button 
                  variant={selectedPlan === enterprisePlan.id ? "secondary" : "outline"}
                  size="sm"
                  className="w-full border-primary text-primary hover:bg-primary/10"
                  onClick={() => setSelectedPlan(enterprisePlan.id)}
                >
                  <Phone className="h-3 w-3 mr-1" />
                  {selectedPlan === enterprisePlan.id ? "Selected" : "Contact Sales"}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
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
