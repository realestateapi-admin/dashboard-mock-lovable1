
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Copy, ExternalLink, Code, Check } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface ApiAccessSectionProps {
  isTrialActive: boolean;
  isLoading?: boolean;
}

export const ApiAccessSection = ({ isTrialActive, isLoading = false }: ApiAccessSectionProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyAPIKey = () => {
    navigator.clipboard.writeText("test_k6ftg5s7d8v9t3f2r1o9p8m7n6b5v4c3x2");
    setCopied(true);
    
    toast({
      title: "API key copied",
      description: "Your API key has been copied to the clipboard.",
    });
    
    // Reset copy state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>API Access</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">Your API key should be kept confidential. Use this key to authenticate your API requests.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>
          Use these credentials to authenticate your API requests
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="h-10 w-full" />
            <div className="flex justify-end">
              <Skeleton className="h-8 w-32" />
            </div>
            <div className="pt-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-10 w-full mt-2" />
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">API Key</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 gap-1 text-xs"
                  onClick={handleCopyAPIKey}
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <div className="flex h-10 items-center rounded-md border bg-muted px-4 text-sm font-mono overflow-x-auto">
                {isTrialActive ? "test_" : "prod_"}k6ftg5s7d8v9t3f2r1o9p8m7n6b5v4c3x2
              </div>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  asChild
                >
                  <Link to="/dashboard/api-keys">
                    Manage API Keys
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Documentation</Label>
              <Button variant="outline" className="w-full justify-start text-sm group" asChild>
                <a href="https://developer.realestateapi.com/reference/welcome-to-realestateapi" target="_blank" rel="noopener noreferrer">
                  <Code className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                  View API Documentation
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

// Label component
function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  );
}
