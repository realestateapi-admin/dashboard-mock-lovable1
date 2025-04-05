
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AddOnItem } from "./AddOnItem";
import { PlanSummary } from "./PlanSummary";
import { PlanData, AddOnData } from "@/types/billing";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

interface StepTwoProps {
  plans: PlanData[];
  selectedPlan: string;
  addOns?: AddOnData[];
  selectedAddOns?: string[];
  toggleAddOn?: (addOnId: string) => void;
  isLoading: boolean;
  handleSubscribe: () => void; 
  handleBack: () => void;
}

export const StepTwo = ({
  plans,
  addOns = [],
  selectedPlan,
  selectedAddOns = [],
  toggleAddOn = () => {},
  isLoading,
  handleSubscribe,
  handleBack
}: StepTwoProps) => {
  // Find the plan name from the selected plan ID
  const selectedPlanObj = plans.find(p => p.id === selectedPlan);
  
  // Store the selected plan name in localStorage when subscribing
  const handleSubscribeWithPlanStorage = () => {
    if (selectedPlanObj) {
      // Store both the plan ID and name
      localStorage.setItem('selectedPlan', selectedPlan);
      localStorage.setItem('selectedPlanName', selectedPlanObj.name);
    }
    
    // Call the original handleSubscribe function
    handleSubscribe();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Add premium features</CardTitle>
          <CardDescription>
            Enhance your {selectedPlanObj?.name} plan with add-ons
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {addOns.map(addon => (
            <AddOnItem
              key={addon.id}
              addon={addon}
              selectedPlan={selectedPlan}
              isSelected={selectedAddOns.includes(addon.id)}
              onToggle={toggleAddOn}
            />
          ))}
        </CardContent>
        <CardHeader className="pb-3 border-t pt-6">
          <CardTitle>Plan Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <PlanSummary
            selectedPlan={selectedPlan}
            selectedAddOns={selectedAddOns}
            plans={plans}
            addOns={addOns}
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubscribeWithPlanStorage} // Use the new handler
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              "Setting up your account..."
            ) : (
              <>
                Start your free trial <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
