
import { UsageDistributionItem } from '@/types/usage';

/**
 * Creates usage distribution data for the given time period type
 * @param dailyData - Daily usage data
 * @param monthlyData - Monthly usage data
 * @param timePeriod - 'daily' or 'monthly'
 * @returns Distribution data formatted for the pie chart
 */
export const createUsageDistributionData = (
  dailyData: any[],
  monthlyData: any[],
  timePeriod: 'daily' | 'monthly'
): UsageDistributionItem[] => {
  // Determine which dataset to use based on time period
  const dataToUse = timePeriod === 'daily' ? dailyData : monthlyData;
  
  // Create a map to hold the total records for each endpoint
  const endpointRecords: Record<string, number> = {};
  
  // Calculate total records used across all data points
  const totalRecords = dataToUse.reduce((total, item) => total + item.records, 0);
  
  // In a real implementation, we would calculate the exact breakdown by endpoint
  // For this mock implementation, we'll use fixed percentages
  if (timePeriod === 'daily') {
    // Distribution percentages for daily view
    endpointRecords['Property Search'] = Math.round(totalRecords * 0.5);
    endpointRecords['Property Detail'] = Math.round(totalRecords * 0.4);
    endpointRecords['Property Comps'] = Math.round(totalRecords * 0.1);
  } else {
    // Distribution percentages for monthly view
    endpointRecords['Property Search'] = Math.round(totalRecords * 0.45);
    endpointRecords['Property Detail'] = Math.round(totalRecords * 0.35);
    endpointRecords['Property Comps'] = Math.round(totalRecords * 0.2);
  }
  
  // Format the data for the pie chart
  return Object.entries(endpointRecords).map(([name, value]) => ({
    name,
    value,
    fill: name === 'Property Search' ? '#1d4ed8' : 
          name === 'Property Detail' ? '#047857' : '#b45309'
  }));
};
