
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, AreaChart, PieChart, XAxis, YAxis, Bar, Area, Pie, Cell, 
  Tooltip, Legend, ResponsiveContainer, CartesianGrid 
} from "recharts";
import { DownloadIcon, FilterIcon, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

// Mock data for API usage by endpoint
const apiUsageByEndpoint = [
  { name: "/properties/search", value: 42300 },
  { name: "/properties/details", value: 21800 },
  { name: "/market/trends", value: 15600 },
  { name: "/properties/valuation", value: 9800 },
  { name: "/agents/nearby", value: 7500 },
];

// Mock data for daily API usage
const dailyApiUsage = [
  { date: "Oct 1", successful: 3200, failed: 120 },
  { date: "Oct 2", successful: 3500, failed: 90 },
  { date: "Oct 3", successful: 3700, failed: 110 },
  { date: "Oct 4", successful: 3600, failed: 85 },
  { date: "Oct 5", successful: 4100, failed: 105 },
  { date: "Oct 6", successful: 4300, failed: 95 },
  { date: "Oct 7", successful: 4150, failed: 100 },
  { date: "Oct 8", successful: 4400, failed: 120 },
  { date: "Oct 9", successful: 4600, failed: 110 },
  { date: "Oct 10", successful: 4500, failed: 95 },
  { date: "Oct 11", successful: 4800, failed: 140 },
  { date: "Oct 12", successful: 5100, failed: 130 },
  { date: "Oct 13", successful: 5300, failed: 125 },
  { date: "Oct 14", successful: 5200, failed: 115 },
];

// Mock data for monthly API usage
const monthlyApiUsage = [
  { month: "Jan", value: 120000 },
  { month: "Feb", value: 135000 },
  { month: "Mar", value: 148000 },
  { month: "Apr", value: 162000 },
  { month: "May", value: 175000 },
  { month: "Jun", value: 190000 },
  { month: "Jul", value: 205000 },
  { month: "Aug", value: 220000 },
  { month: "Sep", value: 237000 },
  { month: "Oct", value: 254000 },
  { month: "Nov", value: 0 },
  { month: "Dec", value: 0 },
];

// Chart colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

const ApiUsage = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    toast({
      title: "Usage data refreshed",
      description: "Your API usage data has been updated.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Report downloaded",
      description: "Your API usage report has been downloaded.",
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">API Usage</h1>
          <p className="text-muted-foreground mt-1">
            Detailed analytics of your API calls and usage patterns
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 self-stretch sm:self-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left font-normal w-full sm:w-[240px]"
              >
                <FilterIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "MMMM yyyy") : "Select month"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                defaultMonth={date}
                showOutsideDays={false}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle>Usage Over Time</CardTitle>
              <CardDescription>
                Track your API usage trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="daily" className="mt-1">
                <TabsList>
                  <TabsTrigger value="daily">Daily (Last 14 Days)</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly (This Year)</TabsTrigger>
                </TabsList>
                <TabsContent value="daily" className="pt-4 h-[380px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyApiUsage} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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
                      />
                      <Legend />
                      <Bar dataKey="successful" name="Successful" stackId="a" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="failed" name="Failed" stackId="a" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="monthly" className="pt-4 h-[380px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyApiUsage} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                      <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--background)', 
                          borderColor: 'var(--border)',
                          borderRadius: 'var(--radius)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        name="API Calls" 
                        fill="hsl(var(--primary) / 0.2)" 
                        stroke="hsl(var(--primary))" 
                        activeDot={{ r: 6 }} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle>Usage by Endpoint</CardTitle>
              <CardDescription>
                Distribution of API calls across endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[380px] w-full flex flex-col">
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={apiUsageByEndpoint}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {apiUsageByEndpoint.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--background)', 
                          borderColor: 'var(--border)',
                          borderRadius: 'var(--radius)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        }} 
                        formatter={(value: number) => [`${value.toLocaleString()} calls`, 'Calls']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="border-t pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={handleDownload}
                  >
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Usage Details</CardTitle>
            <CardDescription>
              Detailed breakdown of your API usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground">Endpoint</th>
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground">Method</th>
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground">Calls</th>
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground">Success Rate</th>
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground">Avg. Response Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono text-xs">/properties/search</td>
                    <td className="py-3 px-4">GET</td>
                    <td className="py-3 px-4">42,300</td>
                    <td className="py-3 px-4">99.7%</td>
                    <td className="py-3 px-4">124ms</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono text-xs">/properties/details</td>
                    <td className="py-3 px-4">GET</td>
                    <td className="py-3 px-4">21,800</td>
                    <td className="py-3 px-4">99.9%</td>
                    <td className="py-3 px-4">87ms</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono text-xs">/market/trends</td>
                    <td className="py-3 px-4">GET</td>
                    <td className="py-3 px-4">15,600</td>
                    <td className="py-3 px-4">99.8%</td>
                    <td className="py-3 px-4">156ms</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono text-xs">/properties/valuation</td>
                    <td className="py-3 px-4">POST</td>
                    <td className="py-3 px-4">9,800</td>
                    <td className="py-3 px-4">98.5%</td>
                    <td className="py-3 px-4">210ms</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-xs">/agents/nearby</td>
                    <td className="py-3 px-4">GET</td>
                    <td className="py-3 px-4">7,500</td>
                    <td className="py-3 px-4">99.5%</td>
                    <td className="py-3 px-4">98ms</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ApiUsage;
