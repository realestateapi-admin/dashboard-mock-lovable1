
export const maskCardNumber = (cardNumber: string): string => {
  const digits = cardNumber.replace(/\s/g, '');
  if (digits.length >= 4) {
    const lastFour = digits.slice(-4);
    const maskedPortion = "•".repeat(digits.length - 4);
    return (maskedPortion + lastFour).replace(/(.{4})/g, "$1 ").trim();
  }
  return cardNumber;
};

export const maskCvc = (cvc: string): string => {
  return "•".repeat(cvc.length);
};
