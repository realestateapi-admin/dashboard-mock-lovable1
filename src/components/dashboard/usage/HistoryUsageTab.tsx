
import React from 'react';
import { TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { UsageReport } from '@/types/usage';
import { format, parseISO } from 'date-fns';

interface HistoryUsageTabProps {
  usageHistory: UsageReport[] | null;
  isLoading: boolean;
}

export const HistoryUsageTab = ({ 
  usageHistory, 
  isLoading 
}: HistoryUsageTabProps) => {
  // Format history data for the chart
  const chartData = usageHistory?.map(report => ({
    month: format(parseISO(report.billing_period_start), 'MMM'),
    property: report.property_usage,
    skiptrace: report.skiptrace_usage
  })) || [];
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin text-primary-teal mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">Loading historical data...</p>
      </div>
    );
  }

  if (!usageHistory || usageHistory.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No historical data available</p>
      </div>
    );
  }
  
  return (
    <div className="pt-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary-teal" />
        <h3 className="font-medium">Monthly Usage Trends</h3>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip />
            <Legend />
            <Bar dataKey="property" name="Property Records" fill="#04c8c8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="skiptrace" name="Skiptrace Records" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
