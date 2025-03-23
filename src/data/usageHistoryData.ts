
import { UsageHistoryEntry } from "@/types/usage";
import { subDays } from "date-fns";

// Generate random sample data
const generateSampleData = (): UsageHistoryEntry[] => {
  const endpoints = [
    "Property Search",
    "Property Detail",
    "Property Comps", 
    "Autocomplete",
    "Mapping"
  ];
  
  const statuses = ["Success", "Error", "Warning"];
  
  const requests = [
    "GET /properties?location=New+York&bedrooms=2",
    "GET /properties/123456",
    "GET /properties/123456/comps",
    "GET /autocomplete?q=123+Main+St",
    "GET /property-map?lat=37.7749&lng=-122.4194",
    "GET /properties?location=Los+Angeles&bedrooms=3",
    "GET /properties/789012",
    "GET /properties/345678/comps",
    "GET /autocomplete?q=456+Oak+Ave",
    "GET /property-map?lat=34.0522&lng=-118.2437"
  ];
  
  const result: UsageHistoryEntry[] = [];
  
  // Generate data for the last 90 days
  for (let i = 0; i < 90; i++) {
    // More entries for recent days, fewer for older days
    const entriesForDay = Math.max(1, Math.floor(Math.random() * 10) * (1 - i / 100));
    
    for (let j = 0; j < entriesForDay; j++) {
      const date = subDays(new Date(), i);
      date.setHours(Math.floor(Math.random() * 24));
      date.setMinutes(Math.floor(Math.random() * 60));
      date.setSeconds(Math.floor(Math.random() * 60));
      
      const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
      const requestPath = requests[Math.floor(Math.random() * requests.length)];
      
      // Credits based on endpoint type
      let credits = 0;
      switch (endpoint) {
        case "Property Search":
          credits = Math.ceil(Math.random() * 5);
          break;
        case "Property Detail":
          credits = Math.ceil(Math.random() * 3);
          break;
        case "Property Comps":
          credits = Math.ceil(Math.random() * 10);
          break;
        case "Autocomplete":
          credits = 0; // Autocomplete doesn't use credits
          break;
        case "Mapping":
          credits = 1;
          break;
      }
      
      // Most requests are successful, but some fail
      const status = Math.random() > 0.9 
        ? statuses[Math.floor(Math.random() * statuses.length)] 
        : "Success";
      
      const responseTime = Math.floor(Math.random() * 900) + 100; // 100-1000ms
      
      result.push({
        timestamp: date.toISOString(),
        endpoint,
        request: requestPath,
        credits,
        status,
        responseTime
      });
    }
  }
  
  // Sort by timestamp (newest first)
  return result.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

// Sample data
const sampleData = generateSampleData();

// Filter data by date range and endpoint
export const usageHistoryData = (
  fromDate?: string,
  toDate?: string,
  endpoint?: string
): UsageHistoryEntry[] => {
  let filteredData = [...sampleData];
  
  if (fromDate) {
    const from = new Date(fromDate);
    filteredData = filteredData.filter(entry => 
      new Date(entry.timestamp) >= from
    );
  }
  
  if (toDate) {
    const to = new Date(toDate);
    to.setHours(23, 59, 59, 999); // End of the day
    filteredData = filteredData.filter(entry => 
      new Date(entry.timestamp) <= to
    );
  }
  
  if (endpoint && endpoint !== 'all') {
    filteredData = filteredData.filter(entry => 
      entry.endpoint.toLowerCase() === endpoint.replace(/-/g, ' ')
    );
  }
  
  return filteredData;
};
