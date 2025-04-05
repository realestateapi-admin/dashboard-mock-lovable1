
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CustomTooltip } from '@/components/charts/CustomTooltip';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for skip trace endpoint usage over time
const mockSkipTraceTimeData = {
  monthToDate: [
    { date: '04/01', 'Skip Trace': 45, 'Skip Trace Bulk Await': 20 },
    { date: '04/02', 'Skip Trace': 55, 'Skip Trace Bulk Await': 30 },
    { date: '04/03', 'Skip Trace': 40, 'Skip Trace Bulk Await': 15 },
    { date: '04/04', 'Skip Trace': 60, 'Skip Trace Bulk Await': 25 },
    { date: '04/05', 'Skip Trace': 50, 'Skip Trace Bulk Await': 35 },
  ],
  yearToDate: [
    { date: 'Jan', 'Skip Trace': 450, 'Skip Trace Bulk Await': 220 },
    { date: 'Feb', 'Skip Trace': 520, 'Skip Trace Bulk Await': 350 },
    { date: 'Mar', 'Skip Trace': 480, 'Skip Trace Bulk Await': 300 },
    { date: 'Apr', 'Skip Trace': 250, 'Skip Trace Bulk Await': 145 },
  ],
  allTime: [
    { date: '2023 Q1', 'Skip Trace': 1250, 'Skip Trace Bulk Await': 750 },
    { date: '2023 Q2', 'Skip Trace': 1450, 'Skip Trace Bulk Await': 850 },
    { date: '2023 Q3', 'Skip Trace': 1650, 'Skip Trace Bulk Await': 950 },
    { date: '2023 Q4', 'Skip Trace': 1850, 'Skip Trace Bulk Await': 1050 },
    { date: '2024 Q1', 'Skip Trace': 1450, 'Skip Trace Bulk Await': 870 },
    { date: '2024 Q2', 'Skip Trace': 250, 'Skip Trace Bulk Await': 145 },
  ]
};

// Colors for the charts
const SKIP_TRACE_COLORS = {
  'Skip Trace': '#5014d0',
  'Skip Trace Bulk Await': '#a78bfa'
};

interface DemographicEndpointChartsProps {
  isLoading: boolean;
}

export const DemographicEndpointCharts = ({ isLoading }: DemographicEndpointChartsProps) => {
  const [timeRange, setTimeRange] = useState<string>('monthToDate');
  const isMobile = useIsMobile();
  
  // Get the correct data based on selected time range
  const currentData = mockSkipTraceTimeData[timeRange as keyof typeof mockSkipTraceTimeData];
  
  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Skip Trace Usage Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs 
            value={timeRange} 
            onValueChange={setTimeRange}
            className="mb-4"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="monthToDate">Month to Date</TabsTrigger>
              <TabsTrigger value="yearToDate">Year to Date</TabsTrigger>
              <TabsTrigger value="allTime">All Time</TabsTrigger>
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
                  dataKey="Skip Trace" 
                  stroke={SKIP_TRACE_COLORS['Skip Trace']} 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="Skip Trace Bulk Await" 
                  stroke={SKIP_TRACE_COLORS['Skip Trace Bulk Await']} 
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
