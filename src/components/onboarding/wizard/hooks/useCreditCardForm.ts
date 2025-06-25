
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { validateLuhn } from "@/utils/luhnValidation";

const formSchema = z.object({
  cardName: z.string().min(2, { message: "Name is required" }),
  cardNumber: z.string().min(16, { message: "Enter a valid card number" }).max(19).refine((value) => {
    const digits = value.replace(/\s/g, '');
    return validateLuhn(digits);
  }, { message: "Invalid card number" }),
  expiry: z.string().min(5, { message: "Enter a valid expiry date (MM/YY)" }),
  cvc: z.string().min(3, { message: "Enter a valid CVC" }).max(4),
  zipCode: z.string().min(5, { message: "Enter a valid ZIP code" }).max(10),
});

export type CreditCardFormValues = z.infer<typeof formSchema>;

interface UseCreditCardFormProps {
  updateField: (field: string, value: any) => void;
  creditCardInfo: any;
  userName?: string;
}

export const useCreditCardForm = ({ updateField, creditCardInfo, userName }: UseCreditCardFormProps) => {
  const [cardNumberError, setCardNumberError] = useState<string>("");
  
  const form = useForm<CreditCardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: creditCardInfo?.cardName || userName || "",
      cardNumber: creditCardInfo?.cardNumber || "",
      expiry: creditCardInfo?.expiry || "",
      cvc: creditCardInfo?.cvc || "",
      zipCode: creditCardInfo?.zipCode || "",
    },
  });

  const handleInputChange = (field: keyof CreditCardFormValues, value: string) => {
    // Format card number with spaces for readability
    if (field === "cardNumber") {
      value = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
      value = value.substring(0, 19); // Limit to 16 digits plus spaces
      
      // Real-time Luhn validation
      const digits = value.replace(/\s/g, '');
      if (digits.length >= 13) {
        if (!validateLuhn(digits)) {
          setCardNumberError("Invalid card number");
        } else {
          setCardNumberError("");
        }
      } else {
        setCardNumberError("");
      }
    }

    // Format expiry date with slash
    if (field === "expiry") {
      value = value.replace(/\s/g, "").replace(/[^0-9]/g, "");
      if (value.length > 2) {
        value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
      }
      value = value.substring(0, 5); // MM/YY format (5 chars total)
    }

    // Limit CVC to 3-4 digits
    if (field === "cvc") {
      value = value.replace(/[^0-9]/g, "").substring(0, 4);
    }

    // Format ZIP code
    if (field === "zipCode") {
      value = value.replace(/[^0-9-]/g, "").substring(0, 10);
    }

    form.setValue(field, value);
    const formValues = { ...form.getValues(), [field]: value };
    updateField("creditCardInfo", formValues);
  };

  // Check if all fields are filled for real-time validation
  const cardNumberDigits = form.getValues("cardNumber").replace(/\s/g, "");
  const isCardNumberValid = cardNumberDigits.length >= 16 && validateLuhn(cardNumberDigits) && !cardNumberError;
  
  const isStepValid = 
    !!form.getValues("cardName") && 
    isCardNumberValid &&
    form.getValues("expiry").length === 5 &&
    form.getValues("cvc").length >= 3 &&
    form.getValues("zipCode").length >= 5;

  return {
    form,
    handleInputChange,
    isStepValid,
    cardNumberError
  };
};
