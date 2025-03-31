
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface OverageHandlingProps {
  selectedPlanName: string;
  overageHandling: string;
  onOverageHandlingChange: (value: string) => void;
}

export const OverageHandling = ({
  selectedPlanName,
  overageHandling,
  onOverageHandlingChange
}: OverageHandlingProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Overage Handling</h3>
      <p className="text-sm text-muted-foreground">
        Choose how to handle API calls that exceed your plan limits
      </p>
      <RadioGroup value={overageHandling} onValueChange={onOverageHandlingChange} className="space-y-2">
        <div className="flex items-start space-x-2">
          <RadioGroupItem value="stop" id="stop-overages" />
          <div className="grid gap-1.5">
            <Label htmlFor="stop-overages" className="font-medium">Stop API Access</Label>
            <p className="text-sm text-muted-foreground">
              Temporarily disable API access when you reach your plan limits until the next billing cycle.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <RadioGroupItem value="allow-125" id="allow-125-overages" />
          <div className="grid gap-1.5">
            <Label htmlFor="allow-125-overages" className="font-medium">Allow Overages (Pay as you go)</Label>
            <p className="text-sm text-muted-foreground">
              Continue API access up to 125% of my {selectedPlanName} usage has been reached. Then discontinue access until the next billing cycle.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <RadioGroupItem value="allow-200" id="allow-200-overages" />
          <div className="grid gap-1.5">
            <Label htmlFor="allow-200-overages" className="font-medium">Allow Overages (Pay as you go)</Label>
            <p className="text-sm text-muted-foreground">
              Continue API access up to 200% of my {selectedPlanName} usage has been reached. Then discontinue access until the next billing cycle.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <RadioGroupItem value="allow-unlimited" id="allow-unlimited-overages" />
          <div className="grid gap-1.5">
            <Label htmlFor="allow-unlimited-overages" className="font-medium">Allow Overages (Pay as you go)</Label>
            <p className="text-sm text-muted-foreground">
              Continue API access without limits. Do not restrict my API access, no matter how much volume is generated.
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};
