
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { plans, addOns } from "@/data/billingData";

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
  // State to store the plan name and billing cycle
  const [planName, setPlanName] = useState("Professional Plan");
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [displayPrice, setDisplayPrice] = useState("$99.00");
  
  // Get the selected plan, billing cycle, and add-ons from localStorage on component mount
  useEffect(() => {
    // Get plan ID
    const storedPlanId = localStorage.getItem('selectedPlan') || sessionStorage.getItem('selectedPlan');
    
    if (storedPlanId) {
      // Find the plan with the matching ID
      const selectedPlan = plans.find(p => p.id === storedPlanId);
      if (selectedPlan) {
        setPlanName(selectedPlan.name + " Plan");
        
        // Update display price based on the plan
        try {
          const numericPrice = parseFloat(selectedPlan.price.replace(/[$,]/g, ''));
          if (!isNaN(numericPrice)) {
            // Get billing cycle to determine price display
            const storedBillingCycle = localStorage.getItem('billingCycle');
            if (storedBillingCycle === 'annual') {
              setDisplayPrice(`$${(numericPrice * 12 * 0.8).toFixed(0)}.00`);
              setBillingCycle('annual');
            } else {
              setDisplayPrice(`$${numericPrice.toFixed(0)}.00`);
              setBillingCycle('monthly');
            }
          }
        } catch (e) {
          console.error("Error calculating price:", e);
        }
      }
    }
    
    // Get billing cycle
    const storedBillingCycle = localStorage.getItem('billingCycle');
    if (storedBillingCycle === 'annual' || storedBillingCycle === 'monthly') {
      setBillingCycle(storedBillingCycle);
    }
    
    // Get add-ons to potentially adjust price
    try {
      const storedAddOns = localStorage.getItem('activeAddOns') || localStorage.getItem('selectedAddOns');
      if (storedAddOns && storedPlanId) {
        const activeAddOnIds = JSON.parse(storedAddOns);
        if (Array.isArray(activeAddOnIds) && activeAddOnIds.length > 0) {
          // Could calculate add-on prices here if needed
          console.log("Active add-ons:", activeAddOnIds);
        }
      }
    } catch (e) {
      console.error("Error loading add-ons:", e);
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
      ? { text: "Upgrade Now", link: "/dashboard/plan-signup", variant: "default" }
      : { text: "Choose a Plan", link: "/dashboard/billing", variant: "outline" }
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
            {isOnPaidPlan ? displayPrice : (isFreeUser ? "$0.00" : (isTrialActive ? "Free Trial" : displayPrice))}
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
            {billingCycle === 'annual' && (
              <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600">
                Annual
              </Badge>
            )}
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
