
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { PlanData } from "@/types/billing";
import { PlansSection } from "@/components/billing/sections/PlansSection";
import { BillingCycleSelector } from "@/components/billing/BillingCycleSelector";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ChangePlanStepProps {
  plans: PlanData[];
  currentPlan: PlanData;
  billingCycle: 'monthly' | 'annual';
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  onSelectPlan: (planId: string) => void;
  onBack: () => void;
  onComplete: () => void;
}

export const ChangePlanStep = ({
  plans,
  currentPlan,
  billingCycle,
  onBillingCycleChange,
  onSelectPlan,
  onBack,
  onComplete
}: ChangePlanStepProps) => {
  // Store only the ID, not the object reference
  const [selectedPlanId, setSelectedPlanId] = React.useState(currentPlan.id);
  const isAnnualBilling = billingCycle === 'annual';

  const handlePlanChange = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const handleSavePlan = () => {
    // Only pass the ID, not the plan object
    onSelectPlan(selectedPlanId);
    onComplete();
  };

  // Create a deep copy of the plans array to prevent mutations
  const plansCopy = React.useMemo(() => 
    JSON.parse(JSON.stringify(plans)), 
    [plans]
  );

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
          <h1 className="text-3xl font-semibold tracking-tight">Change Plan</h1>
          <p className="text-muted-foreground mt-2">
            Select your new plan and billing cycle
          </p>
        </div>
      </div>

      {isAnnualBilling && (
        <Alert variant="default" className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            You're currently on an annual billing cycle. Once on an annual plan, you cannot switch back to monthly billing until your contract ends.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Billing Cycle</CardTitle>
          <CardDescription>
            Choose between monthly or annual billing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BillingCycleSelector
            billingCycle={billingCycle}
            onBillingCycleChange={onBillingCycleChange}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>
            Select the plan that best fits your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PlansSection
            plans={plansCopy}
            selectedPlan={selectedPlanId}
            onPlanChange={handlePlanChange}
            billingCycle={billingCycle}
          />
        </CardContent>
        <CardFooter className="flex justify-end space-x-4 pt-6">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button onClick={handleSavePlan}>
            Save Plan Changes
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
