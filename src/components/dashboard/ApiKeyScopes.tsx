
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
  // All available scopes from the database
  const allAvailableScopes = [
    "PropertyDetail",
    "PropertySearch",
    "PropertySearch:Summary",
    "PropertyComps",
    "PropertyParcel",
    "AddressVerification",
    "AutoComplete",
    "CSVBuilder",
    "SkipTrace",
    "SkipTraceBatch"
  ];

  // Get human-readable descriptions for each scope
  const getScopeDescription = (scope: string) => {
    switch(scope) {
      case "PropertyDetail":
        return "Access detailed property information";
      case "PropertySearch":
        return "Search for properties with various criteria";
      case "PropertySearch:Summary":
        return "Get property search results in summary format";
      case "PropertyComps":
        return "Access comparable properties data";
      case "PropertyParcel":
        return "Access property parcel information";
      case "AddressVerification":
        return "Verify and standardize addresses";
      case "AutoComplete":
        return "Use address auto-completion";
      case "CSVBuilder":
        return "Export data to CSV format";
      case "SkipTrace":
        return "Perform individual skip trace lookups";
      case "SkipTraceBatch":
        return "Perform batch skip trace operations";
      default:
        return "Additional API functionality";
    }
  };

  // Check if a scope is enabled for the current key
  const isScopeEnabled = (scope: string) => {
    return scopes.includes(scope);
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
                      <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200 flex gap-1 items-center">
                        <XCircle className="h-3.5 w-3.5" />
                        Disabled
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
