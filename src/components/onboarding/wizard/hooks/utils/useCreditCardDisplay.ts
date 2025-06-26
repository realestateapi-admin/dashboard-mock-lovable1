
import { useState, useRef, useEffect } from "react";
import { maskCardNumber, maskCvc } from "./creditCardMasking";

export const useCreditCardDisplay = () => {
  const [cvcMasked, setCvcMasked] = useState<boolean>(false);
  const [displayCvc, setDisplayCvc] = useState<string>("");
  const [cardNumberMasked, setCardNumberMasked] = useState<boolean>(false);
  const [displayCardNumber, setDisplayCardNumber] = useState<string>("");
  const cvcTimerRef = useRef<NodeJS.Timeout | null>(null);

  const updateCvcDisplay = (value: string) => {
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
        setDisplayCvc(maskCvc(value));
      }, 2000);
    }
  };

  const updateCardNumberDisplay = (value: string) => {
    setDisplayCardNumber(value);
    setCardNumberMasked(false);
  };

  const initializeDisplayFromExistingData = (cardNumber: string, cvc: string) => {
    if (cvc) {
      setDisplayCvc(maskCvc(cvc));
      setCvcMasked(true);
    }
    
    if (cardNumber) {
      const maskedCardNumber = maskCardNumber(cardNumber);
      setDisplayCardNumber(maskedCardNumber);
      setCardNumberMasked(true);
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (cvcTimerRef.current) {
        clearTimeout(cvcTimerRef.current);
      }
    };
  }, []);

  return {
    cvcMasked,
    displayCvc,
    cardNumberMasked,
    displayCardNumber,
    updateCvcDisplay,
    updateCardNumberDisplay,
    initializeDisplayFromExistingData
  };
};
