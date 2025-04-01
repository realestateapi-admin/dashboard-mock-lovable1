
import { useEffect } from "react";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { TrialDashboardBanner } from "@/components/dashboard/TrialDashboardBanner";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { isTrialActive, isFreeUser } = useTrialAlert();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if the user has completed the onboarding wizard
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    
    // If this is their first time to the dashboard after onboarding,
    // mark onboarding as completed
    if (!hasCompletedOnboarding && isAuthenticated) {
      localStorage.setItem('hasCompletedOnboarding', 'true');
    }
  }, [isAuthenticated]);

  return (
    <>
      <DashboardContent 
        trialBanner={isTrialActive && isFreeUser ? <TrialDashboardBanner /> : null}
      />
    </>
  );
};

export default Dashboard;
