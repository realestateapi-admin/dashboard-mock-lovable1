
import { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { OverageHandlingSkeleton } from "./wizard/SkeletonLoading";

interface OverageHandlingProps {
  selectedPlanName: string;
  overageHandling: string;
  onOverageHandlingChange: (value: string) => void;
  isLoading?: boolean;
  selectedPlan?: string;
}

export const OverageHandling = ({
  selectedPlanName,
  overageHandling,
  onOverageHandlingChange,
  isLoading = false,
  selectedPlan = "growth"
}: OverageHandlingProps) => {
  const isStarterPlan = selectedPlan === "starter";
  
  // Automatically reset to default if user switches to Starter plan with "unlimited" selected
  useEffect(() => {
    if (isStarterPlan && overageHandling === "unlimited") {
      onOverageHandlingChange("cut-off"); // Default to cut-off for Starter plan
    }
  }, [isStarterPlan, overageHandling, onOverageHandlingChange]);
  
  if (isLoading) {
    return <OverageHandlingSkeleton />;
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Overage Handling <span className="text-red-500">*</span></h3>
      <p className="text-sm text-muted-foreground">
        Choose how to handle API usage that exceeds your {selectedPlanName} plan limits
      </p>
      
      {!overageHandling && (
        <p className="text-sm text-red-500 font-medium">
          Please select an overage handling option to continue
        </p>
      )}
      
      <RadioGroup
        value={overageHandling}
        onValueChange={onOverageHandlingChange}
        className="space-y-4 mt-4"
        required
      >
        <div className="flex items-start space-x-3 border p-4 rounded-md">
          <RadioGroupItem value="cut-off" id="cut-off" className="mt-1" />
          <div>
            <Label htmlFor="cut-off" className="text-base font-medium">
              Cut off access at plan limit
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              API calls will fail once you reach your monthly limit, preventing any overage charges.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 border p-4 rounded-md">
          <RadioGroupItem value="allow-25" id="allow-25" className="mt-1" />
          <div>
            <Label htmlFor="allow-25" className="text-base font-medium">
              Allow 25% overage billed at the plan's unit rate
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Continue processing requests up to 25% over your plan limit at your standard unit rate.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 border p-4 rounded-md">
          <RadioGroupItem value="allow-100" id="allow-100" className="mt-1" />
          <div>
            <Label htmlFor="allow-100" className="text-base font-medium">
              Allow 100% overage billed at the plan's unit rate
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Continue processing requests up to double your plan limit at your standard unit rate.
            </p>
          </div>
        </div>
        
        <div className={`flex items-start space-x-3 border p-4 rounded-md ${isStarterPlan ? 'opacity-50' : ''}`}>
          <RadioGroupItem 
            value="unlimited" 
            id="unlimited" 
            className="mt-1" 
            disabled={isStarterPlan}
          />
          <div>
            <Label htmlFor="unlimited" className={`text-base font-medium ${isStarterPlan ? 'text-muted-foreground' : ''}`}>
              My app is mission critical. Do not cut off access no matter the amount of overage
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Always process requests regardless of usage, with overages billed at your standard unit rate.
              {isStarterPlan && (
                <span className="block mt-1 text-amber-600 font-medium">
                  This option is only available for Growth plan and above.
                </span>
              )}
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};
