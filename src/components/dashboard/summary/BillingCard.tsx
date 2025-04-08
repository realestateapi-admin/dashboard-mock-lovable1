import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { plans } from "@/data/plans";

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
  // State to store the plan name
  const [planName, setPlanName] = useState("Professional Plan");
  
  // Get the selected plan from localStorage on component mount
  useEffect(() => {
    const storedPlanId = localStorage.getItem('selectedPlan') || sessionStorage.getItem('selectedPlan');
    
    if (storedPlanId) {
      // Find the plan with the matching ID
      const selectedPlan = plans.find(p => p.id === storedPlanId);
      if (selectedPlan) {
        setPlanName(selectedPlan.name + " Plan");
      }
    }
  }, []);

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
  
  // Determine button text and link based on plan status
  const buttonConfig = isOnPaidPlan
    ? { text: "Manage Subscription", link: "/dashboard/upgrade", variant: "outline" }
    : (isFreeUser || isTrialActive 
      ? { text: "Upgrade Now", link: "/dashboard/upgrade", variant: "default" }
      : { text: "Choose a Plan", link: "/dashboard/upgrade", variant: "outline" }
    );
  
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
              ? `Next payment on ${formattedRenewalDate || 'May 22, 2025'}`
              : (isFreeUser 
                ? `Free plan expires in ${trialDaysLeft} days` 
                : (isTrialActive 
                  ? `Ends in ${trialDaysLeft} days` 
                  : "Next payment on May 22, 2025")
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
                ? planName
                : (isFreeUser 
                  ? "Free Plan" 
                  : (isTrialActive ? "Trial" : planName)
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
              variant={buttonConfig.variant as "default" | "outline"} 
              size="sm" 
              className="w-full" 
              asChild
            >
              <Link to={buttonConfig.link}>
                {buttonConfig.text}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
