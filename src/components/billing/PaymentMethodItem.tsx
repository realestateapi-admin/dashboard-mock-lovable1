
import { CreditCard, Bank, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  
  const isACH = method.type === "ACH";
  
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center space-x-4">
        {isACH ? (
          <div className="bg-blue-100 p-2 rounded-full">
            <Bank className="h-5 w-5 text-blue-600" />
          </div>
        ) : (
          <div className="bg-indigo-100 p-2 rounded-full">
            <CreditCard className="h-5 w-5 text-indigo-600" />
          </div>
        )}
        
        <div>
          <div className="font-medium">
            {isACH ? (
              <>Bank Account ({method.accountType}) <span className="ml-1 text-sm text-muted-foreground">•••• {method.lastFour}</span></>
            ) : (
              <>{method.type} <span className="ml-1 text-sm text-muted-foreground">•••• {method.lastFour}</span></>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground">
            {isACH ? (
              <>Account: {method.accountName || "N/A"}</>
            ) : (
              <>Expires: {method.expiryDate}</>
            )}
            {method.isDefault && (
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                Default
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        {!method.isDefault && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onSetDefault(method.id)}
          >
            Set Default
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onRequestRemove(method.id)}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};
