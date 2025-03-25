import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AlertCircle, Copy, Key, Loader2, RefreshCw, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { ApiKeyScopes } from "@/components/dashboard/ApiKeyScopes";

const ApiKeys = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [testApiKey, setTestApiKey] = useState("test_k6ftg5s7d8v9t3f2r1o9p8m7n6b5v4c3x2");
  const [prodApiKey, setProdApiKey] = useState("prod_j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z");
  const [isConfirmingRotation, setIsConfirmingRotation] = useState(false);
  const [xUserIdRequired, setXUserIdRequired] = useState(true);
  const [isLoadingScopes, setIsLoadingScopes] = useState(true);
  const { toast } = useToast();
  const { isTrialActive, trialDaysLeft } = useTrialAlert();

  // Example scopes for test and production keys
  const [testKeyScopes, setTestKeyScopes] = useState<string[]>([]);
  const [prodKeyScopes, setProdKeyScopes] = useState<string[]>([]);

  // Fixed: Changed useState to useEffect for running code on component mount
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
  }, []); // Empty dependency array means this effect runs once on mount

  const handleCopyApiKey = (key: string, type: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: `${type} API key copied`,
      description: "Your API key has been copied to clipboard.",
    });
  };

  const handleRotateApiKey = async (type: "test" | "production") => {
    setIsRotating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (type === "test") {
        const newKey = "test_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        setTestApiKey(newKey);
      } else {
        const newKey = "prod_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        setProdApiKey(newKey);
      }
      
      toast({
        title: `${type === "test" ? "Test" : "Production"} API key rotated`,
        description: "Your new API key has been generated. Update your applications accordingly.",
      });
      
      setIsConfirmingRotation(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to rotate API key",
        description: "Please try again or contact support if the issue persists.",
      });
    } finally {
      setIsRotating(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">API Keys</h1>
      </div>
      
      {isTrialActive && (
        <Alert className="bg-primary-teal/10 border-primary-teal">
          <AlertCircle className="h-4 w-4 text-primary-teal" />
          <AlertTitle className="text-primary-teal">Trial Mode Active</AlertTitle>
          <AlertDescription>
            You have {trialDaysLeft} days left in your trial. During this period, you can use the test API key for development.
          </AlertDescription>
        </Alert>
      )}
      
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary-teal" />
                  Test API Key
                </CardTitle>
                <CardDescription>
                  Use this key for development and testing. It provides access to test data and doesn't affect your usage limits.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-end gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="test-api-key">Test API Key</Label>
                    <div className="flex items-center">
                      <Input 
                        id="test-api-key"
                        value={testApiKey}
                        readOnly
                        className="font-mono text-sm bg-muted"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="ml-2"
                        onClick={() => handleCopyApiKey(testApiKey, "Test")}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => setIsConfirmingRotation(true)}
                    disabled={isRotating}
                  >
                    {isRotating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    Rotate Key
                  </Button>
                </div>
                
                {isConfirmingRotation && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Confirm Key Rotation</AlertTitle>
                    <AlertDescription className="space-y-4">
                      <p>Rotating your API key will invalidate the current key. Make sure to update all your applications after rotation.</p>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleRotateApiKey("test")}
                          disabled={isRotating}
                        >
                          {isRotating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                          Confirm Rotation
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsConfirmingRotation(false)}
                          disabled={isRotating}
                        >
                          Cancel
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
            
            <ApiKeyScopes 
              scopes={testKeyScopes}
              isLoading={isLoadingScopes}
              isTestKey={true}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="production">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary-teal" />
                  Production API Key
                </CardTitle>
                <CardDescription>
                  Use this key for your live applications. API calls made with this key will count towards your usage limits.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-end gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="prod-api-key">Production API Key</Label>
                    <div className="flex items-center">
                      <Input 
                        id="prod-api-key"
                        value={prodApiKey}
                        readOnly
                        className="font-mono text-sm bg-muted"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="ml-2"
                        onClick={() => handleCopyApiKey(prodApiKey, "Production")}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => setIsConfirmingRotation(true)}
                    disabled={isTrialActive || isRotating}
                  >
                    {isRotating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    Rotate Key
                  </Button>
                </div>
                
                {isConfirmingRotation && !isTrialActive && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Confirm Key Rotation</AlertTitle>
                    <AlertDescription className="space-y-4">
                      <p>Rotating your production API key will invalidate the current key. Make sure to update all your applications after rotation.</p>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleRotateApiKey("production")}
                          disabled={isRotating}
                        >
                          {isRotating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                          Confirm Rotation
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsConfirmingRotation(false)}
                          disabled={isRotating}
                        >
                          Cancel
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
                
                {isTrialActive && (
                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Trial Restriction</AlertTitle>
                    <AlertDescription>
                      Production API keys are only available after upgrading to a paid plan. You have {trialDaysLeft} days left in your trial.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
            
            <ApiKeyScopes 
              scopes={prodKeyScopes}
              isLoading={isLoadingScopes}
              isTestKey={false}
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>
            Manage how your API keys behave and set usage restrictions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="x-user-id-toggle">Require X-User-ID Header</Label>
              <p className="text-sm text-muted-foreground">
                Track behavior of your end users with a unique identifier
              </p>
            </div>
            <Switch 
              id="x-user-id-toggle" 
              checked={xUserIdRequired}
              onCheckedChange={setXUserIdRequired}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="rate-limit-toggle">Enable Rate Limiting</Label>
              <p className="text-sm text-muted-foreground">
                Protect your account by limiting API calls per minute
              </p>
            </div>
            <Switch 
              id="rate-limit-toggle" 
              defaultChecked
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="overage-toggle">Allow Overages</Label>
              <p className="text-sm text-muted-foreground">
                Continue API access after reaching your plan limits (additional charges apply)
              </p>
            </div>
            <Switch 
              id="overage-toggle" 
              defaultChecked
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save Configuration</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ApiKeys;
