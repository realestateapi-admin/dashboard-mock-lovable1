
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import { CustomTooltip } from './CustomTooltip';

interface EndpointLineChartProps {
  data: any[];
}

export const EndpointLineChart = ({ data }: EndpointLineChartProps) => {
  const isMobile = useIsMobile();
  
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
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
        <Line type="monotone" dataKey="Property Search" stroke="#0088FE" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Property Detail" stroke="#00C49F" />
        <Line type="monotone" dataKey="Property Comps" stroke="#FFBB28" />
        <Line type="monotone" dataKey="Autocomplete" stroke="#FF8042" />
        <Line type="monotone" dataKey="Mapping" stroke="#a78bfa" />
      </LineChart>
    </ResponsiveContainer>
  );
};
