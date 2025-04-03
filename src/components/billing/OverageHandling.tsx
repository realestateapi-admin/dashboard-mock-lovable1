
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { OverageHandlingSkeleton } from "./wizard/SkeletonLoading";

interface OverageHandlingProps {
  selectedPlanName: string;
  overageHandling: string;
  onOverageHandlingChange: (value: string) => void;
  isLoading?: boolean;
}

export const OverageHandling = ({
  selectedPlanName,
  overageHandling,
  onOverageHandlingChange,
  isLoading = false
}: OverageHandlingProps) => {
  
  if (isLoading) {
    return <OverageHandlingSkeleton />;
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Overage Handling</h3>
      <p className="text-sm text-muted-foreground">
        Choose how to handle API usage that exceeds your {selectedPlanName} plan limits
      </p>
      
      <RadioGroup
        value={overageHandling}
        onValueChange={onOverageHandlingChange}
        className="space-y-4 mt-4"
      >
        <div className="flex items-start space-x-3 border p-4 rounded-md">
          <RadioGroupItem value="fail" id="fail" className="mt-1" />
          <div>
            <Label htmlFor="fail" className="text-base font-medium">
              Fail requests
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              API calls will fail once you reach your monthly limit, preventing any overage charges.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 border p-4 rounded-md">
          <RadioGroupItem value="pay-as-you-go" id="pay-as-you-go" className="mt-1" />
          <div>
            <Label htmlFor="pay-as-you-go" className="text-base font-medium">
              Pay-as-you-go
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Continue processing requests at $0.003 per additional record over your plan limit.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 border p-4 rounded-md">
          <RadioGroupItem value="notify-80" id="notify-80" className="mt-1" />
          <div>
            <Label htmlFor="notify-80" className="text-base font-medium">
              Notify at 80% threshold
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              We'll send an alert when you reach 80% of your monthly limit so you can upgrade if needed.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 border p-4 rounded-md">
          <RadioGroupItem value="notify-90" id="notify-90" className="mt-1" />
          <div>
            <Label htmlFor="notify-90" className="text-base font-medium">
              Notify at 90% threshold
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              We'll send an alert when you reach 90% of your monthly limit so you can upgrade if needed.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 border p-4 rounded-md">
          <RadioGroupItem value="notify-both" id="notify-both" className="mt-1" />
          <div>
            <Label htmlFor="notify-both" className="text-base font-medium">
              Notify at both thresholds
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              We'll send alerts when you reach both 80% and 90% of your monthly limit.
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};
