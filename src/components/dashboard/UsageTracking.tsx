
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Database, AlertCircle, ChevronRight, TrendingUp, Info } from "lucide-react";
import { UsageReport } from '@/types/usage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface UsageTrackingProps {
  currentUsage: UsageReport | null;
  usageHistory: UsageReport[] | null;
  isLoading: boolean;
  error: Error | null;
  onRefresh: () => void;
  limits?: {
    property: number;
    skiptrace: number;
  };
}

const UsageTracking: React.FC<UsageTrackingProps> = ({
  currentUsage,
  usageHistory,
  isLoading,
  error,
  onRefresh,
  limits = { property: 150000, skiptrace: 5000 }
}) => {
  const { toast } = useToast();
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM d, yyyy');
  };
  
  // Calculate percentage of usage against limits
  const propertyPercentage = currentUsage ? (currentUsage.property_usage / limits.property) * 100 : 0;
  const skiptracePercentage = currentUsage ? (currentUsage.skiptrace_usage / limits.skiptrace) * 100 : 0;
  
  // Format history data for the chart
  const chartData = usageHistory?.map(report => ({
    month: format(parseISO(report.billing_period_start), 'MMM'),
    property: report.property_usage,
    skiptrace: report.skiptrace_usage
  })) || [];
  
  // Handle error
  if (error) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="h-5 w-5" />
            <p>Failed to load usage data. Please try again.</p>
          </div>
          <Button variant="outline" size="sm" className="mt-4" onClick={onRefresh}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">API Usage Tracking</CardTitle>
            <CardDescription>
              {currentUsage 
                ? `Billing period: ${formatDate(currentUsage.billing_period_start)} - ${formatDate(currentUsage.billing_period_end)}`
                : 'Loading your current usage data...'
              }
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh} 
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Refresh
          </Button>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="current">
        <CardContent>
          <TabsList className="mb-4">
            <TabsTrigger value="current">Current Usage</TabsTrigger>
            <TabsTrigger value="history">Historical Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary-teal mb-2" />
                <p className="text-sm text-muted-foreground">Loading usage data...</p>
              </div>
            ) : currentUsage ? (
              <>
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-primary-teal" />
                        <span className="font-medium">Property Records</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm">
                          {currentUsage.property_usage.toLocaleString()} / {limits.property.toLocaleString()}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${propertyPercentage > 90 ? 'bg-red-50 text-red-600 border-red-200' : 'bg-primary-teal/5 text-primary-teal'}`}
                        >
                          {propertyPercentage.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={propertyPercentage} 
                      indicatorClassName={propertyPercentage > 90 ? 'bg-red-500' : 'bg-primary-teal'} 
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-indigo-500" />
                        <span className="font-medium">Skiptrace Records</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm">
                          {currentUsage.skiptrace_usage.toLocaleString()} / {limits.skiptrace.toLocaleString()}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${skiptracePercentage > 90 ? 'bg-red-50 text-red-600 border-red-200' : 'bg-indigo-50 text-indigo-600 border-indigo-200'}`}
                        >
                          {skiptracePercentage.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={skiptracePercentage} 
                      indicatorClassName={skiptracePercentage > 90 ? 'bg-red-500' : 'bg-indigo-500'} 
                    />
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 flex items-start gap-2 mt-4">
                  <Info className="h-5 w-5 text-primary-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Usage Information</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      These usage statistics show your consumption for the current billing period. Property records include all property search, detail, and comps API calls. Skiptrace records include all person and contact lookups.
                    </p>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="px-0 h-auto text-primary-teal" 
                      onClick={() => {
                        toast({
                          title: "Usage Metrics Information",
                          description: "A usage report is generated every day. Record counts and API calls are accurate as of the last update date shown above.",
                        });
                      }}
                    >
                      Learn more about usage metrics <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground mt-2 text-right italic">
                  Last updated: {currentUsage.last_update_date ? formatDate(currentUsage.last_update_date) : 'Unknown'}
                </div>
              </>
            ) : (
              <p>No usage data available</p>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary-teal mb-2" />
                <p className="text-sm text-muted-foreground">Loading historical data...</p>
              </div>
            ) : usageHistory && usageHistory.length > 0 ? (
              <div className="pt-4">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary-teal" />
                  <h3 className="font-medium">Monthly Usage Trends</h3>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                      <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="property" name="Property Records" fill="#04c8c8" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="skiptrace" name="Skiptrace Records" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No historical data available</p>
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        <div className="w-full flex justify-between items-center">
          <span>Organization: {currentUsage?.organization || 'Unknown'}</span>
          <span>Account ID: {currentUsage?.account_id || 'Unknown'}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UsageTracking;
