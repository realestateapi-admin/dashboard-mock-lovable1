
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import { CustomTooltip } from './CustomTooltip';

interface EndpointBarChartProps {
  data: any[];
  dataView: string;
}

export const EndpointBarChart = ({ data, dataView }: EndpointBarChartProps) => {
  const isMobile = useIsMobile();
  
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 80,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border)" />
        <XAxis 
          type="number" 
          tick={{ fontSize: isMobile ? 10 : 12 }} 
          stroke="var(--muted-foreground)"
        />
        <YAxis 
          type="category"
          dataKey="name" 
          tick={{ fontSize: isMobile ? 10 : 12 }} 
          width={80}
          stroke="var(--muted-foreground)"
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar 
          dataKey={dataView === 'calls' ? 'calls' : 'credits'} 
          name={dataView === 'calls' ? 'API Calls' : 'Credits'} 
          fill="#5014d0" 
          radius={[0, 4, 4, 0]} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
