
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BillingCardProps {
  isTrialActive: boolean;
  trialDaysLeft: number;
  isFreeUser?: boolean;
}

export const BillingCard = ({
  isTrialActive,
  trialDaysLeft,
  isFreeUser = false
}: BillingCardProps) => {
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
            {isFreeUser ? "$0.00" : (isTrialActive ? "Free Trial" : "$99.00")}
          </div>
          <p className="text-xs text-muted-foreground">
            {isFreeUser 
              ? `Free plan expires in ${trialDaysLeft} days` 
              : (isTrialActive 
                ? `Ends in ${trialDaysLeft} days` 
                : "Next payment on Mar 1, 2024")
            }
          </p>
          <div className="mt-4">
            <Badge variant="outline" className={isFreeUser 
              ? "bg-amber-500/10 text-amber-600"
              : "bg-primary-teal/5 text-primary-teal"
            }>
              {isFreeUser 
                ? "Free Plan" 
                : (isTrialActive ? "Trial" : "Professional Plan")
              }
            </Badge>
          </div>
          <div className="mt-2">
            <Button 
              variant={isFreeUser ? "default" : "outline"} 
              size="sm" 
              className="w-full" 
              asChild
            >
              <Link to="/dashboard/billing">
                {isFreeUser ? "Upgrade Now" : (isTrialActive ? "Choose a Plan" : "Manage Subscription")}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

