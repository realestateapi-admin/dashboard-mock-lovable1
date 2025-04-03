
import React from 'react';
import SalesMotionFlowchart from '../flowcharts/SalesMotionFlowchart';

export const SolutionsEngineerSection: React.FC = () => {
  return (
    <div className="mb-8 mt-10 border-t pt-6 border-gray-300">
      <h3 className="text-xl font-semibold mb-3">Demo Notes: Solutions Engineer Integration</h3>
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
        <p className="font-medium">Important: Solutions Engineer data is now stored in user metadata</p>
      </div>
      
      <h4 className="font-medium mb-4">Updated Sales Motion Flow</h4>
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="mb-2">We now have two primary entry points to our sales process:</p>
        <ol className="list-decimal ml-5 space-y-1">
          <li><strong>Direct Free Trial:</strong> Users can click a CTA from the homepage to immediately start a free trial without qualification</li>
          <li><strong>Traditional Qualification:</strong> Users go through Calendly qualification and are assigned a Solutions Engineer</li>
        </ol>
        <p className="mt-2">Both paths result in a user record with Solutions Engineer metadata being created.</p>
      </div>
      
      <h4 className="font-medium mb-4">Support Widget Flow</h4>
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="mb-2">The new widget follows an Intercom-style flow:</p>
        <ol className="list-decimal ml-5 space-y-1">
          <li>Initial options displayed: Query help, Billing questions, Connect with human</li>
          <li>If user selects a help topic, display relevant resources with option to talk to human</li>
          <li>Human contact options (email/call) are only shown after explicit request</li>
        </ol>
      </div>
      
      <h4 className="font-medium mb-4">Sales Motion Flowchart</h4>
      <div className="mb-6 border rounded-lg overflow-hidden">
        <SalesMotionFlowchart />
      </div>
      
      <h4 className="font-medium mb-2">User Metadata Structure</h4>
      <pre className="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{`{
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
}`}
      </pre>
      
      <h4 className="font-medium mt-4 mb-2">Implementation Notes:</h4>
      <ul className="list-disc ml-5 mb-4">
        <li>Solutions Engineer data is assigned at signup and persisted in user metadata</li>
        <li>For direct free trial signups, an SE is automatically assigned using round-robin</li>
        <li>Dashboard applications should retrieve and use this data to personalize support options</li>
        <li>At the API level, retrieve the SE data from <code>user.metadata.solutionsEngineer</code></li>
        <li>Store this association in the database to maintain the connection between users and their Solutions Engineers</li>
        <li>API endpoints should check this relationship for support-related features</li>
      </ul>
      
      <h4 className="font-medium mt-4 mb-2">MongoDB Collection Updates:</h4>
      <p>Update the <strong>accounts</strong> collection schema to include Solutions Engineer data:</p>
      <pre className="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{`{
  // ... existing account fields
  solutions_engineer: {
    id: String,
    name: String,
    email: String,
    calendly: String,
  }
}`}
      </pre>
      
      <h4 className="font-medium mt-4 mb-2">Additional Implementation:</h4>
      <ul className="list-disc ml-5 mb-4">
        <li>Updated onboarding wizard that collects industry and volume information</li>
        <li>New Support page with tabbed interface for AI copilot, Knowledge Base, and API Documentation</li>
        <li>Intercom-style help widget that only displays human contact options when requested</li>
      </ul>
      
      <h4 className="font-medium mt-4 mb-2">Recommended API Endpoints:</h4>
      <p><strong>GET /api/user/support-contact</strong></p>
      <p>Returns the user's assigned Solutions Engineer information</p>
      <pre className="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
{`{
  solutionsEngineer: {
    name: string,
    email: string,
    calendly: string,
    photo?: string
  }
}`}
      </pre>
    </div>
  );
};
