
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CustomTooltip } from '@/components/charts/CustomTooltip';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for property liens endpoint usage over time
const mockLiensTimeData = {
  last7Days: [
    { date: '04/01', 'Property Liens': 25 },
    { date: '04/02', 'Property Liens': 35 },
    { date: '04/03', 'Property Liens': 20 },
    { date: '04/04', 'Property Liens': 40 },
    { date: '04/05', 'Property Liens': 30 },
    { date: '04/06', 'Property Liens': 45 },
    { date: '04/07', 'Property Liens': 35 },
  ],
  monthToDate: [
    { date: '04/01', 'Property Liens': 25 },
    { date: '04/02', 'Property Liens': 35 },
    { date: '04/03', 'Property Liens': 20 },
    { date: '04/04', 'Property Liens': 40 },
    { date: '04/05', 'Property Liens': 30 },
  ],
  last6Months: [
    { date: 'Oct', 'Property Liens': 680 },
    { date: 'Nov', 'Property Liens': 750 },
    { date: 'Dec', 'Property Liens': 820 },
    { date: 'Jan', 'Property Liens': 890 },
    { date: 'Feb', 'Property Liens': 720 },
    { date: 'Mar', 'Property Liens': 650 },
  ]
};

// Color for the chart
const LIENS_COLOR = '#0088FE';

interface LiensEndpointChartsProps {
  isLoading: boolean;
}

export const LiensEndpointCharts = ({ isLoading }: LiensEndpointChartsProps) => {
  const [timeRange, setTimeRange] = useState<string>('last7Days');
  const isMobile = useIsMobile();
  
  // Get the correct data based on selected time range
  const currentData = mockLiensTimeData[timeRange as keyof typeof mockLiensTimeData];
  
  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Property Liens Usage Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs 
            value={timeRange} 
            onValueChange={setTimeRange}
            className="mb-4"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="last7Days">Last 7 Days</TabsTrigger>
              <TabsTrigger value="monthToDate">Month to Date</TabsTrigger>
              <TabsTrigger value="last6Months">Last 6 Months</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={currentData}
                margin={{
                  top: 20,
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
                <Line 
                  type="monotone" 
                  dataKey="Property Liens" 
                  stroke={LIENS_COLOR} 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
