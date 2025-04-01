
import React from 'react';
import { ApiRecommendationSection } from './ApiRecommendationSection';

export const UsageAnalyticsSection: React.FC = () => {
  const dailyResponseStructure = `{
  data: Array<{
    date: string;       // Format: "Mon", "Tue", etc. or ISO date string
    calls: number;      // API calls for that day
    records: number;    // Records used that day
  }>
}`;

  const monthlyResponseStructure = `{
  data: Array<{
    date: string;       // Format: "Jan", "Feb", etc.
    calls: number;      // API calls for that month
    records: number;    // Records used that month
  }>
}`;

  return (
    <>
      <h3 className="text-xl font-semibold mb-3">2. Usage Analytics Charts</h3>
      <ApiRecommendationSection
        title=""
        api="/api/usage/daily"
        collection="usage_reports, usage_history"
        purpose="Get daily usage data for charts"
        responseStructure={dailyResponseStructure}
        implementationNotes={[]}
      />

      <ApiRecommendationSection
        title=""
        api="/api/usage/monthly"
        collection="usage_reports"
        purpose="Get monthly usage data for charts"
        responseStructure={monthlyResponseStructure}
        implementationNotes={[
          "Create a more granular collection to track daily usage",
          "Aggregate usage_reports by month for monthly view"
        ]}
      />
    </>
  );
};
