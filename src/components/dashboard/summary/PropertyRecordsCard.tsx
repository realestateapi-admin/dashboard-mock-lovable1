
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PropertyRecordsCardProps {
  totalRecords: number;
  recordsPercentage: number;
}

export const PropertyRecordsCard = ({
  totalRecords,
  recordsPercentage
}: PropertyRecordsCardProps) => {
  const isOverLimit = recordsPercentage > 100;
  const displayPercentage = Math.min(recordsPercentage, 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Today's Property Records Used</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRecords.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            +12.4% from yesterday
          </p>
          <div className="mt-4 h-1 w-full bg-secondary">
            <div
              className={`h-1 transition-all duration-300 ${isOverLimit ? 'bg-red-500' : 'bg-primary-teal'}`}
              style={{ width: `${displayPercentage}%` }}
            />
          </div>
          <p className={`mt-2 text-xs ${isOverLimit ? 'text-red-600' : 'text-muted-foreground'}`}>
            {recordsPercentage.toFixed(1)}% of monthly limit used MTD
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-500 border-yellow-200">Credits</Badge>
                  <p className="text-xs text-muted-foreground">Counts against your plan</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[200px]">Only property records actually fetched count against your monthly plan allowance. Each record costs 1 credit.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
    </motion.div>
  );
};
