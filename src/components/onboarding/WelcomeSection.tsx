
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import EmailVerification from "./EmailVerification";
import TrialInfoCard from "./TrialInfoCard";

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
  // Auto-advance when email is verified
  useEffect(() => {
    if (emailVerified && !isLoading) {
      // Small delay to show the verification success state
      const timer = setTimeout(() => {
        onStartTrial();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [emailVerified, isLoading, onStartTrial]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col space-y-6"
    >
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to RealEstateAPI</h1>
        <p className="text-lg text-muted-foreground">Start your 14-day free trial and explore our property data platform.</p>
      </div>
      
      {!emailVerified && userEmail && (
        <EmailVerification userEmail={userEmail} onVerify={onVerify} />
      )}
      
      <TrialInfoCard />
      
      {emailVerified && (
        <div className="text-center py-4">
          <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-md">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
            <span className="text-green-700 font-medium">Setting up your account...</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WelcomeSection;
