
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PlanOptionsCardProps {
  onChangePlan: () => void;
  onChangeAddOns: () => void;
  onChangeOverage: () => void;
  onFinalizePlan: () => void;
  setHasChanges: (value: boolean) => void;
}

export const PlanOptionsCard = ({
  onChangePlan,
  onChangeAddOns,
  onChangeOverage,
  onFinalizePlan,
  setHasChanges
}: PlanOptionsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What would you like to change?</CardTitle>
        <CardDescription>
          Select an option below to modify your subscription
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full justify-between h-auto py-6 text-left" 
          onClick={() => {
            setHasChanges(true);
            onChangePlan();
          }}
        >
          <div>
            <h3 className="font-medium text-base mb-1">Change Plan</h3>
            <p className="text-sm text-muted-foreground">
              Upgrade or downgrade your base plan
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </Button>

        <Button 
          variant="outline" 
          className="w-full justify-between h-auto py-6 text-left" 
          onClick={() => {
            setHasChanges(true);
            onChangeAddOns();
          }}
        >
          <div>
            <h3 className="font-medium text-base mb-1">Modify Add-ons</h3>
            <p className="text-sm text-muted-foreground">
              Add or remove additional features
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </Button>

        <Button 
          variant="outline" 
          className="w-full justify-between h-auto py-6 text-left" 
          onClick={() => {
            setHasChanges(true);
            onChangeOverage();
          }}
        >
          <div>
            <h3 className="font-medium text-base mb-1">Update Overage Handling</h3>
            <p className="text-sm text-muted-foreground">
              Change how we handle exceeding your plan limits
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </Button>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          className="w-full"
          onClick={onFinalizePlan}
        >
          Finalize Plan Changes
        </Button>
      </CardFooter>
    </Card>
  );
};
