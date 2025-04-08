
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface UpdateOverageStepProps {
  overageHandling: string;
  onOverageChange: (value: string) => void;
  onBack: () => void;
  onComplete: () => void;
}

export const UpdateOverageStep = ({
  overageHandling,
  onOverageChange,
  onBack,
  onComplete
}: UpdateOverageStepProps) => {
  const [localOverageHandling, setLocalOverageHandling] = React.useState(overageHandling);

  const handleSaveChanges = () => {
    onOverageChange(localOverageHandling);
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
              <RadioGroupItem value="stop" id="stop" className="mt-1" />
              <div className="space-y-2">
                <Label htmlFor="stop" className="text-base font-medium">
                  Stop API calls
                </Label>
                <p className="text-sm text-muted-foreground">
                  When you reach your plan limit, API calls will be rejected until the next billing cycle or until you upgrade your plan.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 rounded-md border p-4">
              <RadioGroupItem value="notify" id="notify" className="mt-1" />
              <div className="space-y-2">
                <Label htmlFor="notify" className="text-base font-medium">
                  Notify but continue processing
                </Label>
                <p className="text-sm text-muted-foreground">
                  When you reach your plan limit, we'll notify you but continue processing API calls at your standard overage rate.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 rounded-md border p-4">
              <RadioGroupItem value="auto-upgrade" id="auto-upgrade" className="mt-1" />
              <div className="space-y-2">
                <Label htmlFor="auto-upgrade" className="text-base font-medium">
                  Auto-upgrade to next tier
                </Label>
                <p className="text-sm text-muted-foreground">
                  When you reach your plan limit, we'll automatically upgrade you to the next plan tier to ensure uninterrupted service.
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
