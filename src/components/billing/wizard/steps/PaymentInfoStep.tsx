
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
  
  const handleCardInfoChange = (field: string, value: string) => {
    updateFormData('cardInfo', { ...formData.cardInfo, [field]: value });
  };
  
  const handleACHInfoChange = (field: string, value: string) => {
    updateFormData('achInfo', { ...formData.achInfo, [field]: value });
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
                onCardChange={(field, value) => handleCardInfoChange(field, value)} 
                cardData={formData.cardInfo}
              />
            </TabsContent>
            
            <TabsContent value="ach">
              <ACHForm 
                onACHChange={(field, value) => handleACHInfoChange(field, value)}
                achData={formData.achInfo}
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
