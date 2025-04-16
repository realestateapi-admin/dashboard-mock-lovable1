
import React from 'react';

export const MongoSchemaSection: React.FC = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-3">MongoDB Schema Recommendations</h3>
      <p className="mb-4">Based on your current data model and UI requirements, I recommend the following MongoDB collections:</p>
      
      <p className="mb-2"><strong>subscriptions:</strong> Already exists, stores plan and billing information</p>
      
      <pre className="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{`{
  _id: ObjectId,
  account_id: Number,
  subscription_id: String,
  customer_name: String,
  contract_start_date: Date,
  contract_end_date: Date,
  plan_name: String,
  plan_id: Number,
  plan_type: String,
  usage_amount: Number,
  minimum_bill_amount: Number,
  unit_price: Number,
  credit: Number,
  trial_begin_date: Date,
  trial_end_date: Date,
  early_termination_policy: {
    requires_full_term_payment: Boolean,
    prorated_refund_available: Boolean
  },
  subscription_start_date: Date,
  overage_handling: String,
  add_ons: Array
}`}
      </pre>
      
      <p className="mb-2"><strong>usage_reports:</strong> Already exists, stores aggregate usage by billing period</p>
      
      <p className="mb-2"><strong>activity_logs (new):</strong> Detailed logs of every API request</p>
      
      <pre className="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{`{
  _id: ObjectId,
  account_id: Number,
  endpoint: String,
  request_details: String,
  timestamp: Date,
  status: String,
  records_fetched: Number,
  credit_cost: Number,
  response_time: Number
}`}
      </pre>
      
      <p className="mb-2"><strong>endpoint_usage (new):</strong> Aggregated usage by endpoint</p>
      
      <pre className="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{`{
  _id: ObjectId,
  account_id: Number,
  billing_period_start: Date,
  billing_period_end: Date,
  endpoint: String,
  total_calls: Number,
  total_records: Number,
  last_updated: Date
}`}
      </pre>
    </div>
  );
};
