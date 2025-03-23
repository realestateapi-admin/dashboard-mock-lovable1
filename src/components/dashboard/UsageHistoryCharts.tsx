
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend,
  PieChart,
  Pie,
  Cell,
  Sector
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UsageHistoryEntry } from '@/types/usage';
import { useIsMobile } from '@/hooks/use-mobile';

interface UsageHistoryChartsProps {
  data: UsageHistoryEntry[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a78bfa'];

const UsageHistoryCharts = ({ data }: UsageHistoryChartsProps) => {
  const [chartType, setChartType] = useState("daily");
  const [dataView, setDataView] = useState("calls");
  const isMobile = useIsMobile();
  
  // Format data for charts
  const prepareDailyData = () => {
    const dailyMap = new Map();
    
    data.forEach(entry => {
      const date = entry.timestamp.split('T')[0];
      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          date,
          calls: 0,
          credits: 0,
          'Property Search': 0,
          'Property Detail': 0,
          'Property Comps': 0,
          'Autocomplete': 0,
          'Mapping': 0
        });
      }
      
      const day = dailyMap.get(date);
      day.calls += 1;
      day.credits += entry.credits;
      
      // Increment the count for the specific endpoint
      if (day[entry.endpoint] !== undefined) {
        day[entry.endpoint] += 1;
      }
    });
    
    return Array.from(dailyMap.values())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };
  
  const prepareEndpointData = () => {
    const endpointMap = new Map();
    
    data.forEach(entry => {
      if (!endpointMap.has(entry.endpoint)) {
        endpointMap.set(entry.endpoint, {
          name: entry.endpoint,
          calls: 0,
          credits: 0,
          value: 0 // For pie chart
        });
      }
      
      const endpoint = endpointMap.get(entry.endpoint);
      endpoint.calls += 1;
      endpoint.credits += entry.credits;
      endpoint.value += dataView === 'calls' ? 1 : entry.credits;
    });
    
    return Array.from(endpointMap.values());
  };
  
  const dailyData = prepareDailyData();
  const endpointData = prepareEndpointData();
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-md">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Active shape for pie chart
  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="currentColor" fontSize={12}>{payload.name}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="currentColor" fontSize={12}>
          {`${value.toLocaleString()} (${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

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
        <Card>
          <CardHeader>
            <CardTitle>Daily Usage Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={dailyData}
                margin={{
                  top: 5,
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
                <Bar 
                  dataKey={dataView === 'calls' ? 'calls' : 'credits'} 
                  name={dataView === 'calls' ? 'API Calls' : 'Credits'} 
                  fill="#04c8c8" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Endpoint Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={dailyData}
                margin={{
                  top: 5,
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
                <Line type="monotone" dataKey="Property Search" stroke="#0088FE" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Property Detail" stroke="#00C49F" />
                <Line type="monotone" dataKey="Property Comps" stroke="#FFBB28" />
                <Line type="monotone" dataKey="Autocomplete" stroke="#FF8042" />
                <Line type="monotone" dataKey="Mapping" stroke="#a78bfa" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="endpoint" className="mt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Endpoint Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={endpointData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {endpointData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Endpoint Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={endpointData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 80,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border)" />
                  <XAxis 
                    type="number" 
                    tick={{ fontSize: isMobile ? 10 : 12 }} 
                    stroke="var(--muted-foreground)"
                  />
                  <YAxis 
                    type="category"
                    dataKey="name" 
                    tick={{ fontSize: isMobile ? 10 : 12 }} 
                    width={80}
                    stroke="var(--muted-foreground)"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey={dataView === 'calls' ? 'calls' : 'credits'} 
                    name={dataView === 'calls' ? 'API Calls' : 'Credits'} 
                    fill="#5014d0" 
                    radius={[0, 4, 4, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </div>
  );
};

export default UsageHistoryCharts;
