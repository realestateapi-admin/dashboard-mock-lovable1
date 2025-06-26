
export const fetchAvmData = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Define AVM endpoint usage
  const endpointUsage = [
    {
      endpoint: 'AVM',
      description: 'Get automated valuation model estimates for properties',
      calls: 2847,
      records: 2847,
      percentage: 85,
      creditCost: "1 credit per record"
    },
    {
      endpoint: 'AVM Bulk',
      description: 'Bulk automated valuation model estimates for multiple properties',
      calls: 500,
      records: 500,
      percentage: 15,
      creditCost: "1 credit per record"
    }
  ];
  
  // Calculate totals based on the endpoint data
  const totalRecords = endpointUsage.reduce((sum, endpoint) => sum + endpoint.records, 0);
  const totalApiCalls = endpointUsage.reduce((sum, endpoint) => sum + endpoint.calls, 0);
  
  const result = {
    totalApiCalls,
    totalRecords,
    recordsLimit: 5000,
    increasePercentage: 8,
    dailyUsageData: [
      { date: '2023-06-01', calls: 180, records: 180 },
      { date: '2023-06-02', calls: 220, records: 220 },
      { date: '2023-06-03', calls: 195, records: 195 },
      { date: '2023-06-04', calls: 240, records: 240 },
      { date: '2023-06-05', calls: 210, records: 210 },
      { date: '2023-06-06', calls: 285, records: 285 },
      { date: '2023-06-07', calls: 320, records: 320 },
    ],
    monthlyUsageData: [
      { date: 'Jan', calls: 4200, records: 4200 },
      { date: 'Feb', calls: 3800, records: 3800 },
      { date: 'Mar', calls: 4500, records: 4500 },
      { date: 'Apr', calls: 4800, records: 4800 },
      { date: 'May', calls: 5200, records: 5200 },
      { date: 'Jun', calls: 5800, records: 5800 },
    ],
    endpointUsage
  };
  
  return result;
};
