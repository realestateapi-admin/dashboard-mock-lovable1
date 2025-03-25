
/**
 * Service to fetch end user analytics data from Kibana
 * This is a mock implementation that would be replaced with actual Kibana API calls
 */
export interface EndUserData {
  activeEndUsers: number | null;
  timestamp: string;
}

// Mock function to simulate fetching data from Kibana
// In a real implementation, this would make API calls to Kibana
export const fetchEndUserAnalytics = async (): Promise<EndUserData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulate a 30% chance of null value to demonstrate the X-User ID issue
  const hasXUserHeader = Math.random() > 0.3;
  
  return {
    activeEndUsers: hasXUserHeader ? Math.floor(Math.random() * 120) + 30 : null,
    timestamp: new Date().toISOString()
  };
};
