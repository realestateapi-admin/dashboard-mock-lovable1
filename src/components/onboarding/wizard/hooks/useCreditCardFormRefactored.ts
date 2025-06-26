
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { validateLuhn } from "@/utils/luhnValidation";
import { validateExpiryDate, validateCardNumber } from "./utils/creditCardValidation";
import { formatCardNumber, formatExpiryDate, formatCvc, formatZipCode } from "./utils/creditCardFormatting";
import { useCreditCardDisplay } from "./utils/useCreditCardDisplay";

const formSchema = z.object({
  cardName: z.string().min(2, { message: "Name is required" }),
  cardNumber: z.string().min(16, { message: "Enter a valid card number" }).max(19).refine((value) => {
    const digits = value.replace(/\s/g, '');
    return validateLuhn(digits);
  }, { message: "Invalid card number" }),
  expiry: z.string().min(5, { message: "Enter a valid expiry date (MM/YY)" }).refine((value) => {
    if (value.length !== 5) return true; // Don't validate incomplete dates
    
    const [month, year] = value.split('/');
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(`20${year}`, 10);
    
    // Check if month is valid
    if (monthNum < 1 || monthNum > 12) return false;
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    // Check if the expiry date is in the future
    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      return false;
    }
    
    return true;
  }, { message: "Expiry date must be in the future" }),
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
  const [expiryError, setExpiryError] = useState<string>("");
  
  const {
    cvcMasked,
    displayCvc,
    cardNumberMasked,
    displayCardNumber,
    updateCvcDisplay,
    updateCardNumberDisplay,
    initializeDisplayFromExistingData
  } = useCreditCardDisplay();
  
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
    if (field === "cardNumber") {
      value = formatCardNumber(value);
      updateCardNumberDisplay(value);
      
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

    if (field === "expiry") {
      value = formatExpiryDate(value);
      
      // Validate expiry date
      if (value.length === 5) {
        if (!validateExpiryDate(value)) {
          setExpiryError("Expiry date must be in the future");
        } else {
          setExpiryError("");
        }
      } else {
        setExpiryError("");
      }
    }

    if (field === "cvc") {
      value = formatCvc(value);
      updateCvcDisplay(value);
    }

    if (field === "zipCode") {
      value = formatZipCode(value);
    }

    form.setValue(field, value);
    const formValues = { ...form.getValues(), [field]: value };
    updateField("creditCardInfo", formValues);
  };

  // Initialize display values from existing data (when returning to page)
  useEffect(() => {
    const currentCvc = form.getValues("cvc");
    const currentCardNumber = form.getValues("cardNumber");
    const currentExpiry = form.getValues("expiry");
    
    initializeDisplayFromExistingData(currentCardNumber, currentCvc);
    
    // Validate existing expiry date
    if (currentExpiry && currentExpiry.length === 5) {
      if (!validateExpiryDate(currentExpiry)) {
        setExpiryError("Expiry date must be in the future");
      }
    }
  }, []);

  // Check if all fields are filled for real-time validation
  const cardNumberDigits = form.getValues("cardNumber").replace(/\s/g, "");
  const isCardNumberValid = cardNumberDigits.length >= 16 && validateCardNumber(cardNumberDigits) && !cardNumberError;
  const isExpiryValid = form.getValues("expiry").length === 5 && !expiryError;
  
  const isStepValid = 
    !!form.getValues("cardName") && 
    isCardNumberValid &&
    isExpiryValid &&
    form.getValues("cvc").length >= 3 &&
    form.getValues("zipCode").length >= 5;

  return {
    form,
    handleInputChange,
    isStepValid,
    cardNumberError,
    expiryError,
    displayCvc,
    cvcMasked,
    displayCardNumber,
    cardNumberMasked
  };
};
