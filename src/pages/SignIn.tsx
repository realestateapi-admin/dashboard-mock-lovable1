import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle, CheckCircle } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

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
      
      // Update AuthContext state
      setIsAuthenticated(true);
      
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
    <div className="min-h-screen flex">
      {/* Left Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Sign In</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder=""
                required
                className="h-10"
                autoComplete="email"
              />
              {emailError && (
                <p className="text-sm text-red-600">{emailError}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password ?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                required
                className="h-10"
                autoComplete="current-password"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-10 bg-teal-500 hover:bg-teal-600 text-white" 
              disabled={isLoading || !isEmailValid}
            >
              {isLoading ? "Please wait..." : "Continue"}
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Property Data Visualization */}
      <div className="flex-1 bg-gradient-to-br from-teal-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Property Cards */}
          <div className="relative">
            {/* Top Property Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="absolute -top-20 -left-10 bg-white rounded-lg shadow-lg p-4 w-64 border"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">2520 Washita Ave Ne</p>
                  <p className="text-sm text-gray-500">Atlanta GA 30307</p>
                </div>
              </div>
            </motion.div>

            {/* Bottom Property Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute top-20 left-10 bg-white rounded-lg shadow-lg p-4 w-64 border"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-teal-500 rounded"></div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">87541 Mineral Ave</p>
                  <p className="text-sm text-gray-500">Aurora CO 80045</p>
                </div>
              </div>
            </motion.div>

            {/* Central Geometric Pattern */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="relative"
            >
              {/* Large geometric shapes */}
              <div className="w-48 h-48 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-200 to-teal-300 rounded-2xl transform rotate-12 opacity-80"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl transform -rotate-6 opacity-70"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-cyan-200 to-cyan-300 rounded-2xl transform rotate-3 opacity-60"></div>
                
                {/* Small dots pattern */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                        className="w-2 h-2 bg-white rounded-full opacity-80"
                      ></motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-8 text-sm text-muted-foreground">
        <p>2025© <Link to="/" className="hover:underline">RealEstateAPI</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
