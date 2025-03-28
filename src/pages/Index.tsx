
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the URL includes documentation path and avoid redirect in that case
    if (window.location.pathname.includes('/documentation/')) {
      return; // Don't redirect if accessing documentation
    }
    
    // Redirect to sign-in page for other routes
    navigate("/sign-in");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-[#04c8c8]/10 to-transparent">
      <div className="text-center animate-pulse">
        <h1 className="text-2xl font-medium text-[#212e48]">Redirecting to RealEstateAPI Dashboard...</h1>
      </div>
    </div>
  );
};

export default Index;
