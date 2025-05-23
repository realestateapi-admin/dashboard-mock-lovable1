
import { CreditCard, CreditCardIcon, FileText, Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentMethods } from "@/components/billing/PaymentMethods";
import { InvoiceHistory } from "@/components/billing/InvoiceHistory";
import { TermsOfServiceTab } from "@/components/billing/TermsOfServiceTab";
import { PlanData, AddOnData, InvoiceData, SubscriptionData } from "@/types/billing";
import { useAccountExecutive } from "@/contexts/AccountExecutiveContext";
import { CurrentPlanSummary } from "@/components/billing/CurrentPlanSummary";

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
  // Access the AccountExecutive context to show/hide the widget
  const { showWidget } = useAccountExecutive();
  
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
        <div className="max-w-2xl mx-auto">
          <CurrentPlanSummary 
            plans={plans}
            addOns={addOns}
            subscription={subscription}
            selectedPlan={selectedPlan}
            activeAddOns={activeAddOns}
            overageHandling={overageHandling}
            billingCycle={billingCycle}
            isLoading={isLoadingSubscription}
          />
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
