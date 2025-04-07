
import { useUpgradeWizard } from "../hooks/useUpgradeWizard";
import { BillingTabsContent } from "./TabsContent";
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
  onDownloadInvoice
}: BillingTabsProps) => {
  const { showWizard, closeWizard, startWizard } = useUpgradeWizard();
  
  const enterprisePlan = plans.find(p => p.id === "enterprise");

  const handleSelectEnterprise = () => {
    if (enterprisePlan) {
      onPlanChange(enterprisePlan.id);
    }
  };

  const handleFinishWizard = () => {
    closeWizard();
    onSaveBillingPreferences();
  };

  return (
    <BillingTabsContent
      plans={plans}
      addOns={addOns}
      invoices={invoices}
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
      onDownloadInvoice={onDownloadInvoice}
      onStartUpgradeFlow={startWizard}
      showUpgradeWizard={showWizard}
      setShowUpgradeWizard={closeWizard}
      handleSelectEnterprise={handleSelectEnterprise}
    />
  );
};
