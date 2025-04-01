
import React from 'react';
import { DocumentationLink } from './DocumentationLink';

export const ChargebeeBulkSection: React.FC = () => {
  return (
    <div className="mb-8 mt-10 border-t pt-6 border-gray-300">
      <h3 className="text-xl font-semibold mb-3">Chargebee Bulk Operations</h3>
      <p className="mb-4">Use these documentation resources for managing bulk invoicing operations:</p>
      
      <div className="space-y-4">
        <DocumentationLink
          title="Sending Invoices in Bulk"
          description="Learn how to create and send multiple invoices simultaneously to streamline your billing process."
          url="https://support.chargebee.com/support/solutions/articles/254527-how-to-send-invoices-in-bulk-"
        />
        
        <DocumentationLink
          title="Collecting Payments for Invoices in Bulk"
          description="Efficiently process payments for multiple invoices at once to improve your collection workflow."
          url="https://support.chargebee.com/support/solutions/articles/256278-how-to-collect-payment-for-invoices-in-bulk-"
        />
      </div>
    </div>
  );
};
