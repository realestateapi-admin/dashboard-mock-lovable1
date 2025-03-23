
export interface UsageHistoryEntry {
  timestamp: string;
  endpoint: string;
  request: string;
  credits: number;
  status: string;
  responseTime: number;
}

export interface UsageDistributionItem {
  name: string;
  value: number;
  fill: string;
}

export interface EndpointUsageItem {
  endpoint: string;
  calls: number;
  records: number;
  percentage: number;
  description: string;
  creditCost: string;
}
