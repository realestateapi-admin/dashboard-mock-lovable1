
import { BillingCycleSelector } from "../BillingCycleSelector";

interface BillingCycleSectionProps {
  billingCycle: 'monthly' | 'annual';
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
}

export const BillingCycleSection = ({
  billingCycle,
  onBillingCycleChange
}: BillingCycleSectionProps) => {
  return (
    <div className="mb-6">
      <BillingCycleSelector 
        billingCycle={billingCycle}
        onBillingCycleChange={onBillingCycleChange}
      />
    </div>
  );
};
