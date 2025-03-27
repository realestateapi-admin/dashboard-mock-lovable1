
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
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ApiUsage from "./pages/ApiUsage";
import UsageHistory from "./pages/UsageHistory";
import ApiKeys from "./pages/ApiKeys";
import Billing from "./pages/Billing";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import SettingsPage from "./components/settings/SettingsPage";
import ProfileSettings from "./components/settings/ProfileSettings";
import { TrialAlertProvider } from "./contexts/TrialAlertContext";
import { AuthProvider, ProtectedRoute } from "./contexts/AuthContext";
import AccessDenied from "./pages/AccessDenied";
import ImplementationNotes from "./pages/ImplementationNotes";

// Initialize the query client for data fetching
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
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/onboarding" element={<Onboarding />} />
              
              {/* Dashboard routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['admin', 'billing', 'developer', 'viewer']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="access-denied" element={<AccessDenied />} />
                
                {/* API Usage - accessible to all except viewers */}
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
                
                {/* API Keys - accessible to admins and developers */}
                <Route path="api-keys" element={
                  <ProtectedRoute allowedRoles={['admin', 'developer']}>
                    <ApiKeys />
                  </ProtectedRoute>
                } />
                
                {/* Billing - accessible to admins and billing roles */}
                <Route path="billing" element={
                  <ProtectedRoute allowedRoles={['admin', 'billing']}>
                    <Billing />
                  </ProtectedRoute>
                } />
                
                {/* Support - accessible to all roles */}
                <Route path="support" element={<Support />} />
                
                {/* Profile - accessible to all roles */}
                <Route path="profile" element={<Profile />} />
                
                {/* Implementation Notes - accessible to all roles */}
                <Route path="implementation-notes" element={<ImplementationNotes />} />
                
                {/* Settings - accessible to admins only */}
                <Route path="settings" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Settings />
                  </ProtectedRoute>
                }>
                  <Route index element={<SettingsPage />} />
                  <Route path="profile" element={<ProfileSettings />} />
                </Route>
              </Route>
              
              {/* Fallback for unknown routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TrialAlertProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
