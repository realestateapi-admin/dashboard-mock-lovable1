
export const formatCardNumber = (value: string): string => {
  // Remove all non-digit characters first (including spaces, dashes, etc.)
  value = value.replace(/\D/g, "");
  // Add spaces every 4 digits
  value = value.replace(/(.{4})/g, "$1 ").trim();
  // Limit to 16 digits plus spaces (19 characters total)
  return value.substring(0, 19);
};

export const formatExpiryDate = (value: string): string => {
  value = value.replace(/\s/g, "").replace(/[^0-9]/g, "");
  if (value.length > 2) {
    value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
  }
  return value.substring(0, 5); // MM/YY format (5 chars total)
};

export const formatCvc = (value: string): string => {
  return value.replace(/[^0-9]/g, "").substring(0, 4);
};

export const formatZipCode = (value: string): string => {
  return value.replace(/[^0-9-]/g, "").substring(0, 10);
};
