
import React from 'react';
import { AreaChart, XAxis, YAxis, Area, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

interface MonthlyUsageChartProps {
  monthlyUsageData: any[];
}

export const MonthlyUsageChart = ({ monthlyUsageData }: MonthlyUsageChartProps) => {
  const isMobile = useIsMobile();
  const chartHeight = isMobile ? 200 : 240;

  // Limit to the most recent 6 months of data
  const limitedData = monthlyUsageData.slice(-6);

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <AreaChart 
        data={limitedData} 
        margin={{ 
          top: 5, 
          right: 10, 
          left: 10, 
          bottom: 5 
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: isMobile ? 10 : 12 }} 
          stroke="var(--muted-foreground)"
          interval={isMobile ? 2 : 0}
        />
        <YAxis 
          tick={{ fontSize: isMobile ? 10 : 12 }} 
          stroke="var(--muted-foreground)"
          width={isMobile ? 30 : 40}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#ffffff', 
            borderColor: '#e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: '1px solid #e2e8f0'
          }}
          formatter={(value, name) => [value.toLocaleString(), name === 'calls' ? 'API Calls' : 'Records Used']}
          wrapperStyle={{ zIndex: 1000 }}
        />
        <Legend 
          formatter={(value) => value === 'calls' ? 'API Calls' : 'Records Used'} 
          iconType="circle"
          wrapperStyle={{ fontSize: isMobile ? 10 : 12 }}
        />
        <Area name="calls" type="monotone" dataKey="calls" fill="#a78bfa" fillOpacity={0.2} stroke="#a78bfa" />
        <Area name="records" type="monotone" dataKey="records" fill="#04c8c8" fillOpacity={0.2} stroke="#04c8c8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
