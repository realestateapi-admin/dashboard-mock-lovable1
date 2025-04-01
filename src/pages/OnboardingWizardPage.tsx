
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";
import { DashboardProvider } from "@/contexts/DashboardContext";

const OnboardingWizardPage = () => {
  // Wrap the OnboardingWizard with DashboardProvider to fix the error
  // "useDashboard must be used within a DashboardProvider"
  return (
    <DashboardProvider>
      <OnboardingWizard />
    </DashboardProvider>
  );
};

export default OnboardingWizardPage;
