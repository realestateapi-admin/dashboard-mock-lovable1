
import React from "react";
import { PlanData } from "@/types/billing";

interface ServiceLevelAgreementProps {
  selectedPlanData?: PlanData;
}

export const ServiceLevelAgreement: React.FC<ServiceLevelAgreementProps> = ({
  selectedPlanData
}) => {
  return (
    <div className="mt-2 border-t pt-4">
      <h4 className="text-sm font-medium mb-2">Service Level Agreement</h4>
      <div className="text-sm space-y-2">
        <p>• 99.9% uptime guarantee for API services</p>
        <p>• 24-hour response time for support tickets</p>
        <p>• Unlimited access to knowledge base and documentation</p>
        {selectedPlanData?.id === 'growth' && (
          <p>• Priority support queue access</p>
        )}
        {selectedPlanData?.id === 'enterprise' && (
          <>
            <p>• Dedicated account manager</p>
            <p>• Custom integration support</p>
          </>
        )}
      </div>
    </div>
  );
};
