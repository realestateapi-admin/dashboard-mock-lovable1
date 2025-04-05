
/**
 * Service for demographic/skiptrace data
 * This is a mock implementation that would be replaced with actual API calls
 */
export interface SkiptraceData {
  skipTraceHits: number;
  skipTraceRequests: number;
  timestamp: string;
}

// Mock function to simulate fetching skiptrace data
export const fetchSkiptraceData = async (): Promise<SkiptraceData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate random data for demo purposes
  const skipTraceRequests = Math.floor(Math.random() * 300) + 200; // 200-500 requests
  const successRate = Math.random() * 0.3 + 0.6; // 60-90% success rate
  const skipTraceHits = Math.floor(skipTraceRequests * successRate);
  
  return {
    skipTraceHits,
    skipTraceRequests,
    timestamp: new Date().toISOString()
  };
};
