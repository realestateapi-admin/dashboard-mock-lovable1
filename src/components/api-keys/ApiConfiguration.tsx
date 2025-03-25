
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const ApiConfiguration = () => {
  const [xUserIdRequired, setXUserIdRequired] = useState(true);

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
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="overage-toggle">Allow Overages</Label>
            <p className="text-sm text-muted-foreground">
              Continue API access after reaching your plan limits (additional charges apply)
            </p>
          </div>
          <Switch 
            id="overage-toggle" 
            defaultChecked
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Configuration</Button>
      </CardFooter>
    </Card>
  );
};
