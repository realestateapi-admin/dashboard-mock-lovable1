import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if the URL includes documentation path and avoid redirect in that case
    if (window.location.pathname.includes('/documentation/')) {
      return; // Don't redirect if accessing documentation
    }
    
    // If the user is authenticated, redirect to the dashboard
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      // Otherwise, redirect to the sign-in page
      navigate("/sign-in");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-[#04c8c8]/10 to-transparent">
      <div className="text-center animate-pulse">
        <h1 className="text-2xl font-medium text-[#212e48]">Redirecting to RealEstateAPI Dashboard...</h1>
      </div>
    </div>
  );
};

export default Index;
