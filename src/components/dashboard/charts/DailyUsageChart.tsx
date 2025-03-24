
import React from 'react';
import { BarChart, XAxis, YAxis, Bar, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

interface DailyUsageChartProps {
  dailyUsageData: any[];
}

export const DailyUsageChart = ({ dailyUsageData }: DailyUsageChartProps) => {
  const isMobile = useIsMobile();
  const chartHeight = isMobile ? 200 : 240;

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart 
        data={dailyUsageData} 
        margin={{ 
          top: 5,
          right: 5, 
          left: isMobile ? -10 : -20, 
          bottom: 5 
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: isMobile ? 10 : 12 }} 
          stroke="var(--muted-foreground)"
          interval={isMobile ? 1 : 0}
        />
        <YAxis 
          tick={{ fontSize: isMobile ? 10 : 12 }} 
          stroke="var(--muted-foreground)"
          width={isMobile ? 30 : 40}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'var(--background)', 
            borderColor: 'var(--border)',
            borderRadius: 'var(--radius)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
          formatter={(value, name) => [value.toLocaleString(), name === 'calls' ? 'API Calls' : 'Records Used']}
          wrapperStyle={{ zIndex: 1000 }}
        />
        <Legend 
          formatter={(value) => value === 'calls' ? 'API Calls' : 'Records Used'} 
          iconType="circle"
          wrapperStyle={{ fontSize: isMobile ? 10 : 12 }}
        />
        <Bar name="calls" dataKey="calls" fill="#a78bfa" radius={[4, 4, 0, 0]} />
        <Bar name="records" dataKey="records" fill="#04c8c8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
