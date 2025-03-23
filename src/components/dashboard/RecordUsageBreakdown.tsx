
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface UsageDistributionItem {
  name: string;
  value: number;
  fill: string;
}

interface RecordUsageBreakdownProps {
  usageDistributionData: UsageDistributionItem[];
}

export const RecordUsageBreakdown = ({ usageDistributionData }: RecordUsageBreakdownProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Usage Breakdown</CardTitle>
        <CardDescription>
          Distribution of records by endpoint
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center py-4">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={usageDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {usageDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} records`, ""]}
                contentStyle={{ 
                  backgroundColor: 'var(--background)', 
                  borderColor: 'var(--border)',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2 mt-4">
          {usageDistributionData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="text-sm">{item.value.toLocaleString()} records</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
