
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface UpdateOverageStepProps {
  overageHandling: string;
  onOverageChange: (value: string) => void;
  onBack: () => void;
  onComplete: () => void;
  selectedPlan: string;
}

export const UpdateOverageStep = ({
  overageHandling,
  onOverageChange,
  onBack,
  onComplete,
  selectedPlan = "growth"
}: UpdateOverageStepProps) => {
  const { toast } = useToast();
  const [localOverageHandling, setLocalOverageHandling] = React.useState(overageHandling);
  const isStarterPlan = selectedPlan === "starter";

  const handleSaveChanges = () => {
    onOverageChange(localOverageHandling);
    toast({
      title: "Overage settings updated",
      description: "Your overage handling preferences have been saved."
    });
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Update Overage Handling</h1>
          <p className="text-muted-foreground mt-2">
            Choose how we should handle API usage that exceeds your plan limits
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overage Settings</CardTitle>
          <CardDescription>
            Select how you want us to handle cases where your API usage exceeds the plan limit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={localOverageHandling}
            onValueChange={setLocalOverageHandling}
            className="space-y-6"
          >
            <div className="flex items-start space-x-4 rounded-md border p-4">
              <RadioGroupItem value="cut-off" id="cut-off" className="mt-1" />
              <div className="space-y-2">
                <Label htmlFor="cut-off" className="text-base font-medium">
                  Stop API calls when plan limit is reached
                </Label>
                <p className="text-sm text-muted-foreground">
                  API calls will fail once you reach your monthly limit, preventing any overage charges.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 rounded-md border p-4">
              <RadioGroupItem value="allow-25" id="allow-25" className="mt-1" />
              <div className="space-y-2">
                <Label htmlFor="allow-25" className="text-base font-medium">
                  Allow 25% overage billed at the plan's unit rate
                </Label>
                <p className="text-sm text-muted-foreground">
                  Continue processing requests up to 25% over your plan limit at your standard unit rate.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 rounded-md border p-4">
              <RadioGroupItem value="allow-100" id="allow-100" className="mt-1" />
              <div className="space-y-2">
                <Label htmlFor="allow-100" className="text-base font-medium">
                  Allow 100% overage billed at the plan's unit rate
                </Label>
                <p className="text-sm text-muted-foreground">
                  Continue processing requests up to double your plan limit at your standard unit rate.
                </p>
              </div>
            </div>
            
            <div className={`flex items-start space-x-4 rounded-md border p-4 ${isStarterPlan ? 'opacity-50' : ''}`}>
              <RadioGroupItem 
                value="unlimited" 
                id="unlimited" 
                className="mt-1" 
                disabled={isStarterPlan}
              />
              <div className="space-y-2">
                <Label htmlFor="unlimited" className={`text-base font-medium ${isStarterPlan ? 'text-muted-foreground' : ''}`}>
                  Never cut off API key because application is mission critical
                </Label>
                <p className="text-sm text-muted-foreground">
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
        </CardContent>
        <CardFooter className="flex justify-end space-x-4 pt-6">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button onClick={handleSaveChanges}>
            Save Overage Settings
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
