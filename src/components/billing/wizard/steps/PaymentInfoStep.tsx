
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCardForm } from "@/components/billing/CreditCardForm";
import { ACHForm } from "@/components/billing/ACHForm";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, Building } from "lucide-react";

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
    setNewPaymentMethod(newCardData);
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
    setNewACHMethod(newACHData);
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
              <TabsTrigger value="card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Credit Card
              </TabsTrigger>
              <TabsTrigger value="ach" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Bank Account (ACH)
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="card">
              <CreditCardForm 
                newPaymentMethod={newPaymentMethod}
                setNewPaymentMethod={handleCreditCardChange}
              />
            </TabsContent>
            
            <TabsContent value="ach">
              <ACHForm 
                newACHMethod={newACHMethod}
                setNewACHMethod={handleACHChange}
                showBackupCardSection={true}
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
