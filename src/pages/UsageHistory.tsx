
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { usageHistoryData } from "@/data/usageHistoryData";
import { LoadingPage } from "@/components/dashboard/LoadingState";
import { DateRange } from "react-day-picker";
import { addDays, format, subDays, startOfMonth } from "date-fns";
import { UsageHistoryHeader } from "@/components/dashboard/UsageHistoryHeader";
import { UsageHistoryFilters } from "@/components/dashboard/UsageHistoryFilters";
import { UsageHistoryContent } from "@/components/dashboard/UsageHistoryContent";

const UsageHistory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  
  const [endpoint, setEndpoint] = useState<string>("all");
  
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
    const fromDate = dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : '';
    const toDate = dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : '';
    console.log(`Exporting data from ${fromDate} to ${toDate} for endpoint: ${endpoint}`);
  };

  const handleBackToUsage = () => {
    let currentCategory = searchParams.get('category');
    
    if (!currentCategory && location.state?.category) {
      currentCategory = location.state.category;
    }
    
    if (!currentCategory) {
      currentCategory = sessionStorage.getItem('lastUsageCategory');
    }
    
    console.log('Navigating back with category:', currentCategory);
    
    if (currentCategory && ['property', 'demographic', 'avm', 'liens'].includes(currentCategory)) {
      navigate(`/dashboard/usage?category=${currentCategory}`);
    } else {
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
      <UsageHistoryHeader
        dateRange={dateRange}
        endpoint={endpoint}
        onBackToUsage={handleBackToUsage}
        onExport={handleExport}
      />

      <UsageHistoryFilters
        dateRange={dateRange}
        endpoint={endpoint}
        onDateRangeChange={setDateRange}
        onEndpointChange={setEndpoint}
        onSelectLastWeek={selectLastWeek}
        onSelectLastMonth={selectLastMonth}
        onSelectMTD={selectMTD}
      />

      <UsageHistoryContent
        dateRange={dateRange}
        data={data || []}
      />
    </div>
  );
};

export default UsageHistory;
