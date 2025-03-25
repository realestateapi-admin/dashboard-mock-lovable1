
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, Shield } from "lucide-react";
import { ApiKeyCard } from "./ApiKeyCard";
import { ApiKeyScopes } from "@/components/dashboard/ApiKeyScopes";

interface ApiKeyTabsProps {
  isTrialActive: boolean;
  trialDaysLeft: number;
}

export const ApiKeyTabs = ({ isTrialActive, trialDaysLeft }: ApiKeyTabsProps) => {
  const [testApiKey, setTestApiKey] = useState("test_k6ftg5s7d8v9t3f2r1o9p8m7n6b5v4c3x2");
  const [prodApiKey, setProdApiKey] = useState("prod_j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z");
  const [isLoadingScopes, setIsLoadingScopes] = useState(true);
  const [testKeyScopes, setTestKeyScopes] = useState<string[]>([]);
  const [prodKeyScopes, setProdKeyScopes] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setTestKeyScopes([
        "PropertySearch",
        "PropertyDetail",
        "PropertyComps",
        "AutoComplete",
        "PropertyParcel"
      ]);
      
      setProdKeyScopes([
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

  const handleRotateTestKey = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newKey = "test_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setTestApiKey(newKey);
  };

  const handleRotateProductionKey = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newKey = "prod_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setProdApiKey(newKey);
  };

  return (
    <Tabs defaultValue="test" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="test" className="flex items-center gap-2">
          <Key className="h-4 w-4" /> Test Keys
        </TabsTrigger>
        <TabsTrigger value="production" className="flex items-center gap-2">
          <Shield className="h-4 w-4" /> Production Keys
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="test">
        <div className="grid gap-6 md:grid-cols-2">
          <ApiKeyCard
            title="Test API Key"
            description="Use this key for development and testing. It provides access to test data and doesn't affect your usage limits."
            keyValue={testApiKey}
            icon={<Key className="h-5 w-5 text-primary-teal" />}
            onRotateKey={handleRotateTestKey}
          />
          
          <ApiKeyScopes 
            scopes={testKeyScopes}
            isLoading={isLoadingScopes}
            isTestKey={true}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="production">
        <div className="grid gap-6 md:grid-cols-2">
          <ApiKeyCard
            title="Production API Key"
            description="Use this key for your live applications. API calls made with this key will count towards your usage limits."
            keyValue={prodApiKey}
            icon={<Shield className="h-5 w-5 text-primary-teal" />}
            isTrialActive={isTrialActive}
            trialDaysLeft={trialDaysLeft}
            onRotateKey={handleRotateProductionKey}
          />
          
          <ApiKeyScopes 
            scopes={prodKeyScopes}
            isLoading={isLoadingScopes}
            isTestKey={false}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};
