
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EndpointUsageCharts } from '@/components/charts/EndpointUsageCharts';

// Mock data for skip trace endpoint usage
const mockSkipTraceEndpointData = [
  { name: 'Skip Trace', value: 65, calls: 650, description: 'Individual skip trace lookups' },
  { name: 'Skip Trace Bulk Await', value: 35, calls: 350, description: 'Bulk skip trace operations' },
];

// Colors for the charts
const SKIP_TRACE_COLORS = ['#5014d0', '#a78bfa'];

interface DemographicEndpointChartsProps {
  isLoading: boolean;
}

export const DemographicEndpointCharts = ({ isLoading }: DemographicEndpointChartsProps) => {
  // State to track view mode (calls vs credits)
  const [dataView, setDataView] = useState<string>('calls');
  
  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Skip Trace Endpoint Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <EndpointUsageCharts 
            endpointData={mockSkipTraceEndpointData} 
            dataView={dataView}
            colors={SKIP_TRACE_COLORS}
          />
        </CardContent>
      </Card>
    </div>
  );
};
