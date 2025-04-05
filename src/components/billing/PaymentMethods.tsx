
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentMethodsList } from "./PaymentMethodsList";
import { AddPaymentMethodDialog } from "./AddPaymentMethodDialog";
import { RemovePaymentMethodDialog } from "./RemovePaymentMethodDialog";
import { usePaymentMethods } from "./hooks/usePaymentMethods";

export const PaymentMethods = () => {
  const {
    paymentMethods,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isRemoveDialogOpen,
    setIsRemoveDialogOpen,
    newPaymentMethod,
    setNewPaymentMethod,
    newACHMethod,
    setNewACHMethod,
    handleAddPaymentMethod,
    handleRequestRemove,
    handleRemovePaymentMethod,
    handleSetDefault
  } = usePaymentMethods();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>
          Manage your payment methods and billing information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PaymentMethodsList 
          paymentMethods={paymentMethods}
          onSetDefault={handleSetDefault}
          onRequestRemove={handleRequestRemove}
          onAddMethod={() => setIsAddDialogOpen(true)}
        />
      </CardContent>
      
      {/* Add Payment Method Dialog */}
      <AddPaymentMethodDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddPaymentMethod={handleAddPaymentMethod}
        newPaymentMethod={newPaymentMethod}
        setNewPaymentMethod={setNewPaymentMethod}
        newACHMethod={newACHMethod}
        setNewACHMethod={setNewACHMethod}
      />
      
      {/* Remove Payment Method Dialog */}
      <RemovePaymentMethodDialog
        isOpen={isRemoveDialogOpen}
        onClose={() => setIsRemoveDialogOpen(false)}
        onConfirm={handleRemovePaymentMethod}
      />
    </Card>
  );
};
