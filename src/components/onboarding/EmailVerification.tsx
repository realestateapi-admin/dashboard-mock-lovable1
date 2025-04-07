
import { useState } from "react";
import { Mail } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface EmailVerificationProps {
  userEmail: string;
  onVerify: () => void;
}

const EmailVerification = ({ userEmail, onVerify }: EmailVerificationProps) => {
  const [showVerifyDemo, setShowVerifyDemo] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleResendEmail = () => {
    toast({
      title: "Verification email sent",
      description: `We've sent another verification email to ${userEmail}`,
    });

    // For demo - show the verification button
    setShowVerifyDemo(true);
  };

  const handleDemoVerify = () => {
    // This simulates clicking the verification link in the email
    onVerify();
    toast({
      title: "Email verified successfully!",
      description: "You can now proceed with your free trial.",
    });
    
    // Navigate to the onboarding wizard instead of directly completing onboarding
    navigate("/onboarding-wizard");
  };

  return (
    <Alert className="bg-amber-50 border-amber-200">
      <Mail className="h-4 w-4 text-amber-600 mr-2" />
      <AlertDescription className="text-amber-800">
        <p className="font-medium">Please verify your email to continue</p>
        <p className="mt-1">
          We've sent a verification link to <span className="font-semibold">{userEmail}</span>. 
          Please check your inbox and click the link to verify your email.
        </p>
        <div className="mt-3 flex flex-col space-y-2">
          <button 
            onClick={handleResendEmail}
            className="text-sm text-amber-800 underline hover:text-amber-900"
          >
            Didn't receive the email? Click here to resend
          </button>
          
          {/* Demo-only verification button */}
          {showVerifyDemo && (
            <div className="mt-2 pt-2 border-t border-amber-200">
              <p className="text-xs text-amber-700 mb-2">Demo: Simulate email verification</p>
              <Button 
                onClick={handleDemoVerify}
                variant="outline" 
                className="bg-white text-amber-800 border-amber-300 hover:bg-amber-50 text-sm py-1 h-auto"
                size="sm"
              >
                Click here to verify your email
              </Button>
            </div>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default EmailVerification;
