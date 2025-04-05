
import { useState, useEffect } from "react";

interface CreditCardInfo {
  cardName?: string;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
  zipCode?: string;
}

export const usePaymentMethodForm = (initialCreditCardInfo: CreditCardInfo | null = null) => {
  // State for payment method type
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");
  
  // State for credit card form fields
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [zipCode, setZipCode] = useState("");
  
  // Pre-fill form with creditCardInfo if provided
  useEffect(() => {
    if (initialCreditCardInfo) {
      setCardName(initialCreditCardInfo.cardName || "");
      setCardNumber(initialCreditCardInfo.cardNumber || "");
      setExpiry(initialCreditCardInfo.expiry || "");
      setCvc(initialCreditCardInfo.cvc || "");
      setZipCode(initialCreditCardInfo.zipCode || "");
    } else {
      // Try to get stored credit card info from localStorage
      const storedCreditCardInfo = localStorage.getItem("creditCardInfo");
      if (storedCreditCardInfo) {
        try {
          const parsedInfo = JSON.parse(storedCreditCardInfo);
          setCardName(parsedInfo.cardName || "");
          setCardNumber(parsedInfo.cardNumber || "");
          setExpiry(parsedInfo.expiry || "");
          setCvc(parsedInfo.cvc || "");
          setZipCode(parsedInfo.zipCode || "");
        } catch (error) {
          console.error("Error parsing stored credit card info:", error);
        }
      }
    }
  }, [initialCreditCardInfo]);

  return {
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
    setZipCode,
  };
};
