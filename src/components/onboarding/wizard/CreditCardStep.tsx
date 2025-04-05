
import React, { useEffect } from "react";
import { useCreditCardForm } from "./hooks/useCreditCardForm";
import CreditCardSecurityBanner from "./components/CreditCardSecurityBanner";
import CreditCardFormFields from "./components/CreditCardFormFields";
import CreditCardTrustIndicators from "./components/CreditCardTrustIndicators";

interface CreditCardStepProps {
  updateField: (field: string, value: any) => void;
  creditCardInfo: any;
  userName?: string;
}

const CreditCardStep = ({ updateField, creditCardInfo, userName }: CreditCardStepProps) => {
  const secureMessage = "Your card information is only collected for identification purposes.";
  
  const { form, handleInputChange, isStepValid } = useCreditCardForm({
    updateField,
    creditCardInfo,
    userName
  });

  // Update parent component validation state when form values change
  useEffect(() => {
    if (isStepValid) {
      updateField("creditCardInfo", form.getValues());
    }
  }, [
    form.getValues("cardName"), 
    form.getValues("cardNumber"), 
    form.getValues("expiry"), 
    form.getValues("cvc"), 
    form.getValues("zipCode")
  ]);

  // Ensure credit card data is loaded on initial render
  useEffect(() => {
    if (creditCardInfo) {
      // Make sure existing values are properly reflected in the form
      form.reset({
        cardName: creditCardInfo.cardName || userName || "",
        cardNumber: creditCardInfo.cardNumber || "",
        expiry: creditCardInfo.expiry || "",
        cvc: creditCardInfo.cvc || "",
        zipCode: creditCardInfo.zipCode || ""
      });
    }
  }, [creditCardInfo]);

  return (
    <div className="space-y-6">
      {/* Security message banner */}
      <CreditCardSecurityBanner message={secureMessage} />

      {/* Credit card form fields */}
      <CreditCardFormFields form={form} handleInputChange={handleInputChange} />
      
      {/* Trust indicators */}
      <CreditCardTrustIndicators />
    </div>
  );
};

export default CreditCardStep;
