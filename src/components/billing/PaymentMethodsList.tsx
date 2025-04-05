
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentMethod } from "./types";
import { PaymentMethodItem } from "./PaymentMethodItem";

interface PaymentMethodsListProps {
  paymentMethods: PaymentMethod[];
  onSetDefault: (id: string) => void;
  onRequestRemove: (id: string) => void;
  onAddMethod: () => void;
}

export const PaymentMethodsList = ({
  paymentMethods,
  onSetDefault,
  onRequestRemove,
  onAddMethod
}: PaymentMethodsListProps) => {
  return (
    <div className="space-y-4">
      {paymentMethods.map((method) => (
        <PaymentMethodItem
          key={method.id}
          method={method}
          onSetDefault={onSetDefault}
          onRequestRemove={onRequestRemove}
        />
      ))}
      
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2"
        onClick={onAddMethod}
      >
        <PlusCircle className="h-4 w-4" />
        Add Payment Method
      </Button>
    </div>
  );
};
