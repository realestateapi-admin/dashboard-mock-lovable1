
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SalesMotionFlowchart from '@/components/flowcharts/SalesMotionFlowchart';

const SalesFlowPage = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Sales Motion Flow</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Updated Sales Motion Flowchart</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesMotionFlowchart />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Flow Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Initial Contact</h3>
            <p>Prospect clicks a CTA and fills out a Calendly form that qualifies them into one of two categories: small or large opportunity.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">SE Assignment</h3>
            <p>The prospect is assigned to a Solutions Engineer via round-robin facilitated by Calendly, and this assignment is recorded in Pipedrive.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Small Opportunity Path</h3>
            <p>If classified as a small opportunity, they receive a welcome email from their assigned SE with tutorial videos and a "Start Free Trial" link to access the dashboard.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Large Opportunity Path</h3>
            <p>If classified as a large opportunity, they receive a Calendly link to book a live call with their assigned SE.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">User Metadata and Dashboard Integration</h3>
            <p>In all cases, the user object includes metadata with the assigned SE's information, which is passed to the dashboard and stored in MongoDB. The dashboard displays the assigned SE in the widget.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Widget Activation</h3>
            <p>The SE widget activates when:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>A customer requests live assistance</li>
              <li>Their trial is ending</li>
              <li>They achieve a certain level of usage</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesFlowPage;
