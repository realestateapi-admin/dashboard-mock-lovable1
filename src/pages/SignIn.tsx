
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailValue.trim()) {
      setEmailError("");
      setIsEmailValid(false);
      return false;
    }
    
    if (!emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address");
      setIsEmailValid(false);
      return false;
    }
    
    setEmailError("");
    setIsEmailValid(true);
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    validateEmail(emailValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email before submission
    if (!validateEmail(email)) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate sign in
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in a real app, verify credentials here
      // For demo purposes, any valid email/password combination works
      toast({
        title: "Sign in successful",
        description: "Welcome back!",
      });
      
      // Set authentication state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'admin');
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
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
          <h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to access your dashboard
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="you@example.com"
                required
                className={`input-with-focus-ring pr-10 ${
                  emailError ? 'border-red-500 focus-visible:ring-red-500' : 
                  isEmailValid ? 'border-green-500 focus-visible:ring-green-500' : ''
                }`}
                autoComplete="email"
              />
              {email && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {isEmailValid ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : emailError ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : null}
                </div>
              )}
            </div>
            {emailError && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {emailError}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="input-with-focus-ring"
              autoComplete="current-password"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Link 
              to="/forgot-password" 
              className="text-sm text-primary hover:underline underline-offset-4"
            >
              Forgot your password?
            </Link>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !isEmailValid}
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
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
