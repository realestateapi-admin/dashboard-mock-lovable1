
import { SubscriptionData } from "@/types/billing";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

// Mock billing subscription data based on the MongoDB document
const mockSubscription: SubscriptionData = {
  _id: "665e93db3dc3cdc529290df2",
  account_id: 538,
  subscription_id: "AzyhxbUEMxDyX25EM",
  customer_name: "Just Think AI",
  contract_start_date: "2024-05-23T00:00:00.000Z",
  contract_end_date: "2025-05-23T00:00:00.000Z",
  plan_name: "Starter",
  plan_id: 1,
  plan_type: "property",
  usage_amount: 30000,
  minimum_bill_amount: 599,
  unit_price: 0.02,
  credit: 0,
  trial_begin_date: "",
  trial_end_date: ""
};

export const fetchSubscription = async (accountId?: number): Promise<SubscriptionData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, we would fetch from the account_plans collection using the accountId
  return mockSubscription;
};

// Helper function to detect if a plan is a paid plan
export const isPaidPlan = (planName?: string): boolean => {
  if (!planName) return false;
  
  // Check if the plan name matches any of our paid plans
  const paidPlans = ["Starter", "Growth", "Pro", "Enterprise"];
  return paidPlans.includes(planName);
};
