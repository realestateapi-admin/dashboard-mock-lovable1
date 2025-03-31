import React from 'react';
import { Card } from '@/components/ui/card';

const ImplementationNotes = () => {
  const content = `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">API Recommendations for Dashboard Data Integration</h2>
      <p class="mb-4">Based on your mocked dashboard UI, here's a document outlining the specific API calls needed to pull real data into your interface. I've referenced MongoDB collections and data objects where possible.</p>
      
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-3">1. Dashboard Summary Cards</h3>
        <p class="mb-2"><strong>API:</strong> /api/dashboard/summary</p>
        <p class="mb-2"><strong>MongoDB Collection:</strong> usage_reports, subscriptions</p>
        <p class="mb-2"><strong>Purpose:</strong> Fetch aggregate data for the summary cards at the top of the dashboard</p>
        
        <h4 class="font-medium mt-4 mb-2">Response Structure:</h4>
        <pre class="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{
  totalApiCalls: number;              // Total API calls made
  totalRecords: number;               // Total property records used
  recordsPercentage: number;          // Percentage of plan limit used
  monthlyApiCalls: number;            // API calls this month
  monthlyRecords: number;             // Records used this month
  monthlyRecordsPercentage: number;   // Percentage of monthly limit used
  isTrialActive: boolean;             // Whether user is on trial
  trialDaysLeft: number;              // Days left in trial
}
        </pre>
        
        <h4 class="font-medium mb-2">Implementation Notes:</h4>
        <ul class="list-disc ml-5 mb-4">
          <li>Aggregate usage_reports to calculate totals</li>
          <li>Compare against subscription.usage_amount for percentages</li>
          <li>Check subscription.trial_end_date to determine trial status</li>
        </ul>
      </div>
      
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-3">2. Usage Analytics Charts</h3>
        <p class="mb-2"><strong>API:</strong> /api/usage/daily</p>
        <p class="mb-2"><strong>MongoDB Collection:</strong> usage_reports, usage_history</p>
        <p class="mb-2"><strong>Purpose:</strong> Get daily usage data for charts</p>
        
        <h4 class="font-medium mt-4 mb-2">Response Structure:</h4>
        <pre class="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{
  data: Array<{
    date: string;       // Format: "Mon", "Tue", etc. or ISO date string
    calls: number;      // API calls for that day
    records: number;    // Records used that day
  }>
}
        </pre>
        
        <p class="mb-2 mt-4"><strong>API:</strong> /api/usage/monthly</p>
        <p class="mb-2"><strong>MongoDB Collection:</strong> usage_reports</p>
        <p class="mb-2"><strong>Purpose:</strong> Get monthly usage data for charts</p>
        
        <h4 class="font-medium mt-4 mb-2">Response Structure:</h4>
        <pre class="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{
  data: Array<{
    date: string;       // Format: "Jan", "Feb", etc.
    calls: number;      // API calls for that month
    records: number;    // Records used that month
  }>
}
        </pre>
        
        <h4 class="font-medium mb-2">Implementation Notes:</h4>
        <ul class="list-disc ml-5 mb-4">
          <li>Create a more granular collection to track daily usage</li>
          <li>Aggregate usage_reports by month for monthly view</li>
        </ul>
      </div>
      
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-3">3. Recent Activity List</h3>
        <p class="mb-2"><strong>API:</strong> /api/activity/recent</p>
        <p class="mb-2"><strong>MongoDB Collection:</strong> New activity_logs collection needed</p>
        <p class="mb-2"><strong>Purpose:</strong> Fetch recent API activity</p>
        
        <h4 class="font-medium mt-4 mb-2">Response Structure:</h4>
        <pre class="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{
  activities: Array<{
    id: string;
    type: string;             // "api_call", "rate_limit", "error"
    endpoint: string;         // "/v2/PropertyDetail", etc.
    timestamp: string;        // ISO date string
    status: string;           // "success", "warning", "error"
    recordsFetched: number;
    creditCost: number;
  }>
}
        </pre>
        
        <h4 class="font-medium mb-2">Implementation Notes:</h4>
        <ul class="list-disc ml-5 mb-4">
          <li>Create a new MongoDB collection to log each API call</li>
          <li>Include endpoint, status, and record count information</li>
          <li>Store timestamp to allow for filtering by time period</li>
        </ul>
      </div>
      
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-3">4. Endpoint Usage Section</h3>
        <p class="mb-2"><strong>API:</strong> /api/usage/endpoints</p>
        <p class="mb-2"><strong>MongoDB Collection:</strong> New endpoint_usage collection needed</p>
        <p class="mb-2"><strong>Purpose:</strong> Get usage breakdown by endpoint</p>
        
        <h4 class="font-medium mt-4 mb-2">Response Structure:</h4>
        <pre class="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{
  endpointUsage: Array<{
    endpoint: string;           // "Property Search", etc.
    calls: number;              // Total calls to this endpoint
    records: number;            // Records fetched from this endpoint
    percentage: number;         // Percentage of total records
    description: string;        // Description of endpoint
    creditCost: string;         // Credit cost description
  }>
}
        </pre>
        
        <h4 class="font-medium mb-2">Implementation Notes:</h4>
        <ul class="list-disc ml-5 mb-4">
          <li>Create a new MongoDB collection to track usage by endpoint</li>
          <li>Update it whenever an API call is made</li>
          <li>Calculate percentages based on total records used</li>
        </ul>
      </div>
      
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-3">5. Record Usage Breakdown</h3>
        <p class="mb-2"><strong>API:</strong> /api/usage/distribution</p>
        <p class="mb-2"><strong>MongoDB Collection:</strong> Same as endpoint_usage above</p>
        <p class="mb-2"><strong>Purpose:</strong> Get data for the pie chart showing usage distribution</p>
        
        <h4 class="font-medium mt-4 mb-2">Response Structure:</h4>
        <pre class="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{
  usageDistributionData: Array<{
    name: string;       // "Property Search", etc.
    value: number;      // Number of records
    fill: string;       // Color for the chart segment
  }>
}
        </pre>
        
        <h4 class="font-medium mb-2">Implementation Notes:</h4>
        <ul class="list-disc ml-5 mb-4">
          <li>Derive from the same endpoint_usage collection</li>
          <li>Filter to include only endpoints with record usage > 0</li>
          <li>Add consistent color values for each endpoint type</li>
        </ul>
      </div>
      
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-3">6. Subscription Data</h3>
        <p class="mb-2"><strong>API:</strong> /api/subscription</p>
        <p class="mb-2"><strong>MongoDB Collection:</strong> subscriptions</p>
        <p class="mb-2"><strong>Purpose:</strong> Fetch current subscription details</p>
        
        <h4 class="font-medium mt-4 mb-2">Response Structure:</h4>
        <pre class="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{
  _id: string;
  account_id: number;
  subscription_id: string;
  customer_name: string;
  contract_start_date: string;
  contract_end_date: string;
  plan_name: string;
  plan_id: number;
  plan_type: string;
  usage_amount: number;
  minimum_bill_amount: number;
  unit_price: number;
  credit: number;
  trial_begin_date: string;
  trial_end_date: string;
}
        </pre>
        
        <h4 class="font-medium mb-2">Implementation Notes:</h4>
        <ul class="list-disc ml-5 mb-4">
          <li>This should match your existing subscription model</li>
          <li>Expose only the necessary fields for the frontend</li>
        </ul>
      </div>
      
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-3">7. Usage History Tracking</h3>
        <p class="mb-2"><strong>API:</strong> /api/usage/history</p>
        <p class="mb-2"><strong>MongoDB Collection:</strong> usage_reports, new usage_history collection</p>
        <p class="mb-2"><strong>Purpose:</strong> Get detailed usage history for the UsageHistoryTable component</p>
        
        <h4 class="font-medium mt-4 mb-2">Response Structure:</h4>
        <pre class="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{
  history: Array<{
    timestamp: string;         // ISO date string
    endpoint: string;          // Endpoint name
    request: string;           // Request details/query
    credits: number;           // Credits used
    status: string;            // "success", "error", "warning"
    responseTime: number;      // Response time in milliseconds
  }>
}
        </pre>
        
        <h4 class="font-medium mb-2">Implementation Notes:</h4>
        <ul class="list-disc ml-5 mb-4">
          <li>Create a new collection for detailed request logging</li>
          <li>Store request details, response status, and timing information</li>
          <li>Allow filtering by date range</li>
        </ul>
      </div>
      
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-3">MongoDB Schema Recommendations</h3>
        <p class="mb-4">Based on your current data model and UI requirements, I recommend the following MongoDB collections:</p>
        
        <p class="mb-2"><strong>subscriptions:</strong> Already exists, stores plan and billing information</p>
        
        <p class="mb-2"><strong>usage_reports:</strong> Already exists, stores aggregate usage by billing period</p>
        
        <p class="mb-2"><strong>activity_logs (new):</strong> Detailed logs of every API request</p>
        
        <pre class="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{
  _id: ObjectId,
  account_id: Number,
  endpoint: String,
  request_details: String,
  timestamp: Date,
  status: String,
  records_fetched: Number,
  credit_cost: Number,
  response_time: Number
}
        </pre>
        
        <p class="mb-2"><strong>endpoint_usage (new):</strong> Aggregated usage by endpoint</p>
        
        <pre class="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{
  _id: ObjectId,
  account_id: Number,
  billing_period_start: Date,
  billing_period_end: Date,
  endpoint: String,
  total_calls: Number,
  total_records: Number,
  last_updated: Date
}
        </pre>
      </div>
      
      <div class="mb-4">
        <h3 class="text-xl font-semibold mb-3">Implementation Strategy</h3>
        <ol class="list-decimal ml-5">
          <li>Phase 1: Create MongoDB collections and backend APIs</li>
          <li>Phase 2: Modify the frontend to fetch real data instead of mock data</li>
          <li>Phase 3: Implement real-time logging of API usage and activity</li>
        </ol>
      </div>

      <div class="mb-8 mt-10 border-t pt-6 border-gray-300">
        <h3 class="text-xl font-semibold mb-3">Demo Notes: Solutions Engineer Integration</h3>
        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
          <p class="font-medium">Important: Solutions Engineer data is now stored in user metadata</p>
        </div>
        
        <h4 class="font-medium mb-2">User Metadata Structure</h4>
        <pre class="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{
  name: string,
  companyName: string,
  email: string,
  solutionsEngineer: {
    id: string,         // derived from SE name (lowercase, hyphenated)
    name: string,       // Solutions Engineer's full name
    email: string,      // Solutions Engineer's email address
    calendly: string,   // Solutions Engineer's Calendly booking link
  },
  plan: string,         // selected plan during onboarding
  addOns: string[]      // selected add-ons during onboarding
}
        </pre>
        
        <h4 class="font-medium mt-4 mb-2">Implementation Notes:</h4>
        <ul class="list-disc ml-5 mb-4">
          <li>Solutions Engineer data is assigned at signup and persisted in user metadata</li>
          <li>Dashboard applications should retrieve and use this data to personalize support options</li>
          <li>At the API level, retrieve the SE data from <code>user.metadata.solutionsEngineer</code></li>
          <li>Store this association in the database to maintain the connection between users and their Solutions Engineers</li>
          <li>API endpoints should check this relationship for support-related features</li>
        </ul>
        
        <h4 class="font-medium mt-4 mb-2">MongoDB Collection Updates:</h4>
        <p>Update the <strong>accounts</strong> collection schema to include Solutions Engineer data:</p>
        <pre class="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{
  // ... existing account fields
  solutions_engineer: {
    id: String,
    name: String,
    email: String,
    calendly: String,
  }
}
        </pre>
        
        <h4 class="font-medium mt-4 mb-2">Recommended API Endpoints:</h4>
        <p><strong>GET /api/user/support-contact</strong></p>
        <p>Returns the user's assigned Solutions Engineer information</p>
        <pre class="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{
  solutionsEngineer: {
    name: string,
    email: string,
    calendly: string,
    photo?: string
  }
}
        </pre>
      </div>
    </div>
  `;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Implementation Guide</h1>
      <Card className="p-0 overflow-hidden">
        <div 
          dangerouslySetInnerHTML={{ __html: content }} 
          className="implementation-guide"
        />
      </Card>
    </div>
  );
};

export default ImplementationNotes;
