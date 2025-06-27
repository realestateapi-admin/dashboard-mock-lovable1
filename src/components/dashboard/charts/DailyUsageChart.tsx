
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import { CustomTooltip } from '@/components/charts/CustomTooltip';

interface DailyUsageChartProps {
  data: any[];
  dataView: string;
}

export const DailyUsageChart = ({ data, dataView }: DailyUsageChartProps) => {
  const isMobile = useIsMobile();
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 60,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: isMobile ? 10 : 12 }} 
          stroke="var(--muted-foreground)"
        />
        <YAxis 
          tick={{ fontSize: isMobile ? 10 : 12 }} 
          stroke="var(--muted-foreground)"
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar 
          dataKey={dataView === 'calls' ? 'calls' : 'records'} 
          name={dataView === 'calls' ? 'API Calls' : 'Records'} 
          fill="#04c8c8" 
          radius={[4, 4, 0, 0]} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
