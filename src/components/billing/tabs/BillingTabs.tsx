
import { UpgradeWizardV2 } from "@/components/billing/wizard/UpgradeWizardV2";
import { PlanData, AddOnData, InvoiceData, SubscriptionData } from "@/types/billing";
import { useUpgradeWizard } from "../hooks/useUpgradeWizard";
import { TabsContent } from "./TabsContent";

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
  const { showWizard, closeWizard } = useUpgradeWizard();
  
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

  if (showWizard) {
    return (
      <UpgradeWizardV2
        plans={plans}
        addOns={addOns}
        selectedPlan={selectedPlan}
        billingCycle={billingCycle}
        activeAddOns={activeAddOns}
        overageHandling={overageHandling}
        costs={costs}
        onPlanChange={onPlanChange}
        onToggleAddOn={onToggleAddOn}
        onOverageHandlingChange={onOverageHandlingChange}
        onBillingCycleChange={onBillingCycleChange}
        onSaveBillingPreferences={onSaveBillingPreferences}
        onFinish={handleFinishWizard}
        enterprisePlan={enterprisePlan}
        onSelectEnterprise={handleSelectEnterprise}
      />
    );
  }

  return (
    <TabsContent
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
      onStartUpgradeFlow={() => {}}
      showUpgradeWizard={showWizard}
      setShowUpgradeWizard={closeWizard}
      handleSelectEnterprise={handleSelectEnterprise}
    />
  );
};
