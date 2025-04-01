
import React from 'react';
import { ApiRecommendationSection } from './ApiRecommendationSection';

export const UsageHistorySection: React.FC = () => {
  const responseStructure = `{
  history: Array<{
    timestamp: string;         // ISO date string
    endpoint: string;          // Endpoint name
    request: string;           // Request details/query
    credits: number;           // Credits used
    status: string;            // "success", "error", "warning"
    responseTime: number;      // Response time in milliseconds
  }>
}`;

  return (
    <ApiRecommendationSection
      title="7. Usage History Tracking"
      api="/api/usage/history"
      collection="usage_reports, new usage_history collection"
      purpose="Get detailed usage history for the UsageHistoryTable component"
      responseStructure={responseStructure}
      implementationNotes={[
        "Create a new collection for detailed request logging",
        "Store request details, response status, and timing information",
        "Allow filtering by date range"
      ]}
    />
  );
};
