
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AddOnData } from "@/types/billing";
import { AddOnsList } from "@/components/billing/AddOnsList";

interface ModifyAddOnsStepProps {
  addOns: AddOnData[];
  selectedPlan: string;
  activeAddOns: string[];
  onToggleAddOn: (addOnId: string) => void;
  onBack: () => void;
  onComplete: () => void;
}

export const ModifyAddOnsStep = ({
  addOns,
  selectedPlan,
  activeAddOns,
  onToggleAddOn,
  onBack,
  onComplete
}: ModifyAddOnsStepProps) => {
  // Track selected add-ons locally to preview changes
  const [localActiveAddOns, setLocalActiveAddOns] = React.useState<string[]>(activeAddOns);

  React.useEffect(() => {
    setLocalActiveAddOns(activeAddOns);
  }, [activeAddOns]);

  const handleToggleAddOn = (addOnId: string) => {
    setLocalActiveAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleSaveChanges = () => {
    // Update selected add-ons globally
    localActiveAddOns.forEach(addOnId => {
      if (!activeAddOns.includes(addOnId)) {
        onToggleAddOn(addOnId); // Add ones that weren't active before
      }
    });
    
    activeAddOns.forEach(addOnId => {
      if (!localActiveAddOns.includes(addOnId)) {
        onToggleAddOn(addOnId); // Remove ones that were active before
      }
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
          <h1 className="text-3xl font-semibold tracking-tight">Modify Add-ons</h1>
          <p className="text-muted-foreground mt-2">
            Select the add-ons you want to enable for your plan
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Add-ons</CardTitle>
          <CardDescription>
            Toggle the add-ons you wish to enable or disable
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddOnsList
            addOns={addOns}
            selectedPlan={selectedPlan}
            activeAddOns={localActiveAddOns}
            onToggleAddOn={handleToggleAddOn}
          />
        </CardContent>
        <CardFooter className="flex justify-end space-x-4 pt-6">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button onClick={handleSaveChanges}>
            Save Add-on Changes
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
