
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useSubscriptionData } from "@/hooks/useSubscriptionData";
import { format } from "date-fns";

export const ApiConfiguration = () => {
  const [xUserIdRequired, setXUserIdRequired] = useState(true);
  const [overageHandling, setOverageHandling] = useState("allow-125");
  const [previousOverageHandling, setPreviousOverageHandling] = useState("");
  const [changeDate, setChangeDate] = useState<string | null>(null);
  const { toast } = useToast();
  const { subscription } = useSubscriptionData();

  // Initialize from the subscription when it loads
  useEffect(() => {
    if (subscription) {
      // This is where you would fetch the current overage handling setting from the backend
      // For now, we'll use the default value
      const currentSetting = "allow-125"; // This would come from the subscription data
      setOverageHandling(currentSetting);
      setPreviousOverageHandling(currentSetting);
    }
  }, [subscription]);

  const handleSaveConfig = () => {
    // Only track the change if the overage handling was actually changed
    if (overageHandling !== previousOverageHandling) {
      const now = new Date();
      const formattedDate = format(now, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
      setChangeDate(formattedDate);
      setPreviousOverageHandling(overageHandling);
      
      // In a real application, you would send this information to your backend
      console.log(`Overage handling changed from ${previousOverageHandling} to ${overageHandling} at ${formattedDate}`);
      
      // This data would be used for prorated billing calculations
    }

    // Notify the user that settings were saved
    toast({
      title: "Settings saved",
      description: "Your API configuration has been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Configuration</CardTitle>
        <CardDescription>
          Manage how your API keys behave and set usage restrictions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="x-user-id-toggle">Require X-User-ID Header</Label>
            <p className="text-sm text-muted-foreground">
              Track behavior of your end users with a unique identifier
            </p>
          </div>
          <Switch 
            id="x-user-id-toggle" 
            checked={xUserIdRequired}
            onCheckedChange={setXUserIdRequired}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="rate-limit-toggle">Enable Rate Limiting</Label>
            <p className="text-sm text-muted-foreground">
              Protect your account by limiting API calls per minute
            </p>
          </div>
          <Switch 
            id="rate-limit-toggle" 
            defaultChecked
          />
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Overage Handling</Label>
            <p className="text-sm text-muted-foreground">
              Choose how to handle API calls that exceed your plan limits
            </p>
          </div>
          
          <RadioGroup value={overageHandling} onValueChange={setOverageHandling} className="space-y-3">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="stop" id="stop-overages" />
              <div className="grid gap-1">
                <Label htmlFor="stop-overages" className="font-medium">Stop API Access</Label>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable API access when you reach your plan limits until the next billing cycle.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="allow-125" id="allow-125-overages" />
              <div className="grid gap-1">
                <Label htmlFor="allow-125-overages" className="font-medium">Allow Overages (125%)</Label>
                <p className="text-sm text-muted-foreground">
                  Continue API access up to 125% of your plan's usage. Additional charges apply.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="allow-200" id="allow-200-overages" />
              <div className="grid gap-1">
                <Label htmlFor="allow-200-overages" className="font-medium">Allow Overages (200%)</Label>
                <p className="text-sm text-muted-foreground">
                  Continue API access up to 200% of your plan's usage. Additional charges apply.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="allow-unlimited" id="allow-unlimited-overages" />
              <div className="grid gap-1">
                <Label htmlFor="allow-unlimited-overages" className="font-medium">Allow Unlimited Overages</Label>
                <p className="text-sm text-muted-foreground">
                  Continue API access without limits. Do not restrict access regardless of volume.
                </p>
              </div>
            </div>
          </RadioGroup>
          
          {changeDate && (
            <p className="text-xs text-muted-foreground mt-1">
              Last changed: {format(new Date(changeDate), "MMMM d, yyyy 'at' h:mm a")}
            </p>
          )}
          
          <div className="text-xs text-amber-500 mt-1">
            Note: Changes to overage handling settings will be prorated for the remainder of your billing cycle.
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="overage-toggle">Auto-Confirm Overages</Label>
            <p className="text-sm text-muted-foreground">
              Automatically approve charges for exceeding your plan limits
            </p>
          </div>
          <Switch 
            id="overage-toggle" 
            defaultChecked
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSaveConfig}>Save Configuration</Button>
      </CardFooter>
    </Card>
  );
};
