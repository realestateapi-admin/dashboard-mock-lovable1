
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ApiKeyScopesProps {
  scopes: string[];
  isLoading?: boolean;
  isTestKey?: boolean;
}

export const ApiKeyScopes = ({ 
  scopes = [], 
  isLoading = false,
  isTestKey = true
}: ApiKeyScopesProps) => {
  // All available scopes from the updated list
  const allAvailableScopes = [
    "Property Search",
    "Property Detail",
    "Property Detail Bulk",
    "Property Comps",
    "CSV Generator",
    "PropGPT",
    "Address Verification",
    "Property Portfolio",
    "Property Boundary",
    "Auto Complete",
    "Skip Trace",
    "Bulk Skip Trace Await",
    "Bulk Skip Trace",
    "Lender Grade AVM",
    "Bulk Lender grade AVM",
    "Involuntary Liens",
    "Mapping (Pins)",
    "MLS Search",
    "MLS Detail"
  ];

  // Get human-readable descriptions for each scope
  const getScopeDescription = (scope: string) => {
    switch(scope) {
      case "Property Search":
        return "Search for properties with various criteria";
      case "Property Detail":
        return "Access detailed property information";
      case "Property Detail Bulk":
        return "Access detailed property information in bulk";
      case "Property Comps":
        return "Access comparable properties data";
      case "CSV Generator":
        return "Export data to CSV format";
      case "PropGPT":
        return "AI-powered property insights and analysis";
      case "Address Verification":
        return "Verify and standardize addresses";
      case "Property Portfolio":
        return "Manage and analyze property portfolios";
      case "Property Boundary":
        return "Access property boundary information";
      case "Auto Complete":
        return "Use address auto-completion";
      case "Skip Trace":
        return "Perform individual skip trace lookups";
      case "Bulk Skip Trace Await":
        return "Perform bulk skip trace operations with await";
      case "Bulk Skip Trace":
        return "Perform batch skip trace operations";
      case "Lender Grade AVM":
        return "Access automated valuation model for lending";
      case "Bulk Lender grade AVM":
        return "Access bulk automated valuation model for lending";
      case "Involuntary Liens":
        return "Access involuntary lien information";
      case "Mapping (Pins)":
        return "Access mapping and pin location services";
      case "MLS Search":
        return "Search MLS listings";
      case "MLS Detail":
        return "Access detailed MLS listing information";
      default:
        return "Additional API functionality";
    }
  };

  // Check if a scope is enabled for the current key
  const isScopeEnabled = (scope: string) => {
    return scopes.includes(scope);
  };

  // Get tooltip message for disabled endpoints
  const getDisabledTooltipMessage = () => {
    return isTestKey 
      ? "Not available for trial. Update to pay plan to gain access"
      : "Not available for your plan. Please upgrade to gain access";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Key Scope</CardTitle>
        <CardDescription>
          {isTestKey 
            ? "Available endpoints for your API key" 
            : "Available endpoints for your production API key"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        ) : (
          <TooltipProvider>
            <div className="space-y-4">
              {allAvailableScopes.map((scope) => {
                const enabled = isScopeEnabled(scope);
                return (
                  <div key={scope} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{scope}</p>
                      <p className="text-sm text-muted-foreground">{getScopeDescription(scope)}</p>
                    </div>
                    <div className="flex items-center">
                      {enabled ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex gap-1 items-center">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Enabled
                        </Badge>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200 flex gap-1 items-center">
                              <XCircle className="h-3.5 w-3.5" />
                              Disabled
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{getDisabledTooltipMessage()}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </TooltipProvider>
        )}
      </CardContent>
    </Card>
  );
};
