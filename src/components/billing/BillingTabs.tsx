
import { CreditCard, CreditCardIcon, FileText, Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BillingPlans } from "@/components/billing/BillingPlans";
import { SubscriptionSummary } from "@/components/billing/SubscriptionSummary";
import { PaymentMethods } from "@/components/billing/PaymentMethods";
import { InvoiceHistory } from "@/components/billing/InvoiceHistory";
import { TermsOfServiceTab } from "@/components/billing/TermsOfServiceTab";
import { PlanData, AddOnData, InvoiceData, SubscriptionData } from "@/types/billing";
import { useState, useEffect } from "react";
import { EnterprisePlanCard } from "./EnterprisePlanCard";
import { EnterpriseCompactCard } from "./EnterpriseCompactCard";
import { useAccountExecutive } from "@/contexts/AccountExecutiveContext";
import { Button } from "@/components/ui/button";

interface BillingTabsProps {
  plans: PlanData[];
  addOns: AddOnData[];
  invoices: InvoiceData[];
  selectedPlan: string;
  activeAddOns: string[];
  overageHandling: string;
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  billingCycle: 'monthly' | 'annual';
  subscription?: SubscriptionData | null;
  isLoadingSubscription: boolean;
  onPlanChange: (planId: string) => void;
  onToggleAddOn: (addOnId: string) => void;
  onOverageHandlingChange: (value: string) => void;
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  onSaveBillingPreferences: () => void;
  onDownloadInvoice: (invoiceId: string) => void;
  onStartUpgradeFlow: () => void;
}

export const BillingTabs = ({
  plans,
  addOns,
  invoices,
  selectedPlan,
  activeAddOns,
  overageHandling,
  costs,
  billingCycle,
  subscription,
  isLoadingSubscription,
  onPlanChange,
  onToggleAddOn,
  onOverageHandlingChange,
  onBillingCycleChange,
  onSaveBillingPreferences,
  onDownloadInvoice,
  onStartUpgradeFlow
}: BillingTabsProps) => {
  // Access the AccountExecutive context to show/hide the widget
  const { showWidget } = useAccountExecutive();
  
  // Find the enterprise plan
  const enterprisePlan = plans.find(p => p.id === "enterprise");
  // Filter out enterprise plan from the regular plans list
  const regularPlans = plans.filter(p => p.id !== "enterprise");

  // Handle selecting enterprise plan - now also shows the SE widget
  const handleSelectEnterprise = () => {
    if (enterprisePlan) {
      onPlanChange(enterprisePlan.id);
      // Show the sales engineer widget when enterprise is selected
      showWidget();
    }
  };

  return (
    <Tabs defaultValue="subscription" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="subscription" className="flex items-center gap-2">
          <Wallet className="h-4 w-4" /> Subscription
        </TabsTrigger>
        <TabsTrigger value="payment" className="flex items-center gap-2">
          <CreditCardIcon className="h-4 w-4" /> Payment Methods
        </TabsTrigger>
        <TabsTrigger value="invoices" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" /> Invoices
        </TabsTrigger>
        <TabsTrigger value="terms" className="flex items-center gap-2">
          <FileText className="h-4 w-4" /> Terms of Service
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="subscription">
        <div className="p-4 mb-6 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h3 className="text-lg font-medium text-purple-800">Need to make a change?</h3>
              <p className="text-sm text-purple-700">
                Upgrade or modify your plan with our guided plan selection wizard
              </p>
            </div>
            <Button 
              onClick={onStartUpgradeFlow}
              className="mt-3 md:mt-0 bg-purple-600 hover:bg-purple-700"
            >
              Upgrade Plan
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <BillingPlans 
              plans={regularPlans}
              addOns={addOns}
              selectedPlan={selectedPlan}
              activeAddOns={activeAddOns}
              overageHandling={overageHandling}
              onPlanChange={onPlanChange}
              onToggleAddOn={onToggleAddOn}
              onOverageHandlingChange={onOverageHandlingChange}
              onSaveBillingPreferences={onSaveBillingPreferences}
              billingCycle={billingCycle}
              onBillingCycleChange={onBillingCycleChange}
            />
          </div>
          
          <div className="md:col-span-1">
            <SubscriptionSummary 
              selectedPlan={selectedPlan}
              plans={plans}
              activeAddOns={activeAddOns}
              addOns={addOns}
              costs={costs}
              subscription={subscription}
              isLoading={isLoadingSubscription}
              onSubmit={onSaveBillingPreferences}
              billingCycle={billingCycle}
            />
            
            {/* Add the compact Enterprise card here - only show when enterprise is NOT selected */}
            {enterprisePlan && selectedPlan !== enterprisePlan.id && (
              <EnterpriseCompactCard onSelectEnterprise={handleSelectEnterprise} />
            )}
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="payment">
        <PaymentMethods />
      </TabsContent>
      
      <TabsContent value="invoices">
        <InvoiceHistory 
          invoices={invoices} 
          onDownloadInvoice={onDownloadInvoice} 
        />
      </TabsContent>
      
      <TabsContent value="terms">
        <TermsOfServiceTab />
      </TabsContent>
    </Tabs>
  );
};
