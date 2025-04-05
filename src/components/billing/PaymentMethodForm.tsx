
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Building } from "lucide-react";
import { CreditCardFormSection } from "./forms/CreditCardFormSection";
import { BankAccountFormSection } from "./forms/BankAccountFormSection";
import { PaymentMethodSkeleton } from "./forms/PaymentMethodSkeleton";
import { usePaymentMethodForm } from "./hooks/usePaymentMethodForm";

interface PaymentMethodFormProps {
  isLoading?: boolean;
  creditCardInfo?: {
    cardName?: string;
    cardNumber?: string;
    expiry?: string;
    cvc?: string;
    zipCode?: string;
  } | null;
}

export const PaymentMethodForm = ({ 
  isLoading = false, 
  creditCardInfo = null
}: PaymentMethodFormProps) => {
  const {
    paymentMethod,
    setPaymentMethod,
    cardName,
    setCardName,
    cardNumber,
    setCardNumber,
    expiry,
    setExpiry,
    cvc,
    setCvc,
    zipCode,
    setZipCode
  } = usePaymentMethodForm(creditCardInfo);
  
  if (isLoading) {
    return <PaymentMethodSkeleton />;
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Payment Method</h3>
      
      <Tabs defaultValue="card" onValueChange={(value) => setPaymentMethod(value as "card" | "bank")}>
        <TabsList className="grid grid-cols-2 mb-6 bg-background relative z-10">
          <TabsTrigger value="card" className="flex items-center gap-2 data-[state=active]:bg-accent cursor-pointer">
            <CreditCard className="h-4 w-4" />
            <span>Credit Card</span>
          </TabsTrigger>
          <TabsTrigger value="bank" className="flex items-center gap-2 data-[state=active]:bg-accent cursor-pointer">
            <Building className="h-4 w-4" />
            <span>Bank Account</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="card" className="space-y-4">
          <CreditCardFormSection
            cardName={cardName}
            setCardName={setCardName}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            expiry={expiry}
            setExpiry={setExpiry}
            cvc={cvc}
            setCvc={setCvc}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </TabsContent>
        
        <TabsContent value="bank" className="space-y-4">
          <BankAccountFormSection
            cardName={cardName}
            setCardName={setCardName}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            expiry={expiry}
            setExpiry={setExpiry}
            cvc={cvc}
            setCvc={setCvc}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
