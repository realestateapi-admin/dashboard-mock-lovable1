
/**
 * Service for liens data
 * This is a mock implementation that would be replaced with actual API calls
 */
export interface LiensData {
  propertyLiensRequests: number;
  lienRecords: number;
  timestamp: string;
}

// Mock function to simulate fetching liens data
export const fetchLiensData = async (): Promise<LiensData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate random data for demo purposes
  const propertyLiensRequests = Math.floor(Math.random() * 200) + 150; // 150-350 requests
  const lienRecords = Math.floor(Math.random() * 500) + 300; // 300-800 records
  
  return {
    propertyLiensRequests,
    lienRecords,
    timestamp: new Date().toISOString()
  };
};
