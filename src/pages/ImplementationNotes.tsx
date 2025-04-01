
import React from 'react';
import { Card } from '@/components/ui/card';
import { DashboardSummarySection } from '@/components/implementation/DashboardSummarySection';
import { UsageAnalyticsSection } from '@/components/implementation/UsageAnalyticsSection';
import { RecentActivitySection } from '@/components/implementation/RecentActivitySection';
import { EndpointUsageSection } from '@/components/implementation/EndpointUsageSection';
import { RecordUsageSection } from '@/components/implementation/RecordUsageSection';
import { SubscriptionDataSection } from '@/components/implementation/SubscriptionDataSection';
import { UsageHistorySection } from '@/components/implementation/UsageHistorySection';
import { MongoSchemaSection } from '@/components/implementation/MongoSchemaSection';
import { ImplementationStrategySection } from '@/components/implementation/ImplementationStrategySection';
import { SolutionsEngineerSection } from '@/components/implementation/SolutionsEngineerSection';
import { ChargebeeBulkSection } from '@/components/implementation/ChargebeeBulkSection';

const ImplementationNotes: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Implementation Guide</h1>
      <Card className="p-0 overflow-hidden">
        <div className="p-6 implementation-guide">
          <h2 className="text-2xl font-bold mb-4">API Recommendations for Dashboard Data Integration</h2>
          <p className="mb-4">Based on your mocked dashboard UI, here's a document outlining the specific API calls needed to pull real data into your interface. I've referenced MongoDB collections and data objects where possible.</p>
          
          <DashboardSummarySection />
          <UsageAnalyticsSection />
          <RecentActivitySection />
          <EndpointUsageSection />
          <RecordUsageSection />
          <SubscriptionDataSection />
          <UsageHistorySection />
          <MongoSchemaSection />
          <ImplementationStrategySection />
          <SolutionsEngineerSection />
          <ChargebeeBulkSection />
        </div>
      </Card>
    </div>
  );
};

export default ImplementationNotes;
