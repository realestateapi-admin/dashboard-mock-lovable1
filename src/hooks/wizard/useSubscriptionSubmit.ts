
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { plans } from "@/data/plans";

export const useSubscriptionSubmit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setIsOnPaidPlan } = useTrialAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (selectedPlan: string) => {
    // Simulate submission loading
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Set user as on a paid plan in context and localStorage
      if (setIsOnPaidPlan) {
        setIsOnPaidPlan(true);
        localStorage.setItem('isOnPaidPlan', 'true');
      }
      
      // Save selected plan to localStorage for persistence
      localStorage.setItem('selectedPlan', selectedPlan);
      
      // Find the plan name for the selected plan
      const selectedPlanName = plans.find(p => p.id === selectedPlan)?.name || "Growth";
      localStorage.setItem('selectedPlanName', selectedPlanName);
      
      // Set subscription start date to track contract terms
      const startDate = new Date().toISOString();
      localStorage.setItem('subscriptionStartDate', startDate);
      
      // In a real application, this would process the payment via Stripe
      toast({
        title: "Subscription Successful",
        description: "Your subscription has been successfully processed.",
      });
      
      // Make sure local storage is updated to show user as being on a paid plan
      // This ensures that the billing menu options will be shown
      localStorage.setItem('isFreeUser', 'false');
      
      // Redirect to dashboard
      navigate("/dashboard");
    }, 2000);
  };
  
  return {
    isSubmitting,
    handleSubmit
  };
};
