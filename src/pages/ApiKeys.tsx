
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { useUsageData } from "@/hooks/useUsageData";
import UsageTracking from "@/components/dashboard/UsageTracking";
import { ApiKeyTabs } from "@/components/api-keys/ApiKeyTabs";
import { ApiConfiguration } from "@/components/api-keys/ApiConfiguration";

const ApiKeys = () => {
  const { isTrialActive, trialDaysLeft, isOnPaidPlan } = useTrialAlert();
  const { 
    currentUsage,
    usageHistory,
    isLoading: isLoadingUsage,
    error: usageError,
    refetch: refetchUsageData
  } = useUsageData();

  // Only show trial banner if trial is active AND user is not on a paid plan
  const shouldShowTrialBanner = isTrialActive && !isOnPaidPlan;

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
        <Alert className="bg-primary-teal/10 border-primary-teal">
          <AlertCircle className="h-4 w-4 text-primary-teal" />
          <AlertTitle className="text-primary-teal">Trial Mode Active</AlertTitle>
          <AlertDescription>
            You have {trialDaysLeft} days left in your trial. During this period, you can use the test API key for development.
          </AlertDescription>
        </Alert>
      )}
      
      <UsageTracking
        currentUsage={currentUsage}
        usageHistory={usageHistory}
        isLoading={isLoadingUsage}
        error={usageError}
        onRefresh={refetchUsageData}
      />
      
      <ApiKeyTabs 
        isTrialActive={isTrialActive}
        trialDaysLeft={trialDaysLeft}
      />
      
      <ApiConfiguration />
    </motion.div>
  );
};

export default ApiKeys;
