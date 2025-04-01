
import React from "react";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { TrialDashboardBanner } from "@/components/dashboard/TrialDashboardBanner";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      <DashboardContent trialBanner={<TrialDashboardBanner />} />
    </div>
  );
};

export default Dashboard;
