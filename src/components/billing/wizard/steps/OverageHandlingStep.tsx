
import { OverageHandling } from "@/components/billing/OverageHandling";
import { Skeleton } from "@/components/ui/skeleton";

interface OverageHandlingStepProps {
  selectedPlanName: string;
  overageHandling: string;
  onOverageHandlingChange: (value: string) => void;
  isLoading: boolean;
  updateFormData: (field: string, value: any) => void;
}

export const OverageHandlingStep = ({
  selectedPlanName,
  overageHandling,
  onOverageHandlingChange,
  isLoading,
  updateFormData
}: OverageHandlingStepProps) => {
  
  const handleOverageHandlingChange = (value: string) => {
    onOverageHandlingChange(value);
    updateFormData('overageHandling', value);
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Configure Usage Limits</h3>
        <p className="text-muted-foreground">
          Decide how to handle usage that exceeds your plan's limits.
        </p>
      </div>
      
      <OverageHandling 
        selectedPlanName={selectedPlanName}
        overageHandling={overageHandling}
        onOverageHandlingChange={handleOverageHandlingChange}
      />
    </div>
  );
};
