import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Shield } from "lucide-react";
import { ApiKeyCard } from "./ApiKeyCard";
import { ApiKeyScopes } from "@/components/dashboard/ApiKeyScopes";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

interface ApiKeyTabsProps {
  isTrialActive: boolean;
  trialDaysLeft: number;
}

export const ApiKeyTabs = ({ isTrialActive, trialDaysLeft }: ApiKeyTabsProps) => {
  const [publicApiKey, setPublicApiKey] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6");
  const [privateApiKey, setPrivateApiKey] = useState("****-****-****-****");
  const [isLoadingScopes, setIsLoadingScopes] = useState(true);
  const [publicKeyScopes, setPublicKeyScopes] = useState<string[]>([]);
  const [privateKeyScopes, setPrivateKeyScopes] = useState<string[]>([]);
  
  // Get isOnPaidPlan from context to determine if private keys should be restricted
  const { isOnPaidPlan } = useTrialAlert();

  useEffect(() => {
    setTimeout(() => {
      setPublicKeyScopes([
        "PropertySearch",
        "PropertyDetail",
        "PropertyComps",
        "AutoComplete",
        "PropertyParcel"
      ]);
      
      setPrivateKeyScopes([
        "PropertySearch",
        "PropertyDetail",
        "PropertyComps",
        "PropertyParcel",
        "AddressVerification",
        "AutoComplete",
        "CSVBuilder",
        "SkipTrace",
        "SkipTraceBatch"
      ]);
      
      setIsLoadingScopes(false);
    }, 1500);
  }, []);

  const handleRotatePublicKey = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." + Math.random().toString(36).substring(2, 15);
    setPublicApiKey(newKey);
  };

  const handleRotatePrivateKey = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newKey = "****-****-****-" + Math.random().toString(36).substring(2, 6).toUpperCase();
    setPrivateApiKey(newKey);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="public" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="public" className="flex items-center gap-2">
            <Eye className="h-4 w-4" /> API Keys
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="public">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <ApiKeyCard
                title="anon"
                subtitle="public"
                description="This key is safe to use in a browser if you have enabled Row Level Security for your tables and configured policies. Prefer using Secret API keys instead."
                keyValue={publicApiKey}
                icon={<Eye className="h-5 w-5 text-primary-teal" />}
                onRotateKey={handleRotatePublicKey}
                lastRequest="Last request was a minute ago."
                isPublicKey={true}
              />
              
              <ApiKeyCard
                title="service_role"
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
            </div>
            
            <ApiKeyScopes 
              scopes={publicKeyScopes}
              isLoading={isLoadingScopes}
              isTestKey={true}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
