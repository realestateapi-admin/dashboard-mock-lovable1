
import React from 'react';
import { ApiRecommendationSection } from './ApiRecommendationSection';

export const RecordUsageSection: React.FC = () => {
  const responseStructure = `{
  usageDistributionData: Array<{
    name: string;       // "Property Search", etc.
    value: number;      // Number of records
    fill: string;       // Color for the chart segment
  }>
}`;

  return (
    <ApiRecommendationSection
      title="5. Record Usage Breakdown"
      api="/api/usage/distribution"
      collection="Same as endpoint_usage above"
      purpose="Get data for the pie chart showing usage distribution"
      responseStructure={responseStructure}
      implementationNotes={[
        "Derive from the same endpoint_usage collection",
        "Filter to include only endpoints with record usage > 0",
        "Add consistent color values for each endpoint type"
      ]}
    />
  );
};
