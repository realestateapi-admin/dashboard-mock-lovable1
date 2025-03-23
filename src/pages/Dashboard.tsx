
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, AreaChart, XAxis, YAxis, Bar, Area, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Copy, ExternalLink, Info, RefreshCw, Users, FileText, BarChart2, Code, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

// Mock data for usage charts
const dailyUsageData = [
  { date: "Mon", value: 1423 },
  { date: "Tue", value: 1842 },
  { date: "Wed", value: 2210 },
  { date: "Thu", value: 1890 },
  { date: "Fri", value: 2350 },
  { date: "Sat", value: 1456 },
  { date: "Sun", value: 1245 },
];

const monthlyUsageData = [
  { date: "Jan", value: 24320 },
  { date: "Feb", value: 28450 },
  { date: "Mar", value: 35280 },
  { date: "Apr", value: 32190 },
  { date: "May", value: 41200 },
  { date: "Jun", value: 49300 },
  { date: "Jul", value: 52100 },
  { date: "Aug", value: 58700 },
  { date: "Sep", value: 65300 },
  { date: "Oct", value: 71900 },
  { date: "Nov", value: 79000 },
  { date: "Dec", value: 86500 },
];

// Updated endpoint usage data with real endpoint names
const endpointUsage = [
  { endpoint: "/v2/PropertyDetail", calls: 2456, percentage: 50.2 },
  { endpoint: "/v2/PropertySearch", calls: 1534, percentage: 31.4 },
  { endpoint: "/v2/PropertyComps", calls: 543, percentage: 11.1 },
  { endpoint: "/v2/PropertyAutocomplete", calls: 320, percentage: 6.5 },
  { endpoint: "/v2/PropertyMapping", calls: 39, percentage: 0.8 },
];

// Updated recent activity data with real endpoint names
const recentActivity = [
  { 
    id: 1, 
    type: "api_call", 
    endpoint: "/v2/PropertyDetail",
    timestamp: "2 minutes ago", 
    status: "success" 
  },
  { 
    id: 2, 
    type: "api_call", 
    endpoint: "/v2/PropertySearch",
    timestamp: "15 minutes ago", 
    status: "success" 
  },
  { 
    id: 3, 
    type: "rate_limit", 
    endpoint: "/v2/PropertyDetail",
    timestamp: "24 minutes ago", 
    status: "warning" 
  },
  { 
    id: 4, 
    type: "api_call", 
    endpoint: "/v2/PropertyComps",
    timestamp: "1 hour ago", 
    status: "success" 
  },
  { 
    id: 5, 
    type: "api_call", 
    endpoint: "/v2/PropertySearch",
    timestamp: "2 hours ago", 
    status: "success" 
  },
  { 
    id: 6, 
    type: "error", 
    endpoint: "/v2/PropertyDetail",
    timestamp: "3 hours ago", 
    status: "error" 
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
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,892</div>
              <p className="text-xs text-muted-foreground">
                +18.2% from yesterday
              </p>
              <div className="mt-4 h-1 w-full bg-secondary">
                <div
                  className="h-1 bg-primary-teal"
                  style={{ width: "48.9%" }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">48.9% of daily limit</p>
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
              <CardTitle className="text-sm font-medium">Monthly Usage</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">86,240</div>
              <p className="text-xs text-muted-foreground">
                +12.4% from last month
              </p>
              <div className="mt-4 h-1 w-full bg-secondary">
                <div
                  className="h-1 bg-primary-teal"
                  style={{ width: "28.7%" }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">28.7% of monthly limit</p>
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
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                +1 from last week
              </p>
              <div className="mt-4 flex items-center gap-1">
                <div className="flex -space-x-2">
                  <div className="h-7 w-7 rounded-full border-2 border-background bg-primary-teal/20 flex items-center justify-center text-xs font-medium">JD</div>
                  <div className="h-7 w-7 rounded-full border-2 border-background bg-primary-teal/20 flex items-center justify-center text-xs font-medium">AR</div>
                  <div className="h-7 w-7 rounded-full border-2 border-background bg-primary-teal/20 flex items-center justify-center text-xs font-medium">TM</div>
                </div>
                <Button variant="outline" size="sm" className="h-7 rounded-full">
                  <Plus className="h-3 w-3" />
                </Button>
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
              <CardTitle>API Usage</CardTitle>
              <CardDescription>
                Your API usage over time
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
                      />
                      <Bar dataKey="value" fill="#04c8c8" radius={4} />
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
                      />
                      <Area type="monotone" dataKey="value" fill="#04c8c8" fillOpacity={0.2} stroke="#04c8c8" />
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
                Latest API calls and system events
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
                        <div className="flex items-center pt-1">
                          <Badge variant="outline" className="text-xs">
                            {activity.type === "api_call" ? "API Call" :
                             activity.type === "rate_limit" ? "Rate Limited" :
                             "Error"}
                          </Badge>
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
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.3 }}
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
                    <p className="text-xs">Usage breakdown by endpoint. Each endpoint has different credit costs and rate limits.</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <CardDescription>
              Breakdown of your API usage by endpoint
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {endpointUsage.map((endpoint) => (
              <div key={endpoint.endpoint} className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">{endpoint.endpoint}</p>
                  <div className="flex gap-2">
                    <p className="text-sm">{endpoint.calls.toLocaleString()} calls</p>
                    <p className="text-sm text-muted-foreground">{endpoint.percentage}%</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#04c8c8] rounded-full"
                    style={{ width: `${endpoint.percentage}%` }}
                  />
                </div>
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

// Missing Plus component
function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

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
