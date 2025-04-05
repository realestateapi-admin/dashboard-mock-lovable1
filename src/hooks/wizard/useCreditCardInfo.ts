
import { useState, useEffect } from "react";

export const useCreditCardInfo = () => {
  const [creditCardInfo, setCreditCardInfo] = useState<any>(null);
  
  // Load credit card info from localStorage on component mount
  useEffect(() => {
    try {
      const storedCreditCardInfo = localStorage.getItem("creditCardInfo");
      if (storedCreditCardInfo) {
        setCreditCardInfo(JSON.parse(storedCreditCardInfo));
      }
    } catch (error) {
      console.error("Error loading stored credit card info:", error);
    }
  }, []);
  
  return {
    creditCardInfo
  };
};
