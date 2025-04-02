
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Building2, Phone } from "lucide-react";

interface EnterpriseCompactCardProps {
  onSelectEnterprise: () => void;
}

export const EnterpriseCompactCard = ({
  onSelectEnterprise
}: EnterpriseCompactCardProps) => {
  return (
    <Card className="border border-primary/40 bg-primary/5 mt-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Enterprise Solution</h3>
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
            <span className="text-sm">Dedicated Support</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
            <span className="text-sm">Custom Development</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
            <span className="text-sm">SLA Guarantees</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          className="w-full border-primary text-primary hover:bg-primary/10 mt-2"
          onClick={onSelectEnterprise}
        >
          <Phone className="h-3 w-3 mr-1" />
          Contact Sales
        </Button>
      </CardContent>
    </Card>
  );
};
