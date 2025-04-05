
import { useState, useEffect } from "react";

interface CreditCardInfo {
  cardName?: string;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
  zipCode?: string;
}

export const useCreditCardInfo = () => {
  const [creditCardInfo, setCreditCardInfo] = useState<CreditCardInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load credit card info from localStorage on component mount
  useEffect(() => {
    try {
      setIsLoading(true);
      const storedCreditCardInfo = localStorage.getItem("creditCardInfo");
      
      if (storedCreditCardInfo) {
        const parsedInfo = JSON.parse(storedCreditCardInfo) as CreditCardInfo;
        setCreditCardInfo(parsedInfo);
        console.log("Loaded stored credit card info:", parsedInfo);
      } else {
        console.log("No stored credit card info found");
        setCreditCardInfo(null);
      }
    } catch (error) {
      console.error("Error loading stored credit card info:", error);
      setCreditCardInfo(null);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const updateCreditCardInfo = (info: CreditCardInfo) => {
    setCreditCardInfo(info);
    try {
      localStorage.setItem("creditCardInfo", JSON.stringify(info));
    } catch (error) {
      console.error("Error saving credit card info:", error);
    }
  };
  
  return {
    creditCardInfo,
    isLoading,
    updateCreditCardInfo
  };
};
