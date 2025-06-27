
import { UsageHistoryEntry } from "@/types/usage";
import { subDays } from "date-fns";

// Generate random sample data
const generateSampleData = (): UsageHistoryEntry[] => {
  // All endpoints from our tiered selector
  const endpoints = [
    // Property Data
    "Property Search",
    "Property Detail",
    "Property Detail Bulk",
    "Property Comps",
    "CSV Generator",
    "PropGPT",
    "Address Verification",
    "Property Portfolio",
    "Property Boundary",
    "Mapping (Pins)",
    // Skip Trace Data
    "Skip Trace",
    "Bulk Skip Trace Await",
    "Bulk Skip Trace",
    // AVM Data
    "Lender Grade AVM",
    "Bulk Lender grade AVM",
    // Liens Data
    "Involuntary Liens"
  ];
  
  const statuses = ["Success", "Error", "Warning"];
  
  // Updated requests mapped to endpoints
  const endpointRequests = {
    "Property Search": [
      "POST /properties/search",
      "POST /api/v1/property/search",
      "POST /search/properties"
    ],
    "Property Detail": [
      "GET /properties/123456",
      "GET /api/v1/property/detail/789012",
      "GET /property/345678"
    ],
    "Property Detail Bulk": [
      "POST /properties/bulk-detail",
      "POST /api/v1/property/bulk",
      "POST /bulk/property-details"
    ],
    "Property Comps": [
      "POST /properties/123456/comps",
      "POST /api/v1/property/comps",
      "POST /comps/property"
    ],
    "CSV Generator": [
      "POST /export/csv",
      "GET /api/v1/csv-export/456789",
      "POST /generate/csv"
    ],
    "PropGPT": [
      "POST /api/v1/propgpt/analyze",
      "POST /propgpt/insights",
      "POST /ai/property-analysis"
    ],
    "Address Verification": [
      "POST /api/v1/address/verify",
      "POST /verify/address",
      "POST /address/validation"
    ],
    "Property Portfolio": [
      "GET /api/v1/portfolio/123",
      "POST /portfolio/analyze",
      "GET /portfolio/summary/456"
    ],
    "Property Boundary": [
      "GET /api/v1/property/boundary/123456",
      "POST /boundary/property",
      "GET /property/parcel/789012"
    ],
    "Mapping (Pins)": [
      "POST /api/v1/mapping/pins",
      "GET /maps/property-pins/123",
      "POST /pins/generate"
    ],
    "Skip Trace": [
      "POST /api/v1/skiptrace/person",
      "POST /skiptrace/lookup",
      "POST /trace/individual"
    ],
    "Bulk Skip Trace Await": [
      "POST /api/v1/skiptrace/bulk-await",
      "POST /bulk-skiptrace/await",
      "POST /trace/bulk/await"
    ],
    "Bulk Skip Trace": [
      "POST /api/v1/skiptrace/bulk",
      "POST /bulk-skiptrace/process",
      "POST /trace/bulk"
    ],
    "Lender Grade AVM": [
      "POST /api/v1/avm/lender-grade",
      "POST /avm/valuation",
      "POST /valuation/lender"
    ],
    "Bulk Lender grade AVM": [
      "POST /api/v1/avm/bulk-lender",
      "POST /avm/bulk-valuation",
      "POST /valuation/bulk"
    ],
    "Involuntary Liens": [
      "GET /api/v1/liens/property/123456",
      "POST /liens/search",
      "GET /property/liens/789012"
    ]
  };
  
  const result: UsageHistoryEntry[] = [];
  
  // Generate data for the last 90 days
  for (let i = 0; i < 90; i++) {
    // More entries for recent days, fewer for older days
    const entriesForDay = Math.max(1, Math.floor(Math.random() * 15) * (1 - i / 120));
    
    for (let j = 0; j < entriesForDay; j++) {
      const date = subDays(new Date(), i);
      date.setHours(Math.floor(Math.random() * 24));
      date.setMinutes(Math.floor(Math.random() * 60));
      date.setSeconds(Math.floor(Math.random() * 60));
      
      const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
      
      // Get appropriate requests for this endpoint
      const requests = endpointRequests[endpoint] || ["GET /api/unknown"];
      const requestPath = requests[Math.floor(Math.random() * requests.length)];
      
      // Credits based on endpoint type
      let credits = 0;
      switch (endpoint) {
        case "Property Search":
          credits = Math.ceil(Math.random() * 5);
          break;
        case "Property Detail":
        case "Property Detail Bulk":
          credits = Math.ceil(Math.random() * 3);
          break;
        case "Property Comps":
          credits = Math.ceil(Math.random() * 10);
          break;
        case "CSV Generator":
          credits = Math.ceil(Math.random() * 2);
          break;
        case "PropGPT":
          credits = Math.ceil(Math.random() * 8);
          break;
        case "Address Verification":
          credits = 1;
          break;
        case "Property Portfolio":
          credits = Math.ceil(Math.random() * 15);
          break;
        case "Property Boundary":
          credits = 2;
          break;
        case "Mapping (Pins)":
          credits = 1;
          break;
        case "Skip Trace":
          credits = Math.ceil(Math.random() * 3);
          break;
        case "Bulk Skip Trace Await":
        case "Bulk Skip Trace":
          credits = Math.ceil(Math.random() * 25);
          break;
        case "Lender Grade AVM":
          credits = Math.ceil(Math.random() * 4);
          break;
        case "Bulk Lender grade AVM":
          credits = Math.ceil(Math.random() * 20);
          break;
        case "Involuntary Liens":
          credits = Math.ceil(Math.random() * 6);
          break;
        default:
          credits = 1;
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
      entry.endpoint === endpoint
    );
  }
  
  return filteredData;
};
