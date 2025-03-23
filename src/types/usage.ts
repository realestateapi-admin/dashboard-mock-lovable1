
export interface UsageHistoryEntry {
  timestamp: string;
  endpoint: string;
  request: string;
  credits: number;
  status: string;
  responseTime: number;
}
