
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, AreaChart, XAxis, YAxis, Bar, Area, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

interface UsageData {
  date: string;
  calls: number;
  records: number;
}

interface UsageChartsProps {
  dailyUsageData: UsageData[];
  monthlyUsageData: UsageData[];
}

export const UsageCharts = ({ dailyUsageData, monthlyUsageData }: UsageChartsProps) => {
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
          <TabsContent value="daily" className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={dailyUsageData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--background)', 
                    borderColor: 'var(--border)',
                    borderRadius: 'var(--radius)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value, name) => [value.toLocaleString(), name === 'calls' ? 'API Calls' : 'Records Used']}
                />
                <Legend 
                  formatter={(value) => value === 'calls' ? 'API Calls' : 'Records Used'} 
                  iconType="circle"
                />
                <Bar name="calls" dataKey="calls" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                <Bar name="records" dataKey="records" fill="#04c8c8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="monthly" className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyUsageData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--background)', 
                    borderColor: 'var(--border)',
                    borderRadius: 'var(--radius)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value, name) => [value.toLocaleString(), name === 'calls' ? 'API Calls' : 'Records Used']}
                />
                <Legend 
                  formatter={(value) => value === 'calls' ? 'API Calls' : 'Records Used'} 
                  iconType="circle"
                />
                <Area name="calls" type="monotone" dataKey="calls" fill="#a78bfa" fillOpacity={0.2} stroke="#a78bfa" />
                <Area name="records" type="monotone" dataKey="records" fill="#04c8c8" fillOpacity={0.2} stroke="#04c8c8" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
};
