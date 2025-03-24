
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface DashboardHeaderProps {
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const DashboardHeader = ({ isRefreshing, onRefresh }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-semibold tracking-tight text-[#1c3238]">Dashboard</h1>
      <Button 
        variant="outline" 
        onClick={onRefresh}
        disabled={isRefreshing}
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
        Refresh
      </Button>
    </div>
  );
};
