import { CreditCard, CreditCardIcon, Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BillingPlans } from "@/components/billing/BillingPlans";
import { SubscriptionSummary } from "@/components/billing/SubscriptionSummary";
import { PaymentMethods } from "@/components/billing/PaymentMethods";
import { InvoiceHistory } from "@/components/billing/InvoiceHistory";
import { PlanData, AddOnData, InvoiceData, SubscriptionData } from "@/types/billing";
import { useState, useEffect } from "react";
import { EnterprisePlanCard } from "./EnterprisePlanCard";
import { EnterpriseCompactCard } from "./EnterpriseCompactCard";
import { useAccountExecutive } from "@/contexts/AccountExecutiveContext";

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
  onDownloadInvoice
}: BillingTabsProps) => {
  // Remove the local billingCycle state since it's now passed as a prop
  // const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
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
      </TabsList>
      
      <TabsContent value="subscription">
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
        
        {/* REMOVED: Enterprise Plan Section - no longer showing the large card when enterprise is selected */}
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
    </Tabs>
  );
};
