
export interface PlanData {
  id: string;
  name: string;
  price: string;
  description: string;
  records: string;
  features: string[];
  popular?: boolean;
  isFree?: boolean;
}

export interface AddOnData {
  id: string;
  name: string;
  description: string;
  prices: {
    [key: string]: string;
  };
  // Add billing type to clarify which add-ons are metered vs subscription
  billingType?: 'metered' | 'subscription';
  // Add category for grouping similar add-ons
  category?: string;
  // Add flag to indicate if the add-on requires approval
  requiresApproval?: boolean;
}

export interface InvoiceData {
  id: string;
  date: string;
  amount: string;
  status: string;
  period: string;
}

export interface SubscriptionData {
  _id: string;
  account_id: number;
  subscription_id: string;
  customer_name: string;
  contract_start_date: string;
  contract_end_date: string;
  plan_name: string;
  plan_id: number;
  plan_type: string;
  usage_amount: number;
  minimum_bill_amount: number;
  unit_price: number;
  credit: number;
  trial_begin_date?: string;
  trial_end_date?: string;
  isFree?: boolean;
  subscription_start_date?: string; // Date when user signed up for paid plan
  overage_handling?: string; // Added field for overage handling
  add_ons?: string[]; // Added field for active add-ons
}
