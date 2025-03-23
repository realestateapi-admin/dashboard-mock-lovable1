
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, CreditCardIcon, Wallet } from "lucide-react";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

// Import components
import { BillingPlans } from "@/components/billing/BillingPlans";
import { SubscriptionSummary } from "@/components/billing/SubscriptionSummary";
import { PaymentMethods } from "@/components/billing/PaymentMethods";
import { InvoiceHistory } from "@/components/billing/InvoiceHistory";
import { TrialAlert } from "@/components/billing/TrialAlert";

// Import data
import { plans, addOns, invoices } from "@/data/billingData";

const Billing = () => {
  const [selectedPlan, setSelectedPlan] = useState("growth");
  const [overageHandling, setOverageHandling] = useState("stop");
  const [activeAddOns, setActiveAddOns] = useState<string[]>(["premium-avm"]);
  const { toast } = useToast();
  const { isTrialActive, trialDaysLeft, requestTrialExtension } = useTrialAlert();

  const handleSaveBillingPreferences = () => {
    toast({
      title: "Billing preferences updated",
      description: "Your billing preferences have been saved successfully.",
    });
  };

  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
    toast({
      title: "Plan selection updated",
      description: `You've selected the ${plans.find(p => p.id === planId)?.name} plan.`,
    });
  };

  const toggleAddOn = (addOnId: string) => {
    setActiveAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice download started",
      description: `Invoice ${invoiceId} is being downloaded.`,
    });
  };

  // Calculate estimated monthly cost
  const calculateMonthlyCost = () => {
    const basePlan = plans.find(p => p.id === selectedPlan);
    if (!basePlan) return { basePrice: "$0", totalAddOns: "$0", total: "$0" };
    
    // Extract numeric price from base plan (removing $ and /mo)
    const basePrice = parseInt(basePlan.price.replace(/\$|,/g, ""));
    
    // Calculate add-on costs
    let addOnTotal = 0;
    activeAddOns.forEach(addonId => {
      const addon = addOns.find(a => a.id === addonId);
      if (!addon) return;
      
      const priceStr = addon.prices[selectedPlan as keyof typeof addon.prices];
      if (priceStr === "Included") return;
      
      // Only add monthly costs (ignoring "each" pricing for usage-based services)
      if (priceStr.includes("/month")) {
        const price = parseInt(priceStr.replace(/\$|,|\/month/g, ""));
        addOnTotal += price;
      }
    });
    
    return {
      basePrice: `$${basePrice.toLocaleString()}`,
      totalAddOns: `$${addOnTotal.toLocaleString()}`,
      total: `$${(basePrice + addOnTotal).toLocaleString()}`
    };
  };

  const costs = calculateMonthlyCost();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Billing & Subscription</h1>
      </div>
      
      <TrialAlert 
        isTrialActive={isTrialActive} 
        trialDaysLeft={trialDaysLeft} 
        requestTrialExtension={requestTrialExtension} 
      />
      
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
                onPlanChange={handlePlanChange}
                onToggleAddOn={toggleAddOn}
                onOverageHandlingChange={setOverageHandling}
                onSaveBillingPreferences={handleSaveBillingPreferences}
              />
            </div>
            
            <div className="md:col-span-1">
              <SubscriptionSummary 
                selectedPlan={selectedPlan}
                plans={plans}
                activeAddOns={activeAddOns}
                addOns={addOns}
                costs={costs}
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
            onDownloadInvoice={handleDownloadInvoice} 
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Billing;
