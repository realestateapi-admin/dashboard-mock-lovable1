
import { OverageHandling } from "../OverageHandling";

interface OverageSectionProps {
  selectedPlanName: string;
  overageHandling: string;
  onOverageHandlingChange: (value: string) => void;
}

export const OverageSection = ({
  selectedPlanName,
  overageHandling,
  onOverageHandlingChange
}: OverageSectionProps) => {
  return (
    <div className="mt-6">
      <OverageHandling 
        selectedPlanName={selectedPlanName}
        overageHandling={overageHandling}
        onOverageHandlingChange={onOverageHandlingChange}
      />
    </div>
  );
};
