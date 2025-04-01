
import React from 'react';
import { ApiRecommendationSection } from './ApiRecommendationSection';

export const SubscriptionDataSection: React.FC = () => {
  const responseStructure = `{
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
  trial_begin_date: string;
  trial_end_date: string;
}`;

  return (
    <ApiRecommendationSection
      title="6. Subscription Data"
      api="/api/subscription"
      collection="subscriptions"
      purpose="Fetch current subscription details"
      responseStructure={responseStructure}
      implementationNotes={[
        "This should match your existing subscription model",
        "Expose only the necessary fields for the frontend"
      ]}
    />
  );
};
