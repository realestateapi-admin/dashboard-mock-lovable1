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
  description: string;
  calls: number;
  records: number;
  percentage: number;
  creditCost: string;
  isEnabled?: boolean;
}

export interface UsageReport {
  _id: string;
  account_id: number;
  billing_period_start: string;
  billing_period_end: string;
  last_update_date: string;
  organization: string;
  property_usage: number;
  skiptrace_usage: number;
}
