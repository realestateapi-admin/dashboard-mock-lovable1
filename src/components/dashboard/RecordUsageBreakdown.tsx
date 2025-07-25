
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { UsageBreakdownSkeleton } from "./LoadingState";
import { UsageDistributionItem } from "@/types/usage";
import { Badge } from "@/components/ui/badge";

interface RecordUsageBreakdownProps {
  usageDistributionData: UsageDistributionItem[];
  isLoading?: boolean;
  timePeriod?: 'daily' | 'monthly';
}

export const RecordUsageBreakdown = ({ 
  usageDistributionData, 
  isLoading = false,
  timePeriod = 'daily'
}: RecordUsageBreakdownProps) => {
  const isMobile = useIsMobile();
  const [chartHeight, setChartHeight] = useState(180);
  const [labelFormat, setLabelFormat] = useState<Function | null>(
    (props: any) => {
      if (!props) return '';
      const { name, percent } = props;
      return name ? `${name} ${(percent * 100).toFixed(0)}%` : '';
    }
  );

  // Format the time period display text
  const timeText = timePeriod === 'daily' ? 'today' : 'this month';

  // Adjust chart size and label format based on screen size
  useEffect(() => {
    if (isMobile) {
      setChartHeight(150);
      // On mobile, only show percentages without names to avoid overlap
      setLabelFormat((props: any) => {
        if (!props) return '';
        const { percent } = props;
        return percent ? `${(percent * 100).toFixed(0)}%` : '';
      });
    } else {
      setChartHeight(180);
      setLabelFormat((props: any) => {
        if (!props) return '';
        const { name, percent } = props;
        return name ? `${name} ${(percent * 100).toFixed(0)}%` : '';
      });
    }
  }, [isMobile]);

  // If data is empty, show an appropriate message
  if (usageDistributionData?.length === 0 && !isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Record Usage Breakdown</CardTitle>
          <CardDescription>
            Distribution of records by endpoint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-12 text-muted-foreground">
            No usage data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Usage Breakdown</CardTitle>
        <CardDescription className="flex items-center gap-2">
          Distribution of records by endpoint
          <Badge variant="outline" className="bg-primary-50 text-primary border-primary-200">
            {timePeriod === 'daily' ? 'Daily' : 'Monthly'}
          </Badge>
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
                    data={usageDistributionData || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={isMobile ? 30 : 40}
                    outerRadius={isMobile ? 60 : 80}
                    paddingAngle={2}
                    dataKey="value"
                    label={labelFormat}
                    labelLine={false}
                  >
                    {(usageDistributionData || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {(usageDistributionData || []).map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm">{item.value.toLocaleString()} records</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-muted-foreground text-center">
              Showing record distribution for {timeText}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
