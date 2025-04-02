
import { CreditCard, CreditCardIcon, Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BillingPlans } from "@/components/billing/BillingPlans";
import { SubscriptionSummary } from "@/components/billing/SubscriptionSummary";
import { PaymentMethods } from "@/components/billing/PaymentMethods";
import { InvoiceHistory } from "@/components/billing/InvoiceHistory";
import { PlanData, AddOnData, InvoiceData, SubscriptionData } from "@/types/billing";
import { useState } from "react";
import { EnterprisePlanCard } from "./EnterprisePlanCard";

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
  subscription?: SubscriptionData | null;
  isLoadingSubscription: boolean;
  onPlanChange: (planId: string) => void;
  onToggleAddOn: (addOnId: string) => void;
  onOverageHandlingChange: (value: string) => void;
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
  subscription,
  isLoadingSubscription,
  onPlanChange,
  onToggleAddOn,
  onOverageHandlingChange,
  onSaveBillingPreferences,
  onDownloadInvoice
}: BillingTabsProps) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  // Find the enterprise plan
  const enterprisePlan = plans.find(p => p.id === "enterprise");
  // Filter out enterprise plan from the regular plans list
  const regularPlans = plans.filter(p => p.id !== "enterprise");

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
              onBillingCycleChange={setBillingCycle}
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
          </div>
        </div>
        
        {/* Enterprise Plan Section */}
        {enterprisePlan && (
          <div className="mt-8">
            <div className="mb-3">
              <h3 className="text-xl font-semibold">Enterprise Solutions</h3>
              <p className="text-sm text-muted-foreground">Need a custom solution? Our Enterprise plan offers tailored options for large organizations.</p>
            </div>
            <EnterprisePlanCard 
              plan={enterprisePlan}
              selectedPlan={selectedPlan}
              onPlanChange={onPlanChange}
            />
          </div>
        )}
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
