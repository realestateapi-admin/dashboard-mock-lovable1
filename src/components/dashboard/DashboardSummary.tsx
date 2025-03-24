import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Database, FileBarChart, FileText } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DashboardSummaryProps {
  totalApiCalls: number;
  totalRecords: number;
  recordsPercentage: number;
  monthlyApiCalls: number;
  monthlyRecords: number;
  monthlyRecordsPercentage: number;
  isTrialActive: boolean;
  trialDaysLeft: number;
}

export const DashboardSummary = ({
  totalApiCalls,
  totalRecords,
  recordsPercentage,
  monthlyApiCalls,
  monthlyRecords,
  monthlyRecordsPercentage,
  isTrialActive,
  trialDaysLeft
}: DashboardSummaryProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's API Calls</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApiCalls.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +18.2% from yesterday
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
                className="h-1 bg-primary-teal"
                style={{ width: `${recordsPercentage}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{recordsPercentage.toFixed(1)}% of monthly limit used MTD</p>
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
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <Card className="h-full">
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
                className="h-1 bg-primary-teal"
                style={{ width: `${monthlyRecordsPercentage}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{monthlyRecordsPercentage.toFixed(1)}% of monthly limit</p>
            <div className="mt-2 flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Total API Calls:</span>
              <span className="font-medium">{monthlyApiCalls.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Billing</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isTrialActive ? "Free Trial" : "$99.00"}</div>
            <p className="text-xs text-muted-foreground">
              {isTrialActive 
                ? `Ends in ${trialDaysLeft} days` 
                : "Next payment on Mar 1, 2024"}
            </p>
            <div className="mt-4">
              <Badge variant="outline" className="bg-primary-teal/5 text-primary-teal">
                {isTrialActive ? "Trial" : "Professional Plan"}
              </Badge>
            </div>
            <div className="mt-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/dashboard/billing">
                  {isTrialActive ? "Choose a Plan" : "Manage Subscription"}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
