
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";

const ApiDocumentationTab = () => {
  const handleOpenApiDocs = () => {
    window.open('https://developer.realestateapi.com/reference/welcome-to-realestateapi', '_blank');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>
            Access our comprehensive developer documentation for the RealEstateAPI
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center p-6">
          <FileText className="h-16 w-16 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Developer Documentation</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Our detailed API reference provides comprehensive information about endpoints, 
            parameters, responses, and code examples to help you integrate with RealEstateAPI.
          </p>
          <Button 
            onClick={handleOpenApiDocs}
            className="gap-2"
            size="lg"
          >
            View API Documentation
            <ExternalLink className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiDocumentationTab;
