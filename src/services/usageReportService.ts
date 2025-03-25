
import { UsageReport } from "@/types/usage";

// Mock API service to fetch usage reports data
// This would be replaced with actual API calls to your backend
export const fetchUsageReports = async (accountId?: number): Promise<UsageReport> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock response based on the MongoDB document structure
  return {
    _id: "664279aedec5dfeaf6d71462",
    account_id: accountId || 351,
    billing_period_start: new Date("2024-05-01T00:00:00.000Z").toISOString(),
    billing_period_end: new Date("2024-05-31T23:59:59.999Z").toISOString(),
    last_update_date: new Date("2024-05-14T12:45:42.461Z").toISOString(),
    organization: "ICON",
    property_usage: 100487,
    skiptrace_usage: 0
  };
};

// Function to fetch historical usage data
export const fetchUsageHistory = async (accountId?: number): Promise<UsageReport[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Generate 6 months of mock data with decreasing usage
  const today = new Date();
  const history: UsageReport[] = [];
  
  for (let i = 0; i < 6; i++) {
    const month = new Date(today);
    month.setMonth(month.getMonth() - i);
    
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59, 999);
    
    // Create synthetic data with some month-to-month variation
    const basePropertyUsage = 100487;
    const variance = Math.floor(Math.random() * 15000) - 7500;
    const skiptraceVariance = Math.floor(Math.random() * 500);
    
    history.push({
      _id: `history_${i}`,
      account_id: accountId || 351,
      billing_period_start: startOfMonth.toISOString(),
      billing_period_end: endOfMonth.toISOString(),
      last_update_date: new Date().toISOString(),
      organization: "ICON",
      property_usage: Math.max(0, basePropertyUsage - (i * 10000) + variance),
      skiptrace_usage: Math.max(0, (i * 200) + skiptraceVariance)
    });
  }
  
  // Return in chronological order (oldest first)
  return history.reverse();
};
