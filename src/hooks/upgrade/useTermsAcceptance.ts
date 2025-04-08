
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useTermsAcceptance = () => {
  const { toast } = useToast();
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Handle terms acceptance
  const handleTermsAccepted = (accepted: boolean) => {
    setTermsAccepted(accepted);
  };

  // Validate terms acceptance
  const validateTermsAcceptance = (): boolean => {
    if (!termsAccepted) {
      toast({
        title: "Terms of Service Required",
        description: "Please accept the Terms of Service to continue.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  return {
    termsAccepted,
    handleTermsAccepted,
    validateTermsAcceptance
  };
};
