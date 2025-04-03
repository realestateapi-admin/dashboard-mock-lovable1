
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Code } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const ApiDocumentationTab = () => {
  const handleOpenApiDocs = () => {
    window.open('https://developer.realestateapi.com/reference/welcome-to-realestateapi', '_blank');
  };

  const handleOpenPostmanCollection = () => {
    window.open('https://www.postman.com/realestateapis', '_blank');
  };

  return (
    <div className="space-y-6">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[500px] rounded-lg border"
      >
        {/* Left panel - API Documentation */}
        <ResizablePanel defaultSize={50}>
          <Card className="rounded-none h-full border-0">
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
        </ResizablePanel>

        {/* Resize handle */}
        <ResizableHandle withHandle />

        {/* Right panel - Postman Collections */}
        <ResizablePanel defaultSize={50}>
          <Card className="rounded-none h-full border-0">
            <CardHeader>
              <CardTitle>Postman Collections</CardTitle>
              <CardDescription>
                Test our APIs interactively with ready-to-use Postman collections
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center p-6">
              <Code className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Testing</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Explore and test our APIs using Postman collections. Perfect for developers who want 
                to understand request/response patterns and experiment with different parameters.
              </p>
              <Button 
                onClick={handleOpenPostmanCollection}
                className="gap-2"
                size="lg"
              >
                View Postman Collections
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ApiDocumentationTab;
