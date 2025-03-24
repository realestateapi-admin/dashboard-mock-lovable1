
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyBarChart } from './DailyBarChart';
import { EndpointLineChart } from './EndpointLineChart';

interface DailyUsageChartsProps {
  dailyData: any[];
  dataView: string;
}

export const DailyUsageCharts = ({ dailyData, dataView }: DailyUsageChartsProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Daily Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <DailyBarChart data={dailyData} dataView={dataView} />
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Endpoint Usage Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <EndpointLineChart data={dailyData} />
        </CardContent>
      </Card>
    </>
  );
};
