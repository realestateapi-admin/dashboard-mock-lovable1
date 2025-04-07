
import { AddOnsList } from "@/components/billing/AddOnsList";
import { AddOnData } from "@/types/billing";
import { Skeleton } from "@/components/ui/skeleton";

interface AddOnsStepProps {
  addOns: AddOnData[];
  selectedPlan: string;
  activeAddOns: string[];
  onToggleAddOn: (addOnId: string) => void;
  isLoading: boolean;
  updateFormData: (field: string, value: any) => void;
}

export const AddOnsStep = ({
  addOns,
  selectedPlan,
  activeAddOns,
  onToggleAddOn,
  isLoading,
  updateFormData
}: AddOnsStepProps) => {
  
  const handleToggleAddOn = (addOnId: string) => {
    onToggleAddOn(addOnId);
    
    // Update form data with new add-ons list
    const newAddOns = activeAddOns.includes(addOnId)
      ? activeAddOns.filter(id => id !== addOnId)
      : [...activeAddOns, addOnId];
      
    updateFormData('addOns', newAddOns);
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Enhance Your Plan with Add-Ons</h3>
        <p className="text-muted-foreground">
          Select additional features to customize your subscription.
        </p>
      </div>
      
      <AddOnsList 
        addOns={addOns}
        selectedPlan={selectedPlan}
        activeAddOns={activeAddOns}
        onToggleAddOn={handleToggleAddOn}
      />
    </div>
  );
};
