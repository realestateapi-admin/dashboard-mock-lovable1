
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ACHFormProps {
  newACHMethod: {
    accountName: string;
    routingNumber: string;
    accountNumber: string;
    accountType: string;
    makeDefault: boolean;
    backupCardNumber: string;
    backupCardholderName: string;
    backupExpiry: string;
    backupCvc: string;
  };
  setNewACHMethod: React.Dispatch<React.SetStateAction<{
    accountName: string;
    routingNumber: string;
    accountNumber: string;
    accountType: string;
    makeDefault: boolean;
    backupCardNumber: string;
    backupCardholderName: string;
    backupExpiry: string;
    backupCvc: string;
  }>>;
}

export const ACHForm = ({ 
  newACHMethod, 
  setNewACHMethod 
}: ACHFormProps) => {
  return (
    <div className="grid gap-4 py-2">
      <div className="grid gap-2">
        <Label htmlFor="accountName">Account Holder Name</Label>
        <Input
          id="accountName"
          value={newACHMethod.accountName}
          onChange={(e) => setNewACHMethod({...newACHMethod, accountName: e.target.value})}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="routingNumber">Routing Number</Label>
        <Input
          id="routingNumber"
          value={newACHMethod.routingNumber}
          onChange={(e) => setNewACHMethod({...newACHMethod, routingNumber: e.target.value})}
          placeholder="123456789"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input
          id="accountNumber"
          value={newACHMethod.accountNumber}
          onChange={(e) => setNewACHMethod({...newACHMethod, accountNumber: e.target.value})}
          placeholder="•••••••••••"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="accountType">Account Type</Label>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="checking"
              value="checking"
              checked={newACHMethod.accountType === "checking"}
              onChange={() => setNewACHMethod({...newACHMethod, accountType: "checking"})}
              className="h-4 w-4 border-gray-300"
            />
            <Label htmlFor="checking" className="ml-2 text-sm font-medium">Checking</Label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="savings"
              value="savings"
              checked={newACHMethod.accountType === "savings"}
              onChange={() => setNewACHMethod({...newACHMethod, accountType: "savings"})}
              className="h-4 w-4 border-gray-300"
            />
            <Label htmlFor="savings" className="ml-2 text-sm font-medium">Savings</Label>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 pt-2">
        <input
          type="checkbox"
          id="makeDefaultACH"
          checked={newACHMethod.makeDefault}
          onChange={(e) => setNewACHMethod({...newACHMethod, makeDefault: e.target.checked})}
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="makeDefaultACH" className="text-sm font-medium">
          Make this my default payment method
        </Label>
      </div>
      <div className="p-3 mt-2 bg-muted/20 border border-muted rounded-md">
        <p className="text-sm text-muted-foreground">
          By providing your bank account information, you authorize us to debit the above account for all agreed-upon subscription charges.
        </p>
      </div>
      
      {/* Required Backup Credit Card Section for ACH */}
      <Alert className="mt-4 bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          A credit card is required as a backup payment method when using bank account
        </AlertDescription>
      </Alert>
      
      <div className="mt-2 p-4 border border-amber-200 rounded-md space-y-4">
        <h4 className="font-medium text-sm">Backup Credit Card Information</h4>
        
        <div className="grid gap-2">
          <Label htmlFor="backupCardholderName">Cardholder Name</Label>
          <Input
            id="backupCardholderName"
            value={newACHMethod.backupCardholderName}
            onChange={(e) => setNewACHMethod({...newACHMethod, backupCardholderName: e.target.value})}
            placeholder="John Smith"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="backupCardNumber">Card Number</Label>
          <Input
            id="backupCardNumber"
            value={newACHMethod.backupCardNumber}
            onChange={(e) => setNewACHMethod({...newACHMethod, backupCardNumber: e.target.value})}
            placeholder="•••• •••• •••• ••••"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="backupExpiry">Expiry Date</Label>
            <Input
              id="backupExpiry"
              value={newACHMethod.backupExpiry}
              onChange={(e) => setNewACHMethod({...newACHMethod, backupExpiry: e.target.value})}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="backupCvc">CVC</Label>
            <Input
              id="backupCvc"
              value={newACHMethod.backupCvc}
              onChange={(e) => setNewACHMethod({...newACHMethod, backupCvc: e.target.value})}
              placeholder="•••"
              type="password"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};
