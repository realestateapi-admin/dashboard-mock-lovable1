
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmailVerification from "./EmailVerification";
import TrialInfoCard from "./TrialInfoCard";
import OnboardingSteps, { OnboardingStep } from "./OnboardingSteps";
import TrialCountdown from "./TrialCountdown";

interface WelcomeSectionProps {
  emailVerified: boolean;
  userEmail: string;
  isLoading: boolean;
  onVerify: () => void;
  onStartTrial: () => void;
}

const WelcomeSection = ({ 
  emailVerified, 
  userEmail, 
  isLoading, 
  onVerify, 
  onStartTrial 
}: WelcomeSectionProps) => {
  // Define the onboarding steps
  const steps: OnboardingStep[] = [
    { 
      name: "Create Account", 
      status: "completed" 
    },
    { 
      name: "Email Verification", 
      status: emailVerified ? "completed" : "current" 
    },
    { 
      name: "Free Trial", 
      status: emailVerified ? "current" : "upcoming" 
    },
    { 
      name: "Setup Complete", 
      status: "upcoming" 
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col space-y-6"
    >
      {/* Progress Indicator */}
      <OnboardingSteps steps={steps} />
      
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to RealEstateAPI</h1>
        <p className="text-lg text-muted-foreground">Start your 14-day free trial and explore our property data platform.</p>
      </div>
      
      {/* Trial Countdown Timer */}
      <TrialCountdown daysLeft={14} />
      
      {!emailVerified && userEmail && (
        <EmailVerification userEmail={userEmail} onVerify={onVerify} />
      )}
      
      <TrialInfoCard />
      
      <Button
        onClick={onStartTrial}
        className="w-full bg-[#04c8c8] hover:bg-[#04c8c8]/90 mt-2"
        disabled={isLoading || !emailVerified}
        size="lg"
      >
        {isLoading ? (
          "Setting up your account..."
        ) : !emailVerified ? (
          "Verify your email to continue"
        ) : (
          <>
            Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </motion.div>
  );
};

export default WelcomeSection;
