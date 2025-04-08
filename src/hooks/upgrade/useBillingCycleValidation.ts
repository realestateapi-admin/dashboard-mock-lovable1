
import { useToast } from "@/hooks/use-toast";

interface BillingCycleValidationProps {
  currentBillingCycle: 'monthly' | 'annual';
}

export const useBillingCycleValidation = ({ currentBillingCycle }: BillingCycleValidationProps) => {
  const { toast } = useToast();
  
  // Validate billing cycle changes (annual plans can't switch to monthly)
  const validateBillingCycleChange = (targetCycle: 'monthly' | 'annual'): boolean => {
    if (currentBillingCycle === 'annual' && targetCycle === 'monthly') {
      toast({
        title: "Cannot change to monthly billing",
        description: "Annual plans require a 12-month commitment. You cannot switch back to monthly billing until your contract ends.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };
  
  return {
    validateBillingCycleChange
  };
};
