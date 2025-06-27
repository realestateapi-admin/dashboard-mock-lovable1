import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from "@/components/dashboard/DateRangePicker";
import { UsageHistoryTable } from "@/components/dashboard/UsageHistoryTable";
import UsageHistoryCharts from "@/components/dashboard/UsageHistoryCharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, FileDown, Filter, RefreshCcw, ArrowLeft } from "lucide-react";
import { usageHistoryData } from "@/data/usageHistoryData";
import { LoadingPage } from "@/components/dashboard/LoadingState";
import { DateRange } from "react-day-picker";
import { addDays, format, subDays, startOfMonth } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const UsageHistory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  
  const [endpoint, setEndpoint] = useState<string>("all");
  const [view, setView] = useState<"table" | "chart">("table");
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Fetch usage history data with filters
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['usageHistory', dateRange, endpoint],
    queryFn: () => {
      const fromDate = dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : '';
      const toDate = dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : '';
      return usageHistoryData(fromDate, toDate, endpoint);
    }
  });

  const handleExport = () => {
    // In a real application, this would trigger a CSV download
    const fromDate = dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : '';
    const toDate = dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : '';
    console.log(`Exporting data from ${fromDate} to ${toDate} for endpoint: ${endpoint}`);
    
    // Instead of console.log, we would use something like:
    // exportToCsv(data, `usage-history-${fromDate}-to-${toDate}.csv`);
  };

  const handleBackToUsage = () => {
    // First try to get category from URL params
    let currentCategory = searchParams.get('category');
    
    // If not in URL params, try to get from location state (passed during navigation)
    if (!currentCategory && location.state?.category) {
      currentCategory = location.state.category;
    }
    
    // If still no category, try to get from sessionStorage as fallback
    if (!currentCategory) {
      currentCategory = sessionStorage.getItem('lastUsageCategory');
    }
    
    console.log('Navigating back with category:', currentCategory);
    
    if (currentCategory && ['property', 'demographic', 'avm', 'liens'].includes(currentCategory)) {
      navigate(`/dashboard/usage?category=${currentCategory}`);
    } else {
      // Default to property if no valid category found
      navigate('/dashboard/usage?category=property');
    }
  };

  // Preset date ranges
  const selectLastWeek = () => {
    setDateRange({
      from: subDays(new Date(), 7),
      to: new Date()
    });
  };

  const selectLastMonth = () => {
    setDateRange({
      from: subDays(new Date(), 30),
      to: new Date()
    });
  };

  const selectMTD = () => {
    setDateRange({
      from: startOfMonth(new Date()),
      to: new Date()
    });
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> Failed to load usage history data. Please try again.</span>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">API Usage History</h2>
          <p className="text-muted-foreground">
            View detailed history of your API usage over time
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={handleBackToUsage} variant="outline" className="w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Usage
          </Button>
          <Button onClick={handleExport} variant="outline" className="w-full sm:w-auto">
            <FileDown className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter your usage history by date range and endpoint</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="w-full lg:w-auto">
              <DatePickerWithRange 
                date={dateRange}
                onDateChange={setDateRange}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={selectLastWeek}>
                Last 7 Days
              </Button>
              <Button variant="outline" size="sm" onClick={selectLastMonth}>
                Last 30 Days
              </Button>
              <Button variant="outline" size="sm" onClick={selectMTD}>
                MTD
              </Button>
            </div>
            
            <div className="w-full lg:w-auto">
              <Select value={endpoint} onValueChange={setEndpoint}>
                <SelectTrigger className="w-full lg:w-[200px]">
                  <SelectValue placeholder="All Endpoints" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Endpoints</SelectItem>
                  <SelectItem value="property-search">Property Search</SelectItem>
                  <SelectItem value="property-detail">Property Detail</SelectItem>
                  <SelectItem value="property-comps">Property Comps</SelectItem>
                  <SelectItem value="autocomplete">Autocomplete</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Usage Data</CardTitle>
            <CardDescription>
              {dateRange?.from && dateRange?.to
                ? `From ${format(dateRange.from, 'MMM d, yyyy')} to ${format(dateRange.to, 'MMM d, yyyy')}`
                : 'Select a date range'}
            </CardDescription>
          </div>
          <div className="mt-4 sm:mt-0">
            <Tabs value={view} onValueChange={(value) => setView(value as "table" | "chart")}>
              <TabsList>
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="chart">Chart</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {view === "table" ? (
            <UsageHistoryTable data={data || []} />
          ) : (
            <UsageHistoryCharts data={data || []} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UsageHistory;
