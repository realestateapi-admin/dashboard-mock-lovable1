
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Loader2, RefreshCw, Key, Shield, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ApiKeyCardProps {
  title: string;
  description: string;
  keyValue: string;
  icon: React.ReactNode;
  isTrialActive?: boolean;
  trialDaysLeft?: number;
  onRotateKey: () => Promise<void>;
}

export const ApiKeyCard = ({
  title,
  description,
  keyValue,
  icon,
  isTrialActive,
  trialDaysLeft,
  onRotateKey,
}: ApiKeyCardProps) => {
  const [isRotating, setIsRotating] = useState(false);
  const [isConfirmingRotation, setIsConfirmingRotation] = useState(false);
  const { toast } = useToast();

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(keyValue);
    toast({
      title: `${title} copied`,
      description: "Your API key has been copied to clipboard.",
    });
  };

  const handleRotateKey = async () => {
    setIsRotating(true);
    try {
      await onRotateKey();
      toast({
        title: `${title} rotated`,
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

  const isProdKey = title.toLowerCase().includes('production');
  // Only restrict if it's a production key AND trial is active (not on paid plan)
  const isRestricted = isProdKey && isTrialActive;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-4">
          <div className="space-y-2 flex-1">
            <Label htmlFor={`${title.toLowerCase().replace(' ', '-')}-api-key`}>
              {title}
            </Label>
            <div className="flex items-center">
              <Input 
                id={`${title.toLowerCase().replace(' ', '-')}-api-key`}
                value={keyValue}
                readOnly
                className="font-mono text-sm bg-muted"
              />
              <Button 
                variant="ghost" 
                size="icon"
                className="ml-2"
                onClick={handleCopyApiKey}
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
            disabled={isRestricted || isRotating}
          >
            {isRotating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Rotate Key
          </Button>
        </div>
        
        {isConfirmingRotation && !isRestricted && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Confirm Key Rotation</AlertTitle>
            <AlertDescription className="space-y-4">
              <p>Rotating your {isProdKey ? "production" : "test"} API key will invalidate the current key. Make sure to update all your applications after rotation.</p>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  onClick={handleRotateKey}
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
        
        {isRestricted && (
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
  );
};
