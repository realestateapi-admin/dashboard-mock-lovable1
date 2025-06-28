

import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { ApiKeyCard } from "./ApiKeyCard";
import { ApiKeyScopes } from "@/components/dashboard/ApiKeyScopes";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

interface ApiKeyTabsProps {
  isTrialActive: boolean;
  trialDaysLeft: number;
}

export const ApiKeyTabs = ({ isTrialActive, trialDaysLeft }: ApiKeyTabsProps) => {
  const [publicApiKey, setPublicApiKey] = useState("NICKPASTINICA-4d94-73b3-b651-489de24329b4");
  const [privateApiKey, setPrivateApiKey] = useState("JOHNSMITH-8f2e-41c7-9a5d-3c8b47e1f9a2");
  const [isLoadingScopes, setIsLoadingScopes] = useState(true);
  const [publicKeyScopes, setPublicKeyScopes] = useState<string[]>([]);
  const [privateKeyScopes, setPrivateKeyScopes] = useState<string[]>([]);
  
  // Get isOnPaidPlan from context to determine if private keys should be restricted
  const { isOnPaidPlan } = useTrialAlert();

  useEffect(() => {
    setTimeout(() => {
      setPublicKeyScopes([
        "Property Search",
        "Property Detail",
        "Property Comps",
        "PropGPT",
        "Address Verification",
        "Property Portfolio",
        "Property Boundary",
        "Auto Complete",
        "Skip Trace",
        "Lender Grade AVM",
        "Mapping (Pins)"
      ]);
      
      setPrivateKeyScopes([
        "Property Search",
        "Property Detail",
        "Property Comps",
        "PropGPT",
        "Address Verification",
        "Property Portfolio",
        "Property Boundary",
        "Auto Complete",
        "Skip Trace",
        "Lender Grade AVM",
        "Mapping (Pins)"
      ]);
      
      setIsLoadingScopes(false);
    }, 1500);
  }, []);

  const generateNewKey = (prefix: string) => {
    const segments = [
      Math.random().toString(16).substring(2, 6),
      Math.random().toString(16).substring(2, 6),
      Math.random().toString(16).substring(2, 6),
      Math.random().toString(16).substring(2, 14)
    ];
    return `${prefix}-${segments.join('-')}`;
  };

  const handleRotatePublicKey = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newKey = generateNewKey("NICKPASTINICA");
    setPublicApiKey(newKey);
  };

  const handleRotatePrivateKey = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newKey = generateNewKey("JOHNSMITH");
    setPrivateApiKey(newKey);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <ApiKeyCard
          title="backend"
          subtitle="secret"
          description="This key has the ability to bypass Row Level Security. Never share it publicly. If leaked, generate a new JWT secret immediately. Prefer using Publishable API keys instead."
          keyValue={privateApiKey}
          icon={<Shield className="h-5 w-5 text-red-500" />}
          isTrialActive={isTrialActive && !isOnPaidPlan}
          trialDaysLeft={trialDaysLeft}
          onRotateKey={handleRotatePrivateKey}
          lastRequest="Last request was 22 minutes ago."
          isPublicKey={false}
        />
        
        <ApiKeyCard
          title="frontend"
          subtitle="public"
          description="This key is safe to use in a browser if you have enabled Row Level Security for your tables and configured policies. Prefer using Secret API keys instead."
          keyValue={publicApiKey}
          icon={<Shield className="h-5 w-5 text-primary-teal" />}
          onRotateKey={handleRotatePublicKey}
          lastRequest="Last request was a minute ago."
          isPublicKey={true}
        />
      </div>
      
      <ApiKeyScopes 
        scopes={publicKeyScopes}
        isLoading={isLoadingScopes}
        isTestKey={true}
      />
    </div>
  );
};

