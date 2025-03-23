
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { UsageBreakdownSkeleton } from "./LoadingState";

interface UsageDistributionItem {
  name: string;
  value: number;
  fill: string;
}

interface RecordUsageBreakdownProps {
  usageDistributionData: UsageDistributionItem[];
  isLoading?: boolean;
}

export const RecordUsageBreakdown = ({ 
  usageDistributionData, 
  isLoading = false 
}: RecordUsageBreakdownProps) => {
  const isMobile = useIsMobile();
  const [chartHeight, setChartHeight] = useState(180);
  const [labelFormat, setLabelFormat] = useState<Function | null>(
    ({ name, percent }: { name: string; percent: number }) => 
      `${name} ${(percent * 100).toFixed(0)}%`
  );

  // Adjust chart size and label format based on screen size
  useEffect(() => {
    if (isMobile) {
      setChartHeight(150);
      // On mobile, only show percentages without names to avoid overlap
      setLabelFormat(({ percent }: { percent: number }) => 
        `${(percent * 100).toFixed(0)}%`
      );
    } else {
      setChartHeight(180);
      setLabelFormat(({ name, percent }: { name: string; percent: number }) => 
        `${name} ${(percent * 100).toFixed(0)}%`
      );
    }
  }, [isMobile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Usage Breakdown</CardTitle>
        <CardDescription>
          Distribution of records by endpoint
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <UsageBreakdownSkeleton />
        ) : (
          <>
            <div className="flex justify-center py-4">
              <ResponsiveContainer width="100%" height={chartHeight}>
                <PieChart>
                  <Pie
                    data={usageDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={isMobile ? 30 : 40}
                    outerRadius={isMobile ? 60 : 80}
                    paddingAngle={2}
                    dataKey="value"
                    label={labelFormat}
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
          </>
        )}
      </CardContent>
    </Card>
  );
};
