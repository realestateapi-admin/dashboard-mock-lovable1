
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import TermsOfServiceModal from "@/components/modals/TermsOfServiceModal";
import { AlertCircle, CheckCircle } from "lucide-react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
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
    
    // Simulate account creation
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, we would create the user account here
      // and associate the Solutions Engineer with the user account
      
      const userMetadata = {
        name,
        email,
        solutionsEngineer: {
          id: "alex-grant",
          name: "Alex Grant",
          email: "alex@realestateapi.com",
          calendly: "https://calendly.com/alex-reapi",
        }
      };
      
      console.log("User registered with metadata:", userMetadata);
      
      // Save the email, name, and default selected plan in sessionStorage
      sessionStorage.setItem("userEmail", email);
      sessionStorage.setItem("userName", name);
      // Set a default plan - normally this would come from the sign-up flow
      sessionStorage.setItem("selectedPlan", "growth");
      
      // Mock registration - in a real app, create the account here
      toast({
        title: "Account created successfully",
        description: "Please check your email to verify your account.",
      });
      
      navigate("/onboarding");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please check your information and try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Start your 14-day free trial today
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="input-with-focus-ring"
              autoComplete="name"
            />
          </div>
          
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
              autoComplete="new-password"
            />
            <p className="text-xs text-muted-foreground">
              Must be at least 8 characters long
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm font-normal">
              I agree to the{" "}
              <button 
                type="button"
                onClick={() => setShowTermsModal(true)} 
                className="text-primary hover:underline underline-offset-4"
              >
                Terms of Service
              </button>
              {" "}and{" "}
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="text-primary hover:underline underline-offset-4"
              >
                Privacy Policy
              </button>
            </Label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !isEmailValid}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
        
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link 
              to="/sign-in" 
              className="text-primary hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Terms of Service Modal */}
      <TermsOfServiceModal 
        isOpen={showTermsModal} 
        onOpenChange={setShowTermsModal} 
      />

      {/* Privacy Policy Modal */}
      <TermsOfServiceModal 
        isOpen={showPrivacyModal} 
        onOpenChange={setShowPrivacyModal}
        isPrivacyPolicy={true}
      />
    </AuthLayout>
  );
};

export default SignUp;
