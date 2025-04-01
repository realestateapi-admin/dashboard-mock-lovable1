
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setIsAuthenticated, setCurrentRole } = useAuth();
  const { startFreeTrial } = useTrialAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set authentication state directly with the Auth context
      setIsAuthenticated(true);
      
      // For demo purposes, set the role (using the email to determine the role)
      let role = 'admin'; // Default role
      if (email.includes('billing')) {
        role = 'billing';
      } else if (email.includes('developer')) {
        role = 'developer';
      } else if (email.includes('viewer')) {
        role = 'viewer';
      }
      
      // Set the role in context
      setCurrentRole(role as any);
      
      // Store in localStorage (now redundant since the context handles this,
      // but kept for backward compatibility)
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', role);
      
      // Check if this is a new user (for demo purposes, we'll use a flag in localStorage)
      const isNewUser = !localStorage.getItem('hasSignedInBefore');
      
      // If it's a new user, start a trial
      if (isNewUser && startFreeTrial) {
        startFreeTrial();
        localStorage.setItem('hasSignedInBefore', 'true');
      }
      
      toast({
        title: "Signed in successfully",
        description: "Welcome back to RealEstateAPI dashboard",
      });
      
      // Navigate to dashboard after authentication is set
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Please check your credentials and try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to continue to your dashboard
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="input-with-focus-ring"
              autoComplete="email"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link 
                to="/forgot-password" 
                className="text-xs text-primary hover:underline underline-offset-4"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-with-focus-ring"
              autoComplete="current-password"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember me
            </Label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link 
              to="/sign-up" 
              className="text-primary hover:underline underline-offset-4"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
