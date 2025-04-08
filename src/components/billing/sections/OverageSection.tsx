
import { OverageHandling } from "../OverageHandling";

interface OverageSectionProps {
  selectedPlanName: string;
  overageHandling: string;
  onOverageHandlingChange: (value: string) => void;
  selectedPlan?: string;
}

export const OverageSection = ({
  selectedPlanName,
  overageHandling,
  onOverageHandlingChange,
  selectedPlan = "growth"
}: OverageSectionProps) => {
  return (
    <div className="mt-6">
      <OverageHandling 
        selectedPlanName={selectedPlanName}
        overageHandling={overageHandling}
        onOverageHandlingChange={onOverageHandlingChange}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};
