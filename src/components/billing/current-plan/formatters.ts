
import { annualPlanPrices } from "@/data/plans";

export const formatPrice = (
  price: string | number,
  billingCycle: 'monthly' | 'annual',
  planId?: string
): string => {
  // Parse the price to a number if it's a string (removing $ and comma symbols)
  let numericPrice: number;
  
  if (typeof price === 'string') {
    // Remove $ and commas from the price string
    numericPrice = parseFloat(price.replace(/[$,]/g, ''));
  } else {
    numericPrice = price;
  }
  
  // Check if parsing resulted in a valid number
  if (isNaN(numericPrice)) {
    return String(price); // Convert to string if parsing failed
  }
  
  // If annual billing cycle, use the correct annual price from the annualPlanPrices object
  if (billingCycle === 'annual' && planId) {
    const annualPrice = annualPlanPrices[planId as keyof typeof annualPlanPrices];
    if (annualPrice) {
      return annualPrice;
    }
    
    // If no specific annual price is set, apply the standard discount
    return `$${(numericPrice * 0.8).toFixed(0)}`;
  } else {
    return `$${numericPrice.toFixed(0)}`;
  }
};
