
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUpgradeWizard } from "../hooks/useUpgradeWizard";

export const UpgradePrompt = () => {
  const { startWizard } = useUpgradeWizard();
  
  return (
    <div className="p-4 mb-6 bg-purple-50 border border-purple-200 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h3 className="text-lg font-medium text-purple-800">Need to make a change?</h3>
          <p className="text-sm text-purple-700">
            Upgrade or modify your plan with our guided plan selection wizard
          </p>
        </div>
        <Button 
          onClick={startWizard}
          className="mt-3 md:mt-0 bg-purple-600 hover:bg-purple-700"
        >
          Upgrade Plan
        </Button>
      </div>
    </div>
  );
};
