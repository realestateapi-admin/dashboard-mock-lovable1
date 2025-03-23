
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, AreaChart, XAxis, YAxis, Bar, Area, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChartSkeleton } from "./LoadingState";

interface UsageData {
  date: string;
  calls: number;
  records: number;
}

interface UsageChartsProps {
  dailyUsageData: UsageData[];
  monthlyUsageData: UsageData[];
  isLoading?: boolean;
}

export const UsageCharts = ({ 
  dailyUsageData, 
  monthlyUsageData, 
  isLoading = false 
}: UsageChartsProps) => {
  const isMobile = useIsMobile();
  const [chartHeight, setChartHeight] = useState(240);
  
  // Adjust chart height based on screen size
  useEffect(() => {
    setChartHeight(isMobile ? 200 : 240);
  }, [isMobile]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Usage Analytics</CardTitle>
        <CardDescription>
          API calls vs. property records used
        </CardDescription>
        <Tabs defaultValue="daily" className="mt-3">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <>
              <TabsContent value="daily" className="pt-4">
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
              </TabsContent>
              <TabsContent value="monthly" className="pt-4">
                <ResponsiveContainer width="100%" height={chartHeight}>
                  <AreaChart 
                    data={monthlyUsageData} 
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
                      interval={isMobile ? 2 : 0}
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
                    <Area name="calls" type="monotone" dataKey="calls" fill="#a78bfa" fillOpacity={0.2} stroke="#a78bfa" />
                    <Area name="records" type="monotone" dataKey="records" fill="#04c8c8" fillOpacity={0.2} stroke="#04c8c8" />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardHeader>
    </Card>
  );
};
