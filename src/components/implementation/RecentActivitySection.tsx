
import React from 'react';
import { ApiRecommendationSection } from './ApiRecommendationSection';

export const RecentActivitySection: React.FC = () => {
  const responseStructure = `{
  activities: Array<{
    id: string;
    type: string;             // "api_call", "rate_limit", "error"
    endpoint: string;         // "/v2/PropertyDetail", etc.
    timestamp: string;        // ISO date string
    status: string;           // "success", "warning", "error"
    recordsFetched: number;
    creditCost: number;
  }>
}`;

  return (
    <ApiRecommendationSection
      title="3. Recent Activity List"
      api="/api/activity/recent"
      collection="New activity_logs collection needed"
      purpose="Fetch recent API activity"
      responseStructure={responseStructure}
      implementationNotes={[
        "Create a new MongoDB collection to log each API call",
        "Include endpoint, status, and record count information",
        "Store timestamp to allow for filtering by time period"
      ]}
    />
  );
};
