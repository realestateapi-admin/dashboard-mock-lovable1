
import { CreditCardIcon, Building, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PaymentMethod } from "./types";

interface PaymentMethodItemProps {
  method: PaymentMethod;
  onSetDefault: (id: string) => void;
  onRequestRemove: (id: string) => void;
}

export const PaymentMethodItem = ({ 
  method, 
  onSetDefault, 
  onRequestRemove 
}: PaymentMethodItemProps) => {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        {method.type === "ACH" ? (
          <Building className="h-5 w-5 text-primary" />
        ) : (
          <CreditCardIcon className="h-5 w-5 text-primary" />
        )}
        <div>
          <p className="font-medium">{method.type} ending in {method.lastFour}</p>
          <p className="text-sm text-muted-foreground">
            {method.type === "ACH" ? "Bank Account" : `Expires ${method.expiryDate}`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {method.isDefault ? (
          <Badge>Default</Badge>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onSetDefault(method.id)}
          >
            Set Default
          </Button>
        )}
        {!method.isDefault && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-destructive"
            onClick={() => onRequestRemove(method.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
