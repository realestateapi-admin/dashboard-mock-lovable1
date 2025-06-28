
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { ApiKeyTabs } from "@/components/api-keys/ApiKeyTabs";

const ApiKeys = () => {
  const { isTrialActive, trialDaysLeft, isOnPaidPlan } = useTrialAlert();

  // Only show trial banner if trial is active AND user is not on a paid plan
  const shouldShowTrialBanner = isTrialActive && !isOnPaidPlan;
  
  // Determine colors based on trial days left
  const isExpired = trialDaysLeft <= 0;
  const isUrgent = trialDaysLeft <= 2 && trialDaysLeft > 0;
  
  const alertClasses = isExpired 
    ? "bg-red-50 border-red-500"
    : isUrgent 
    ? "bg-orange-50 border-orange-500"
    : "bg-primary-teal/10 border-primary-teal";
    
  const iconColor = isExpired 
    ? "text-red-500"
    : isUrgent 
    ? "text-orange-500"
    : "text-primary-teal";
    
  const titleColor = isExpired 
    ? "text-red-700"
    : isUrgent 
    ? "text-orange-700"
    : "text-primary-teal";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">API Keys</h1>
      </div>
      
      {shouldShowTrialBanner && (
        <Alert className={alertClasses}>
          <AlertCircle className={`h-4 w-4 ${iconColor}`} />
          <AlertTitle className={titleColor}>
            {isExpired ? "Trial Expired" : "Trial Mode Active"}
          </AlertTitle>
          <AlertDescription>
            {isExpired ? (
              "Your free trial has ended. Choose a plan to continue using the API."
            ) : (
              `You have ${trialDaysLeft} days left in your trial. During this period, you can use the test API key for development.`
            )}
          </AlertDescription>
        </Alert>
      )}
      
      <ApiKeyTabs 
        isTrialActive={isTrialActive}
        trialDaysLeft={trialDaysLeft}
      />
    </motion.div>
  );
};

export default ApiKeys;
