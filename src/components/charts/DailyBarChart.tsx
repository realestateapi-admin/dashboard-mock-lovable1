
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import { CustomTooltip } from './CustomTooltip';

interface DailyBarChartProps {
  data: any[];
  dataView: string;
}

export const DailyBarChart = ({ data, dataView }: DailyBarChartProps) => {
  const isMobile = useIsMobile();
  
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 40,
          bottom: 70,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: isMobile ? 10 : 12 }} 
          angle={-45}
          textAnchor="end"
          height={70}
          stroke="var(--muted-foreground)"
        />
        <YAxis 
          tick={{ fontSize: isMobile ? 10 : 12 }} 
          stroke="var(--muted-foreground)"
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar 
          dataKey={dataView === 'calls' ? 'calls' : 'credits'} 
          name={dataView === 'calls' ? 'API Calls' : 'Credits'} 
          fill="#04c8c8" 
          radius={[4, 4, 0, 0]} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
