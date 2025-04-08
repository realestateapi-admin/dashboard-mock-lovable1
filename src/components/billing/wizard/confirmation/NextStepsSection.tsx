
import React from "react";

export const NextStepsSection: React.FC = () => {
  return (
    <div className="mt-2 border-t pt-4">
      <h4 className="text-sm font-medium mb-2">Next Steps</h4>
      <div className="text-sm space-y-2">
        <p>1. Check your email for confirmation details</p>
        <p>2. Set up your team members in dashboard settings</p>
        <p>3. Generate API keys to begin integration</p>
        <p>4. Access documentation for implementation guides</p>
      </div>
    </div>
  );
};
