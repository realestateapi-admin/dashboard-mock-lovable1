
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

  const updatesResponseStructure = `{
  updates: Array<{
    id: string;           // Unique identifier for the update
    type: string;         // Type of update: 'announcement', 'release', 'maintenance', 'alert'
    title: string;        // Update title
    content: string;      // Main update content
    date: string;         // ISO date string when the update was published
    isNew?: boolean;      // Whether this is a new update the user hasn't seen
  }>
}`;

  return (
    <>
      <h3 className="text-xl font-semibold mb-3">2. Dashboard Updates and Analytics</h3>
      
      <ApiRecommendationSection
        title="Company Updates"
        api="/api/updates"
        collection="company_updates"
        purpose="Fetch latest company announcements, alerts, and feature releases"
        responseStructure={updatesResponseStructure}
        implementationNotes={[
          "Create updates with different types (announcement, release, maintenance, alert)",
          "Implement a mark-as-read functionality to track which updates are new",
          "Include an isNew flag for highlighting unread updates"
        ]}
      />

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
