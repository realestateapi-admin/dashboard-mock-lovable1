
import { usePaymentMethodState } from "./usePaymentMethodState";
import { usePaymentMethodOperations } from "./usePaymentMethodOperations";
import { useAddPaymentMethod } from "./useAddPaymentMethod";

export const usePaymentMethods = () => {
  const {
    paymentMethods,
    setPaymentMethods,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isRemoveDialogOpen,
    setIsRemoveDialogOpen,
    methodToRemove,
    setMethodToRemove,
    newPaymentMethod,
    setNewPaymentMethod,
    newACHMethod,
    setNewACHMethod
  } = usePaymentMethodState();

  const {
    handleRemovePaymentMethod,
    handleSetDefault,
    handleRequestRemove
  } = usePaymentMethodOperations(
    paymentMethods,
    setPaymentMethods,
    setIsRemoveDialogOpen,
    setMethodToRemove
  );

  const { handleAddPaymentMethod: addPaymentMethod } = useAddPaymentMethod(
    paymentMethods,
    setPaymentMethods,
    setIsAddDialogOpen,
    setNewPaymentMethod,
    setNewACHMethod
  );
  
  // Wrapper function to match the expected API signature
  const handleAddPaymentMethod = (type: "card" | "ach") => {
    addPaymentMethod(type, newPaymentMethod, newACHMethod);
  };

  return {
    paymentMethods,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isRemoveDialogOpen,
    setIsRemoveDialogOpen,
    methodToRemove,
    newPaymentMethod,
    setNewPaymentMethod,
    newACHMethod,
    setNewACHMethod,
    handleAddPaymentMethod,
    handleRequestRemove,
    handleRemovePaymentMethod: () => handleRemovePaymentMethod(methodToRemove),
    handleSetDefault
  };
};
