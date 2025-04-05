
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CreditCardFormProps {
  newPaymentMethod: {
    cardNumber: string;
    cardholderName: string;
    expiry: string;
    cvc: string;
    makeDefault: boolean;
  };
  setNewPaymentMethod: React.Dispatch<React.SetStateAction<{
    cardNumber: string;
    cardholderName: string;
    expiry: string;
    cvc: string;
    makeDefault: boolean;
  }>>;
}

export const CreditCardForm = ({ 
  newPaymentMethod, 
  setNewPaymentMethod 
}: CreditCardFormProps) => {
  return (
    <div className="grid gap-4 py-2">
      <div className="grid gap-2">
        <Label htmlFor="cardholderName">Cardholder Name</Label>
        <Input
          id="cardholderName"
          value={newPaymentMethod.cardholderName}
          onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardholderName: e.target.value})}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          value={newPaymentMethod.cardNumber}
          onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardNumber: e.target.value})}
          placeholder="•••• •••• •••• ••••"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            value={newPaymentMethod.expiry}
            onChange={(e) => setNewPaymentMethod({...newPaymentMethod, expiry: e.target.value})}
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input
            id="cvc"
            value={newPaymentMethod.cvc}
            onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cvc: e.target.value})}
            placeholder="•••"
            required
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 pt-2">
        <input
          type="checkbox"
          id="makeDefaultCard"
          checked={newPaymentMethod.makeDefault}
          onChange={(e) => setNewPaymentMethod({...newPaymentMethod, makeDefault: e.target.checked})}
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="makeDefaultCard" className="text-sm font-medium">
          Make this my default payment method
        </Label>
      </div>
    </div>
  );
};
