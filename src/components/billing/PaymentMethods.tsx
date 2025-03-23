
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCardIcon } from "lucide-react";

export const PaymentMethods = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>
          Manage your payment methods and billing information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-lg p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CreditCardIcon className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Visa ending in 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/2025</p>
            </div>
          </div>
          <Badge>Default</Badge>
        </div>
        
        <Button variant="outline" className="w-full">
          Add Payment Method
        </Button>
      </CardContent>
    </Card>
  );
};
