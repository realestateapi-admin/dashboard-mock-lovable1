
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
import SettingsPage from "./components/settings/SettingsPage";
import { TrialAlertProvider } from "./contexts/TrialAlertContext";

// Initialize the query client for data fetching
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="usage" element={<ApiUsage />} />
              <Route path="usage/history" element={<UsageHistory />} />
              <Route path="api-keys" element={<ApiKeys />} />
              <Route path="billing" element={<Billing />} />
              <Route path="support" element={<Support />} />
              <Route path="settings" element={<Settings />}>
                <Route index element={<SettingsPage />} />
              </Route>
            </Route>
            
            {/* Fallback for unknown routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TrialAlertProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
