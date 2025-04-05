
export interface PaymentMethod {
  id: string;
  type: string;
  lastFour: string;
  expiryDate: string;
  isDefault: boolean;
  // ACH specific fields
  accountType?: string;
  accountName?: string;
}
