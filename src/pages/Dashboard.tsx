
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, AreaChart, XAxis, YAxis, Bar, Area, Tooltip, ResponsiveContainer, CartesianGrid, Cell, Legend, PieChart, Pie } from "recharts";
import { Copy, ExternalLink, Info, RefreshCw, Users, FileText, BarChart2, Code, AlertCircle, Activity, Database, FileBarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { ApiUsageSummary } from "@/components/dashboard/ApiUsageSummary";
import { RecentActivityList } from "@/components/dashboard/RecentActivityList";

// Mock data for usage charts with differentiation between calls and records
const dailyUsageData = [
  { date: "Mon", calls: 1423, records: 762 },
  { date: "Tue", calls: 1842, records: 985 },
  { date: "Wed", calls: 2210, records: 1105 },
  { date: "Thu", calls: 1890, records: 945 },
  { date: "Fri", calls: 2350, records: 1234 },
  { date: "Sat", calls: 1456, records: 658 },
  { date: "Sun", calls: 1245, records: 541 },
];

const monthlyUsageData = [
  { date: "Jan", calls: 24320, records: 12900 },
  { date: "Feb", calls: 28450, records: 15200 },
  { date: "Mar", calls: 35280, records: 19450 },
  { date: "Apr", calls: 32190, records: 17800 },
  { date: "May", calls: 41200, records: 22600 },
  { date: "Jun", calls: 49300, records: 26900 },
  { date: "Jul", calls: 52100, records: 28400 },
  { date: "Aug", calls: 58700, records: 31800 },
  { date: "Sep", calls: 65300, records: 35700 },
  { date: "Oct", calls: 71900, records: 39200 },
  { date: "Nov", calls: 79000, records: 43100 },
  { date: "Dec", calls: 86500, records: 47200 },
];

// Updated endpoint usage data with differentiation between calls and records
const endpointUsage = [
  { 
    endpoint: "/v2/PropertyDetail", 
    calls: 2456, 
    records: 2456, 
    percentage: 78.3,
    description: "Full property records (1 credit each)",
    creditCost: "1 credit per record"
  },
  { 
    endpoint: "/v2/PropertySearch", 
    calls: 1534, 
    records: 534, 
    percentage: 17.0,
    description: "Search with record fetch (1 credit each)",
    creditCost: "1 credit per record"
  },
  { 
    endpoint: "/v2/PropertyComps", 
    calls: 543, 
    records: 146, 
    percentage: 4.7,
    description: "Comparative property analysis",
    creditCost: "1 credit per record"
  },
  { 
    endpoint: "/v2/PropertyAutocomplete", 
    calls: 1320, 
    records: 0, 
    percentage: 0,
    description: "Address suggestions (unlimited)",
    creditCost: "Free"
  },
  { 
    endpoint: "/v2/PropertyCount", 
    calls: 239, 
    records: 0, 
    percentage: 0,
    description: "Count-only queries (no records)",
    creditCost: "Free"
  },
];

// Pie chart data for usage breakdown
const usageDistributionData = [
  { name: 'Property Details', value: 2456, fill: '#04c8c8' },
  { name: 'Property Search', value: 534, fill: '#5014d0' },
  { name: 'Property Comps', value: 146, fill: '#a78bfa' },
];

// Updated recent activity data with distinction between calls and records
const recentActivity = [
  { 
    id: 1, 
    type: "api_call", 
    endpoint: "/v2/PropertyDetail",
    timestamp: "2 minutes ago", 
    status: "success",
    recordsFetched: 1,
    creditCost: 1
  },
  { 
    id: 2, 
    type: "api_call", 
    endpoint: "/v2/PropertySearch",
    timestamp: "15 minutes ago", 
    status: "success",
    recordsFetched: 3,
    creditCost: 3
  },
  { 
    id: 3, 
    type: "rate_limit", 
    endpoint: "/v2/PropertyDetail",
    timestamp: "24 minutes ago", 
    status: "warning",
    recordsFetched: 0,
    creditCost: 0
  },
  { 
    id: 4, 
    type: "api_call", 
    endpoint: "/v2/PropertyComps",
    timestamp: "1 hour ago", 
    status: "success",
    recordsFetched: 5,
    creditCost: 5
  },
  { 
    id: 5, 
    type: "api_call", 
    endpoint: "/v2/PropertyAutocomplete",
    timestamp: "2 hours ago", 
    status: "success",
    recordsFetched: 0,
    creditCost: 0
  },
  { 
    id: 6, 
    type: "error", 
    endpoint: "/v2/PropertyDetail",
    timestamp: "3 hours ago", 
    status: "error",
    recordsFetched: 0,
    creditCost: 0
  },
];

const Dashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const { isTrialActive, trialDaysLeft, requestTrialExtension } = useTrialAlert();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    toast({
      title: "Dashboard refreshed",
      description: "Your data has been updated with the latest information.",
    });
  };

  const handleCopyAPIKey = () => {
    navigator.clipboard.writeText("test_k6ftg5s7d8v9t3f2r1o9p8m7n6b5v4c3x2");
    toast({
      title: "API key copied",
      description: "Your API key has been copied to the clipboard.",
    });
  };

  // Calculate totals for summary cards
  const totalApiCalls = dailyUsageData.reduce((sum, day) => sum + day.calls, 0);
  const totalRecords = dailyUsageData.reduce((sum, day) => sum + day.records, 0);
  const recordsPercentage = (totalRecords / 10000) * 100; // Assuming 10,000 is the monthly limit
  
  // Calculate monthly totals
  const monthlyApiCalls = monthlyUsageData.reduce((sum, month) => sum + month.calls, 0);
  const monthlyRecords = monthlyUsageData.reduce((sum, month) => sum + month.records, 0);
  const monthlyRecordsPercentage = (monthlyRecords / 300000) * 100; // Assuming 300,000 is the monthly limit

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1c3238]">Dashboard</h1>
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>
      
      {isTrialActive && (
        <Alert className="bg-[#04c8c8]/10 border-[#04c8c8]">
          <AlertCircle className="h-4 w-4 text-[#04c8c8]" />
          <AlertTitle className="text-[#04c8c8] font-medium">Trial Mode Active</AlertTitle>
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <p>You have <span className="font-medium text-[#04c8c8]">{trialDaysLeft} days</span> left in your trial period.</p>
              <Progress value={(14 - trialDaysLeft) / 14 * 100} className="h-2 mt-2 bg-[#e2e8f0]" indicatorClassName="bg-[#04c8c8]" />
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <Button size="sm" className="bg-[#5014d0] hover:bg-[#5014d0]/90" asChild>
                <Link to="/dashboard/billing">Upgrade Now</Link>
              </Button>
              <Button size="sm" variant="outline" className="text-[#5014d0] border-[#5014d0] hover:bg-[#5014d0]/10" onClick={requestTrialExtension}>
                Request Extension
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">API Calls Today</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApiCalls.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +18.2% from yesterday
              </p>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger>
                    <div className="mt-4 flex items-center gap-2">
                      <Badge variant="outline" className="bg-primary-teal/5 text-primary-teal">Info</Badge>
                      <p className="text-xs text-muted-foreground">Includes all API requests</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-[200px]">API calls include all requests, including those that don't consume credits (like autocomplete and count-only queries).</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Property Records Used</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRecords.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12.4% from yesterday
              </p>
              <div className="mt-4 h-1 w-full bg-secondary">
                <div
                  className="h-1 bg-primary-teal"
                  style={{ width: `${recordsPercentage}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{recordsPercentage.toFixed(1)}% of daily limit</p>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-500 border-yellow-200">Credits</Badge>
                      <p className="text-xs text-muted-foreground">Counts against your plan</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-[200px]">Only property records actually fetched count against your monthly plan allowance. Each record costs 1 credit.</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Monthly Usage</CardTitle>
              <FileBarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyRecords.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Records used this month
              </p>
              <div className="mt-4 h-1 w-full bg-secondary">
                <div
                  className="h-1 bg-primary-teal"
                  style={{ width: `${monthlyRecordsPercentage}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{monthlyRecordsPercentage.toFixed(1)}% of monthly limit</p>
              <div className="mt-2 flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Total API Calls:</span>
                <span className="font-medium">{monthlyApiCalls.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Billing</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isTrialActive ? "Free Trial" : "$99.00"}</div>
              <p className="text-xs text-muted-foreground">
                {isTrialActive 
                  ? `Ends in ${trialDaysLeft} days` 
                  : "Next payment on Mar 1, 2024"}
              </p>
              <div className="mt-4">
                <Badge variant="outline" className="bg-primary-teal/5 text-primary-teal">
                  {isTrialActive ? "Trial" : "Professional Plan"}
                </Badge>
              </div>
              <div className="mt-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/dashboard/billing">
                    {isTrialActive ? "Choose a Plan" : "Manage Subscription"}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="lg:col-span-2"
        >
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
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest API calls and record usage
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[240px] px-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <div className={`mt-1.5 h-2 w-2 rounded-full ${
                        activity.status === "success" ? "bg-green-500" :
                        activity.status === "warning" ? "bg-yellow-500" :
                        "bg-red-500"
                      }`} />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.endpoint}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.timestamp}
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <Badge variant="outline" className="text-xs">
                            {activity.type === "api_call" ? "API Call" :
                             activity.type === "rate_limit" ? "Rate Limited" :
                             "Error"}
                          </Badge>
                          {activity.recordsFetched > 0 && (
                            <Badge className="text-xs bg-primary-teal">
                              {activity.recordsFetched} {activity.recordsFetched === 1 ? 'Record' : 'Records'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Endpoint Usage</CardTitle>
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-xs">Only property records fetched count toward your plan limit. Some endpoints like Autocomplete and Count-only queries are free and don't consume credits.</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </div>
              <CardDescription>
                Breakdown by endpoint with credit usage details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {endpointUsage.map((endpoint) => (
                <div key={endpoint.endpoint} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{endpoint.endpoint}</p>
                        <TooltipProvider>
                          <UITooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                                <Info className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">{endpoint.description}</p>
                              <p className="text-xs font-medium mt-1">{endpoint.creditCost}</p>
                            </TooltipContent>
                          </UITooltip>
                        </TooltipProvider>
                      </div>
                      <p className="text-xs text-muted-foreground">{endpoint.description}</p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1 mt-1 sm:mt-0">
                      <div className="flex gap-4">
                        <div className="flex gap-2 items-baseline">
                          <span className="text-xs text-muted-foreground">Calls:</span>
                          <span className="text-sm">{endpoint.calls.toLocaleString()}</span>
                        </div>
                        <div className="flex gap-2 items-baseline">
                          <span className="text-xs text-muted-foreground">Records:</span>
                          <span className="text-sm">{endpoint.records.toLocaleString()}</span>
                        </div>
                      </div>
                      {endpoint.records > 0 && (
                        <Badge variant="outline" className="text-xs bg-primary-teal/10 text-primary-teal">
                          {endpoint.percentage}% of record usage
                        </Badge>
                      )}
                    </div>
                  </div>
                  {endpoint.records > 0 && (
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#04c8c8] rounded-full"
                        style={{ width: `${endpoint.percentage}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/dashboard/usage">
                    View Detailed Usage Analytics
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#04c8c8' }} />
                    <span className="text-sm">Property Details</span>
                  </div>
                  <span className="text-sm">2,456 records</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#5014d0' }} />
                    <span className="text-sm">Property Search</span>
                  </div>
                  <span className="text-sm">534 records</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#a78bfa' }} />
                    <span className="text-sm">Property Comps</span>
                  </div>
                  <span className="text-sm">146 records</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>API Access</CardTitle>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">Your API key should be kept confidential. Use this key to authenticate your API requests.</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <CardDescription>
              Use these credentials to authenticate your API requests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">API Key</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 gap-1 text-xs"
                  onClick={handleCopyAPIKey}
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </Button>
              </div>
              <div className="flex h-10 items-center rounded-md border bg-muted px-4 text-sm font-mono">
                {isTrialActive ? "test_" : "prod_"}k6ftg5s7d8v9t3f2r1o9p8m7n6b5v4c3x2
              </div>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  asChild
                >
                  <Link to="/dashboard/api-keys">
                    Manage API Keys
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Documentation</Label>
              <Button variant="outline" className="w-full justify-start text-sm" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Code className="h-4 w-4 mr-2" />
                  View API Documentation
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

// Missing Label component
function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  )
}

export default Dashboard;
