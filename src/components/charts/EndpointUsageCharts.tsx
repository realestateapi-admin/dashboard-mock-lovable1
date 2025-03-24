
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EndpointPieChart } from './EndpointPieChart';
import { EndpointBarChart } from './EndpointBarChart';

interface EndpointUsageChartsProps {
  endpointData: any[];
  dataView: string;
  colors: string[];
}

export const EndpointUsageCharts = ({ endpointData, dataView, colors }: EndpointUsageChartsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Endpoint Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <EndpointPieChart data={endpointData} colors={colors} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Endpoint Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <EndpointBarChart data={endpointData} dataView={dataView} />
        </CardContent>
      </Card>
    </div>
  );
};
