
import React from 'react';
import { ApiRecommendationSection } from './ApiRecommendationSection';

export const EndpointUsageSection: React.FC = () => {
  const responseStructure = `{
  endpointUsage: Array<{
    endpoint: string;           // "Property Search", etc.
    calls: number;              // Total calls to this endpoint
    records: number;            // Records fetched from this endpoint
    percentage: number;         // Percentage of total records
    description: string;        // Description of endpoint
    creditCost: string;         // Credit cost description
  }>
}`;

  return (
    <ApiRecommendationSection
      title="4. Endpoint Usage Section"
      api="/api/usage/endpoints"
      collection="New endpoint_usage collection needed"
      purpose="Get usage breakdown by endpoint"
      responseStructure={responseStructure}
      implementationNotes={[
        "Create a new MongoDB collection to track usage by endpoint",
        "Update it whenever an API call is made",
        "Calculate percentages based on total records used"
      ]}
    />
  );
};
