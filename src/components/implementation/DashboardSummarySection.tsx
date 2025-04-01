
import React from 'react';
import { ApiRecommendationSection } from './ApiRecommendationSection';

export const DashboardSummarySection: React.FC = () => {
  const responseStructure = `{
  totalApiCalls: number;              // Total API calls made
  totalRecords: number;               // Total property records used
  recordsPercentage: number;          // Percentage of plan limit used
  monthlyApiCalls: number;            // API calls this month
  monthlyRecords: number;             // Records used this month
  monthlyRecordsPercentage: number;   // Percentage of monthly limit used
  isTrialActive: boolean;             // Whether user is on trial
  trialDaysLeft: number;              // Days left in trial
}`;

  return (
    <ApiRecommendationSection
      title="1. Dashboard Summary Cards"
      api="/api/dashboard/summary"
      collection="usage_reports, subscriptions"
      purpose="Fetch aggregate data for the summary cards at the top of the dashboard"
      responseStructure={responseStructure}
      implementationNotes={[
        "Aggregate usage_reports to calculate totals",
        "Compare against subscription.usage_amount for percentages",
        "Check subscription.trial_end_date to determine trial status"
      ]}
    />
  );
};
