import { motion } from "framer-motion";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { TrialBanner } from "@/components/dashboard/TrialBanner";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

// Sample data - this would typically come from an API
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
  const { isTrialActive, trialDaysLeft, requestTrialExtension, isFreeUser, isOnPaidPlan } = useTrialAlert();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <DashboardProvider 
        dailyUsageData={dailyUsageData}
        monthlyUsageData={monthlyUsageData}
        endpointUsage={endpointUsage}
        recentActivity={recentActivity}
        usageDistributionData={usageDistributionData}
      >
        {/* Always render the TrialBanner - it will only be displayed if conditions are met */}
        <TrialBanner 
          isTrialActive={isTrialActive}
          trialDaysLeft={trialDaysLeft}
          requestTrialExtension={requestTrialExtension}
          isFreeUser={isFreeUser}
          isOnPaidPlan={isOnPaidPlan}
        />
        
        <DashboardContent 
          trialBanner={
            <TrialBanner 
              isTrialActive={isTrialActive}
              trialDaysLeft={trialDaysLeft}
              requestTrialExtension={requestTrialExtension}
              isFreeUser={isFreeUser}
              isOnPaidPlan={isOnPaidPlan}
            />
          }
        />
      </DashboardProvider>
    </motion.div>
  );
};

export default Dashboard;
