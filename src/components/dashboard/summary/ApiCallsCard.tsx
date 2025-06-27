
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ApiCallsCardProps {
  totalApiCalls: number;
  increasePercentage: number;
  onClick?: () => void;
}

export const ApiCallsCard = ({
  totalApiCalls,
  increasePercentage,
  onClick
}: ApiCallsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
    >
      <Card 
        className={`h-full ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
        onClick={onClick}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Today's API Calls</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalApiCalls.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            +{increasePercentage.toFixed(1)}% from yesterday
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary-teal/5 text-primary-teal">Info</Badge>
                  <p className="text-xs text-muted-foreground">Includes all API requests</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[200px]">API calls include all requests, including those that don't consume credits (like autocomplete and count-only queries).</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
    </motion.div>
  );
};
