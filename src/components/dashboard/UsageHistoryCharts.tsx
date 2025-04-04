
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UsageHistoryEntry } from '@/types/usage';
import { prepareDailyData, prepareEndpointData } from '@/utils/chartDataUtils';
import { DailyUsageCharts } from '@/components/charts/DailyUsageCharts';
import { EndpointUsageCharts } from '@/components/charts/EndpointUsageCharts';

interface UsageHistoryChartsProps {
  data: UsageHistoryEntry[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a78bfa'];

const UsageHistoryCharts = ({ data }: UsageHistoryChartsProps) => {
  const [chartType, setChartType] = useState("daily");
  const [dataView, setDataView] = useState("calls");
  
  // Prepare data for charts
  const dailyData = prepareDailyData(data);
  const endpointData = prepareEndpointData(data, dataView);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
        <Tabs value={chartType} onValueChange={setChartType}>
          <TabsList>
            <TabsTrigger value="daily">Daily Usage</TabsTrigger>
            <TabsTrigger value="endpoint">By Endpoint</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Select value={dataView} onValueChange={setDataView}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="calls">API Calls</SelectItem>
            <SelectItem value="credits">Credits Used</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <TabsContent value="daily" className="mt-0">
        <DailyUsageCharts dailyData={dailyData} dataView={dataView} />
      </TabsContent>
      
      <TabsContent value="endpoint" className="mt-0">
        <EndpointUsageCharts 
          endpointData={endpointData} 
          dataView={dataView} 
          colors={COLORS} 
        />
      </TabsContent>
    </div>
  );
};

export default UsageHistoryCharts;
