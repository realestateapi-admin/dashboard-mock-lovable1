
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Onboarding from "./pages/Onboarding";
import OnboardingWizardPage from "./pages/OnboardingWizardPage";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ApiUsage from "./pages/ApiUsage";
import UsageHistory from "./pages/UsageHistory";
import ApiKeys from "./pages/ApiKeys";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import PlanSignupWizard from "./pages/PlanSignupWizard";
import SettingsPage from "./components/settings/SettingsPage";
import ProfileSettings from "./components/settings/ProfileSettings";
import { TrialAlertProvider } from "./contexts/TrialAlertContext";
import { AuthProvider, ProtectedRoute } from "./contexts/AuthContext";
import AccessDenied from "./pages/AccessDenied";
import ImplementationNotes from "./pages/ImplementationNotes";
import SalesFlowPage from "./pages/SalesFlowPage";
import UpgradeFlow from "./pages/UpgradeFlow";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <TrialAlertProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/onboarding-wizard" element={<OnboardingWizardPage />} />
              <Route path="/sales-flow" element={<SalesFlowPage />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['admin', 'billing', 'developer', 'viewer']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="access-denied" element={<AccessDenied />} />
                
                <Route path="plan-signup" element={<PlanSignupWizard />} />
                
                <Route path="usage" element={
                  <ProtectedRoute allowedRoles={['admin', 'billing', 'developer']}>
                    <ApiUsage />
                  </ProtectedRoute>
                } />
                <Route path="usage/history" element={
                  <ProtectedRoute allowedRoles={['admin', 'billing', 'developer']}>
                    <UsageHistory />
                  </ProtectedRoute>
                } />
                
                <Route path="api-keys" element={
                  <ProtectedRoute allowedRoles={['admin', 'developer']}>
                    <ApiKeys />
                  </ProtectedRoute>
                } />
                
                {/* Redirect from billing to upgrade */}
                <Route path="billing" element={
                  <ProtectedRoute allowedRoles={['admin', 'billing']}>
                    <Navigate to="/dashboard/upgrade" replace />
                  </ProtectedRoute>
                } />
                
                <Route path="upgrade" element={
                  <ProtectedRoute allowedRoles={['admin', 'billing']}>
                    <UpgradeFlow />
                  </ProtectedRoute>
                } />
                
                <Route path="support" element={<Support />} />
                
                <Route path="profile" element={<Profile />} />
                
                <Route path="implementation-notes" element={<ImplementationNotes />} />
                
                <Route path="sales-flow" element={<SalesFlowPage />} />
                
                <Route path="settings" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Settings />
                  </ProtectedRoute>
                }>
                  <Route index element={<SettingsPage />} />
                  <Route path="profile" element={<ProfileSettings />} />
                </Route>
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TrialAlertProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
