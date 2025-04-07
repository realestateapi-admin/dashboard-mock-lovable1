
import { CreditCard, CreditCardIcon, FileText, Wallet } from "lucide-react";
import { Tabs, TabsContent as UITabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentMethods } from "@/components/billing/PaymentMethods";
import { InvoiceHistory } from "@/components/billing/InvoiceHistory";
import { TermsOfServiceTab } from "@/components/billing/TermsOfServiceTab";
import { SubscriptionTab } from "./SubscriptionTab";
import { PlanData, AddOnData, InvoiceData, SubscriptionData } from "@/types/billing";

interface BillingTabsContentProps {
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
  showUpgradeWizard: boolean;
  setShowUpgradeWizard: (show: boolean) => void;
  handleSelectEnterprise: () => void;
}

export const BillingTabsContent = ({
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
  handleSelectEnterprise
}: BillingTabsContentProps) => {
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
      
      <UITabsContent value="subscription">
        <SubscriptionTab 
          plans={plans}
          addOns={addOns}
          selectedPlan={selectedPlan}
          activeAddOns={activeAddOns}
          overageHandling={overageHandling}
          costs={costs}
          billingCycle={billingCycle}
          subscription={subscription}
          isLoadingSubscription={isLoadingSubscription}
          onPlanChange={onPlanChange}
          onToggleAddOn={onToggleAddOn}
          onOverageHandlingChange={onOverageHandlingChange}
          onBillingCycleChange={onBillingCycleChange}
          onSaveBillingPreferences={onSaveBillingPreferences}
          handleSelectEnterprise={handleSelectEnterprise}
        />
      </UITabsContent>
      
      <UITabsContent value="payment">
        <PaymentMethods />
      </UITabsContent>
      
      <UITabsContent value="invoices">
        <InvoiceHistory 
          invoices={invoices} 
          onDownloadInvoice={onDownloadInvoice} 
        />
      </UITabsContent>
      
      <UITabsContent value="terms">
        <TermsOfServiceTab />
      </UITabsContent>
    </Tabs>
  );
};
