
import React from "react";

export const UpgradeFlowLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="animate-pulse text-center">
        <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
      </div>
    </div>
  );
};
