
import { useState, useEffect, useRef } from "react";
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
  const [cvcMasked, setCvcMasked] = useState<boolean>(false);
  const [displayCvc, setDisplayCvc] = useState<string>("");
  const [cardNumberMasked, setCardNumberMasked] = useState<boolean>(false);
  const [displayCardNumber, setDisplayCardNumber] = useState<string>("");
  const cvcTimerRef = useRef<NodeJS.Timeout | null>(null);
  
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

  const validateExpiryDate = (value: string): boolean => {
    if (value.length !== 5) return true; // Don't validate incomplete dates
    
    const [month, year] = value.split('/');
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(`20${year}`, 10);
    
    // Check if month is valid
    if (monthNum < 1 || monthNum > 12) return false;
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11
    
    // Check if the expiry date is in the future
    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      return false;
    }
    
    return true;
  };

  const handleInputChange = (field: keyof CreditCardFormValues, value: string) => {
    // Format card number with spaces for readability
    if (field === "cardNumber") {
      // Remove all non-digit characters first
      value = value.replace(/\D/g, "");
      // Add spaces every 4 digits
      value = value.replace(/(.{4})/g, "$1 ").trim();
      // Limit to 16 digits plus spaces (19 characters total)
      value = value.substring(0, 19);
      
      // Show the actual value while typing and unmask
      setDisplayCardNumber(value);
      setCardNumberMasked(false);
      
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

    // Format expiry date with slash and validate
    if (field === "expiry") {
      value = value.replace(/\s/g, "").replace(/[^0-9]/g, "");
      if (value.length > 2) {
        value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
      }
      value = value.substring(0, 5); // MM/YY format (5 chars total)
      
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

    // Handle CVC with timed masking (only after 3+ digits)
    if (field === "cvc") {
      value = value.replace(/[^0-9]/g, "").substring(0, 4);
      
      // Show the actual value while typing
      setDisplayCvc(value);
      setCvcMasked(false);
      
      // Clear existing timer
      if (cvcTimerRef.current) {
        clearTimeout(cvcTimerRef.current);
      }
      
      // Only set timer to mask if 3 or more digits are entered
      if (value.length >= 3) {
        cvcTimerRef.current = setTimeout(() => {
          setCvcMasked(true);
          setDisplayCvc("•".repeat(value.length));
        }, 2000);
      }
    }

    // Format ZIP code
    if (field === "zipCode") {
      value = value.replace(/[^0-9-]/g, "").substring(0, 10);
    }

    form.setValue(field, value);
    const formValues = { ...form.getValues(), [field]: value };
    updateField("creditCardInfo", formValues);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (cvcTimerRef.current) {
        clearTimeout(cvcTimerRef.current);
      }
    };
  }, []);

  // Initialize display values from existing data (when returning to page)
  useEffect(() => {
    const currentCvc = form.getValues("cvc");
    const currentCardNumber = form.getValues("cardNumber");
    const currentExpiry = form.getValues("expiry");
    
    if (currentCvc) {
      setDisplayCvc("•".repeat(currentCvc.length));
      setCvcMasked(true);
    }
    
    if (currentCardNumber) {
      // Mask all but last 4 digits when returning to page
      const digits = currentCardNumber.replace(/\s/g, '');
      if (digits.length >= 4) {
        const lastFour = digits.slice(-4);
        const maskedPortion = "•".repeat(digits.length - 4);
        const maskedCardNumber = (maskedPortion + lastFour).replace(/(.{4})/g, "$1 ").trim();
        setDisplayCardNumber(maskedCardNumber);
        setCardNumberMasked(true);
      } else {
        setDisplayCardNumber(currentCardNumber);
        setCardNumberMasked(false);
      }
    }
    
    // Validate existing expiry date
    if (currentExpiry && currentExpiry.length === 5) {
      if (!validateExpiryDate(currentExpiry)) {
        setExpiryError("Expiry date must be in the future");
      }
    }
  }, []);

  // Check if all fields are filled for real-time validation
  const cardNumberDigits = form.getValues("cardNumber").replace(/\s/g, "");
  const isCardNumberValid = cardNumberDigits.length >= 16 && validateLuhn(cardNumberDigits) && !cardNumberError;
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
