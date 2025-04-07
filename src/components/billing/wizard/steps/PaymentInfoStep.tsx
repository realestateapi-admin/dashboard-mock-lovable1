
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCardForm } from "@/components/billing/CreditCardForm";
import { ACHForm } from "@/components/billing/ACHForm";
import { Skeleton } from "@/components/ui/skeleton";

interface PaymentInfoStepProps {
  paymentMethod: 'card' | 'ach';
  onPaymentMethodChange: (method: 'card' | 'ach') => void;
  formData: any;
  updateFormData: (field: string, value: any) => void;
  isLoading: boolean;
}

export const PaymentInfoStep = ({
  paymentMethod,
  onPaymentMethodChange,
  formData,
  updateFormData,
  isLoading
}: PaymentInfoStepProps) => {
  // Create state for credit card form
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: formData.cardInfo?.number || '',
    cardholderName: formData.cardInfo?.name || '',
    expiry: formData.cardInfo?.expiry || '',
    cvc: formData.cardInfo?.cvc || '',
    makeDefault: formData.cardInfo?.makeDefault || false
  });
  
  // Create state for ACH form
  const [newACHMethod, setNewACHMethod] = useState({
    accountName: formData.achInfo?.accountName || '',
    routingNumber: formData.achInfo?.routingNumber || '',
    accountNumber: formData.achInfo?.accountNumber || '',
    accountType: formData.achInfo?.accountType || 'checking',
    makeDefault: formData.achInfo?.makeDefault || false,
    backupCardNumber: formData.achInfo?.backupCardNumber || '',
    backupCardholderName: formData.achInfo?.backupCardholderName || '',
    backupExpiry: formData.achInfo?.backupExpiry || '',
    backupCvc: formData.achInfo?.backupCvc || ''
  });
  
  // Update form data when credit card info changes
  const handleCreditCardChange = (newCardData: any) => {
    updateFormData('cardInfo', {
      number: newCardData.cardNumber,
      name: newCardData.cardholderName,
      expiry: newCardData.expiry,
      cvc: newCardData.cvc,
      makeDefault: newCardData.makeDefault
    });
  };
  
  // Update form data when ACH info changes
  const handleACHChange = (newACHData: any) => {
    updateFormData('achInfo', {
      accountName: newACHData.accountName,
      routingNumber: newACHData.routingNumber,
      accountNumber: newACHData.accountNumber,
      accountType: newACHData.accountType,
      makeDefault: newACHData.makeDefault,
      backupCardNumber: newACHData.backupCardNumber,
      backupCardholderName: newACHData.backupCardholderName,
      backupExpiry: newACHData.backupExpiry,
      backupCvc: newACHData.backupCvc
    });
  };
  
  // Watch for changes to newPaymentMethod and update form data
  const handleNewPaymentMethodChange = (updatedPaymentMethod: any) => {
    setNewPaymentMethod(updatedPaymentMethod);
    handleCreditCardChange(updatedPaymentMethod);
  };
  
  // Watch for changes to newACHMethod and update form data
  const handleNewACHMethodChange = (updatedACHMethod: any) => {
    setNewACHMethod(updatedACHMethod);
    handleACHChange(updatedACHMethod);
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-10 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Payment Information</h3>
        <p className="text-muted-foreground">
          Select your preferred payment method and enter your details.
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <Tabs 
            defaultValue={paymentMethod} 
            onValueChange={(value) => onPaymentMethodChange(value as 'card' | 'ach')}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="card">Credit Card</TabsTrigger>
              <TabsTrigger value="ach">Bank Account (ACH)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="card">
              <CreditCardForm 
                newPaymentMethod={newPaymentMethod}
                setNewPaymentMethod={handleNewPaymentMethodChange}
              />
            </TabsContent>
            
            <TabsContent value="ach">
              <ACHForm 
                newACHMethod={newACHMethod}
                setNewACHMethod={handleNewACHMethodChange}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
        <p className="text-sm text-blue-700">
          <span className="font-medium">Security Notice:</span> All payment information is securely processed and encrypted. We never store your complete card details on our servers.
        </p>
      </div>
    </div>
  );
};
