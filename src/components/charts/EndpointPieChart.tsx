
import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ActivePieShape } from './ActivePieShape';

interface EndpointPieChartProps {
  data: any[];
  colors: string[];
}

export const EndpointPieChart = ({ data, colors }: EndpointPieChartProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={ActivePieShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
