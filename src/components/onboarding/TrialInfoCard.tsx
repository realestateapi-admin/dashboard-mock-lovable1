
import React from "react";

const TrialInfoCard = () => {
  return (
    <div className="rounded-lg bg-primary-teal/5 p-6 border border-primary-teal/20">
      <h3 className="font-medium text-primary-teal text-lg mb-4">What's included in your trial:</h3>
      <ul className="space-y-3">
        <li className="flex items-start">
          <span className="mr-2 mt-0.5">✓</span>
          <span>Access to all API endpoints including Property Search, Auto-Complete, and more</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2 mt-0.5">✓</span>
          <span>Up to 5,000 property records</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2 mt-0.5">✓</span>
          <span>Full access to documentation and support</span>
        </li>
      </ul>
    </div>
  );
};

export default TrialInfoCard;
