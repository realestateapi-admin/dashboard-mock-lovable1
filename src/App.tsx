
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
import Support from "./pages/Support";

// Initialize the query client for data fetching
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/sign-in" replace />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="usage" element={<ApiUsage />} />
            <Route path="support" element={<Support />} />
            {/* Additional dashboard routes can be added here */}
          </Route>
          
          {/* Fallback for unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
