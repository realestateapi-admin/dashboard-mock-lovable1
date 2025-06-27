
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Loader2, RefreshCw, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ApiKeyCardProps {
  title: string;
  subtitle?: string;
  description: string;
  keyValue: string;
  icon: React.ReactNode;
  isTrialActive?: boolean;
  trialDaysLeft?: number;
  onRotateKey: () => Promise<void>;
  lastRequest?: string;
  isPublicKey?: boolean;
}

export const ApiKeyCard = ({
  title,
  subtitle,
  description,
  keyValue,
  icon,
  isTrialActive,
  trialDaysLeft,
  onRotateKey,
  lastRequest,
  isPublicKey = true,
}: ApiKeyCardProps) => {
  const [isRotating, setIsRotating] = useState(false);
  const [isConfirmingRotation, setIsConfirmingRotation] = useState(false);
  const [isRevealed, setIsRevealed] = useState(isPublicKey);
  const { toast } = useToast();

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(keyValue);
    toast({
      title: "API key copied",
      description: "Your API key has been copied to clipboard.",
    });
  };

  const handleRotateKey = async () => {
    setIsRotating(true);
    try {
      await onRotateKey();
      toast({
        title: "API key rotated",
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

  const isPrivateKey = !isPublicKey;
  const displayValue = isRevealed ? keyValue : "****-****-****-****";
  
  return (
    <Card className="relative">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center gap-2 flex-1">
            <Badge variant="outline" className="text-xs font-mono">
              {title}
            </Badge>
            {subtitle && (
              <Badge 
                variant={subtitle === 'secret' ? 'destructive' : 'secondary'} 
                className="text-xs"
              >
                {subtitle}
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsConfirmingRotation(true)}
            disabled={isRotating}
            className="h-8"
          >
            {isRotating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span className="ml-1 text-xs">Rotate</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between border rounded-lg p-3 bg-muted/50">
          <div className="font-mono text-sm text-muted-foreground overflow-hidden">
            {displayValue}
          </div>
          {isPrivateKey && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsRevealed(!isRevealed)}
              className="ml-2"
            >
              {isRevealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{isRevealed ? 'Hide' : 'Reveal'}</span>
            </Button>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground">
          This is your public key.
        </p>
        
        {lastRequest && (
          <p className="text-xs text-muted-foreground">
            {lastRequest}
          </p>
        )}
        
        {isConfirmingRotation && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Confirm Key Rotation</AlertTitle>
            <AlertDescription className="space-y-4">
              <p>Rotating your {isPrivateKey ? "private" : "public"} API key will invalidate the current key. Make sure to update all your applications after rotation.</p>
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
      </CardContent>
    </Card>
  );
};
