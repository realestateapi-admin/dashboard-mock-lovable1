
import { CreditCard, CreditCardIcon, Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BillingPlans } from "@/components/billing/BillingPlans";
import { SubscriptionSummary } from "@/components/billing/SubscriptionSummary";
import { PaymentMethods } from "@/components/billing/PaymentMethods";
import { InvoiceHistory } from "@/components/billing/InvoiceHistory";
import { PlanData, AddOnData, InvoiceData, SubscriptionData } from "@/types/billing";

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
              plans={plans}
              addOns={addOns}
              selectedPlan={selectedPlan}
              activeAddOns={activeAddOns}
              overageHandling={overageHandling}
              onPlanChange={onPlanChange}
              onToggleAddOn={onToggleAddOn}
              onOverageHandlingChange={onOverageHandlingChange}
              onSaveBillingPreferences={onSaveBillingPreferences}
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
            />
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
    </Tabs>
  );
};
