
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface BillingCardProps {
  isTrialActive: boolean;
  trialDaysLeft: number;
  isFreeUser?: boolean;
  isOnPaidPlan?: boolean;
  subscriptionStartDate?: string;
  subscriptionRenewalDate?: string;
}

export const BillingCard = ({
  isTrialActive,
  trialDaysLeft,
  isFreeUser = false,
  isOnPaidPlan = false,
  subscriptionStartDate,
  subscriptionRenewalDate
}: BillingCardProps) => {
  // Format dates if available
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (e) {
      console.error("Invalid date format:", e);
      return null;
    }
  };

  const formattedStartDate = formatDate(subscriptionStartDate);
  const formattedRenewalDate = formatDate(subscriptionRenewalDate);
  
  return (
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
          <div className="text-2xl font-bold">
            {isOnPaidPlan ? "$99.00" : (isFreeUser ? "$0.00" : (isTrialActive ? "Free Trial" : "$99.00"))}
          </div>
          <p className="text-xs text-muted-foreground">
            {isOnPaidPlan 
              ? `Next payment on ${formattedRenewalDate || 'Mar 1, 2024'}`
              : (isFreeUser 
                ? `Free plan expires in ${trialDaysLeft} days` 
                : (isTrialActive 
                  ? `Ends in ${trialDaysLeft} days` 
                  : "Next payment on Mar 1, 2024")
              )
            }
          </p>
          <div className="mt-4">
            <Badge variant="outline" className={isOnPaidPlan
              ? "bg-primary-teal/5 text-primary-teal"
              : (isFreeUser 
                ? "bg-amber-500/10 text-amber-600"
                : "bg-primary-teal/5 text-primary-teal"
              )
            }>
              {isOnPaidPlan 
                ? "Professional Plan"
                : (isFreeUser 
                  ? "Free Plan" 
                  : (isTrialActive ? "Trial" : "Professional Plan")
                )
              }
            </Badge>
          </div>
          {isOnPaidPlan && formattedStartDate && (
            <p className="mt-2 text-xs text-muted-foreground">
              Member since {formattedStartDate}
            </p>
          )}
          <div className="mt-4">
            <Button 
              variant={isFreeUser || isTrialActive ? "default" : "outline"} 
              size="sm" 
              className="w-full" 
              asChild
            >
              <Link to={isFreeUser || isTrialActive ? "/dashboard/plan-signup" : "/dashboard/billing"}>
                {isFreeUser || isTrialActive ? "Upgrade Now" : (isOnPaidPlan ? "Manage Subscription" : "Choose a Plan")}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
