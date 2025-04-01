import React from 'react';

export const SolutionsEngineerSection: React.FC = () => {
  return (
    <div className="mb-8 mt-10 border-t pt-6 border-gray-300">
      <h3 className="text-xl font-semibold mb-3">Demo Notes: Solutions Engineer Integration</h3>
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
        <p className="font-medium">Important: Solutions Engineer data is now stored in user metadata</p>
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
