
import { EndpointUsageItem, UsageDistributionItem } from '@/types/usage';

// Temporary mock data fetching with corrected total counts
export const fetchApiUsageData = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Define endpoint usage first to derive other values from it
  const endpointUsage = [
    {
      endpoint: 'Property Search',
      description: 'Search for properties by location, price, features, etc.',
      calls: 6428,
      records: 4238,
      percentage: 50.8,
      creditCost: "1 credit per record"
    },
    {
      endpoint: 'Property Detail',
      description: 'Get detailed information about a specific property',
      calls: 3572,
      records: 3136,
      percentage: 37.6,
      creditCost: "1 credit per record"
    },
    {
      endpoint: 'Property Comps',
      description: 'Get comparable properties for a given property',
      calls: 2143,
      records: 966,
      percentage: 11.6,
      creditCost: "1 credit per record"
    },
    {
      endpoint: 'CSV',
      description: 'Download property data in CSV format',
      calls: 1243,
      records: 850,
      percentage: 10.2,
      creditCost: "1 credit per record"
    },
    {
      endpoint: 'Property Detail Bulk',
      description: 'Get detailed information for multiple properties at once',
      calls: 892,
      records: 1205,
      percentage: 14.5,
      creditCost: "1 credit per record"
    },
    {
      endpoint: 'Property Boundaries',
      description: 'Get property boundary and parcel information',
      calls: 634,
      records: 425,
      percentage: 5.1,
      creditCost: "2 credits per record"
    },
    {
      endpoint: 'Property Maps',
      description: 'Get satellite and aerial imagery of properties',
      calls: 456,
      records: 320,
      percentage: 3.8,
      creditCost: "3 credits per record"
    },
    {
      endpoint: 'Autocomplete',
      description: 'Get address suggestions as the user types',
      calls: 2142,
      records: 0,
      percentage: 0,
      creditCost: "Free"
    },
  ];
  
  // Calculate total records based on the endpoint data for consistency
  const totalRecords = endpointUsage.reduce((sum, endpoint) => sum + endpoint.records, 0);
  const totalApiCalls = endpointUsage.reduce((sum, endpoint) => sum + endpoint.calls, 0);
  
  // Generate usage distribution data from endpoint data
  const usageDistributionData = endpointUsage
    .filter(endpoint => endpoint.records > 0)
    .map((endpoint) => ({
      name: endpoint.endpoint,
      value: endpoint.records,
      fill: endpoint.endpoint === 'Property Search' ? '#1d4ed8' : 
            endpoint.endpoint === 'Property Detail' ? '#047857' : 
            endpoint.endpoint === 'Property Comps' ? '#b45309' :
            endpoint.endpoint === 'CSV' ? '#7c3aed' :
            endpoint.endpoint === 'Property Detail Bulk' ? '#dc2626' :
            endpoint.endpoint === 'Property Boundaries' ? '#059669' :
            endpoint.endpoint === 'Property Maps' ? '#d97706' : '#6b7280'
    }));
  
  return {
    totalApiCalls,
    totalRecords,
    recordsLimit: 10000,
    increasePercentage: 12,
    dailyUsageData: [
      { date: '2023-06-01', calls: 420, records: 290 },
      { date: '2023-06-02', calls: 380, records: 250 },
      { date: '2023-06-03', calls: 300, records: 200 },
      { date: '2023-06-04', calls: 350, records: 220 },
      { date: '2023-06-05', calls: 410, records: 280 },
      { date: '2023-06-06', calls: 490, records: 320 },
      { date: '2023-06-07', calls: 520, records: 370 },
    ],
    monthlyUsageData: [
      { date: 'Jan', calls: 9000, records: 6200 },
      { date: 'Feb', calls: 8500, records: 5800 },
      { date: 'Mar', calls: 9800, records: 6700 },
      { date: 'Apr', calls: 10200, records: 7100 },
      { date: 'May', calls: 11500, records: 7800 },
      { date: 'Jun', calls: 13200, records: 8200 },
    ],
    endpointUsage,
    usageDistributionData
  };
};
