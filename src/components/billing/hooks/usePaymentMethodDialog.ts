
import { useState } from "react";

type PaymentMethodType = "card" | "ach";
type ACHStep = "ach-details" | "backup-card";

export const usePaymentMethodDialog = () => {
  const [paymentMethodType, setPaymentMethodType] = useState<PaymentMethodType>("card");
  const [achStep, setACHStep] = useState<ACHStep>("ach-details");

  const handleBackToACHDetails = () => {
    setACHStep("ach-details");
  };

  const moveToBackupCardStep = () => {
    setACHStep("backup-card");
  };

  const resetSteps = () => {
    setACHStep("ach-details");
  };

  return {
    paymentMethodType,
    setPaymentMethodType,
    achStep,
    setACHStep,
    handleBackToACHDetails,
    moveToBackupCardStep,
    resetSteps
  };
};
