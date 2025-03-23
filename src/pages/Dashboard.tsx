import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { ApiUsageSummary } from "@/components/dashboard/ApiUsageSummary";
import { RecentActivityList } from "@/components/dashboard/RecentActivityList";
import { DashboardSummary } from "@/components/dashboard/DashboardSummary";
import { UsageCharts } from "@/components/dashboard/UsageCharts";
import { EndpointUsageSection } from "@/components/dashboard/EndpointUsageSection";
import { RecordUsageBreakdown } from "@/components/dashboard/RecordUsageBreakdown";
import { ApiAccessSection } from "@/components/dashboard/ApiAccessSection";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CardSkeleton } from "@/components/dashboard/LoadingState";

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

const usageDistributionData = [
  { name: 'Property Details', value: 2456, fill: '#04c8c8' },
  { name: 'Property Search', value: 534, fill: '#5014d0' },
  { name: 'Property Comps', value: 146, fill: '#a78bfa' },
];

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
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { isTrialActive, trialDaysLeft, requestTrialExtension } = useTrialAlert();

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(loadingTimer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    setIsLoading(false);
    toast({
      title: "Dashboard refreshed",
      description: "Your data has been updated with the latest information.",
    });
  };

  const totalApiCalls = dailyUsageData.reduce((sum, day) => sum + day.calls, 0);
  const totalRecords = dailyUsageData.reduce((sum, day) => sum + day.records, 0);
  const recordsPercentage = (totalRecords / 10000) * 100;

  const monthlyApiCalls = monthlyUsageData.reduce((sum, month) => sum + month.calls, 0);
  const monthlyRecords = monthlyUsageData.reduce((sum, month) => sum + month.records, 0);
  const monthlyRecordsPercentage = (monthlyRecords / 300000) * 100;

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
            <div className="flex-1">
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
      
      <DashboardSummary 
        totalApiCalls={totalApiCalls}
        totalRecords={totalRecords}
        recordsPercentage={recordsPercentage}
        monthlyApiCalls={monthlyApiCalls}
        monthlyRecords={monthlyRecords}
        monthlyRecordsPercentage={monthlyRecordsPercentage}
        isTrialActive={isTrialActive}
        trialDaysLeft={trialDaysLeft}
        isLoading={isLoading}
      />
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="lg:col-span-2"
        >
          <UsageCharts 
            dailyUsageData={dailyUsageData} 
            monthlyUsageData={monthlyUsageData}
            isLoading={isLoading}
          />
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
              <RecentActivityList 
                activities={recentActivity}
                isLoading={isLoading} 
              />
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
          <EndpointUsageSection 
            endpointUsage={endpointUsage}
            isLoading={isLoading}
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <RecordUsageBreakdown 
            usageDistributionData={usageDistributionData}
            isLoading={isLoading}
          />
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.3 }}
      >
        <ApiAccessSection 
          isTrialActive={isTrialActive}
          isLoading={isLoading}
        />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
