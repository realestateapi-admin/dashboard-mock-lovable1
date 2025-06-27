
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileBarChart } from "lucide-react";

interface MonthlyUsageCardProps {
  monthlyApiCalls: number;
  monthlyRecords: number;
  monthlyRecordsPercentage: number;
  onClick?: () => void;
}

export const MonthlyUsageCard = ({
  monthlyApiCalls,
  monthlyRecords,
  monthlyRecordsPercentage,
  onClick
}: MonthlyUsageCardProps) => {
  const isOverLimit = monthlyRecordsPercentage > 100;
  const displayPercentage = Math.min(monthlyRecordsPercentage, 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      <Card 
        className={`h-full ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
        onClick={onClick}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Monthly Usage</CardTitle>
          <FileBarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{monthlyRecords.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Records used this month
          </p>
          <div className="mt-4 h-1 w-full bg-secondary">
            <div
              className={`h-1 transition-all duration-300 ${isOverLimit ? 'bg-red-500' : 'bg-primary-teal'}`}
              style={{ width: `${displayPercentage}%` }}
            />
          </div>
          <p className={`mt-2 text-xs ${isOverLimit ? 'text-red-600' : 'text-muted-foreground'}`}>
            {monthlyRecordsPercentage.toFixed(1)}% of monthly limit
          </p>
          <div className="mt-2 flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Total API Calls:</span>
            <span className="font-medium">{monthlyApiCalls.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
