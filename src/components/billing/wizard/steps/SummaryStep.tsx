
import { PlanData, AddOnData } from "@/types/billing";
import { SubscriptionSummary } from "@/components/billing/SubscriptionSummary";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, CreditCard, FileText } from "lucide-react";

interface SummaryStepProps {
  selectedPlan: string;
  plans: PlanData[];
  activeAddOns: string[];
  addOns: AddOnData[];
  overageHandling: string;
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  billingCycle: 'monthly' | 'annual';
  formData: any;
  isLoading: boolean;
}

export const SummaryStep = ({
  selectedPlan,
  plans,
  activeAddOns,
  addOns,
  overageHandling,
  costs,
  billingCycle,
  formData,
  isLoading
}: SummaryStepProps) => {
  const selectedPlanName = plans.find(p => p.id === selectedPlan)?.name || 'Selected';
  
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <Skeleton className="h-40 w-full" />
        </div>
        <div className="md:col-span-4">
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid gap-6 md:grid-cols-12">
      <div className="md:col-span-8">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Review Your Subscription Changes</h3>
          
          <div className="space-y-6 p-6 border rounded-lg bg-gray-50">
            {/* Plan summary */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <p className="text-sm font-medium text-muted-foreground">Selected Plan</p>
              </div>
              <p className="font-medium ml-7">{selectedPlanName} ({billingCycle === 'monthly' ? 'Monthly' : 'Annual'})</p>
            </div>
            
            {/* Add-ons summary */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <p className="text-sm font-medium text-muted-foreground">Add-Ons</p>
              </div>
              {activeAddOns.length > 0 ? (
                <ul className="space-y-1 ml-7">
                  {activeAddOns.map(addonId => {
                    const addon = addOns.find(a => a.id === addonId);
                    return (
                      <li key={addonId} className="font-medium">
                        {addon?.name}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm ml-7">No add-ons selected</p>
              )}
            </div>
            
            {/* Overage handling summary */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <p className="text-sm font-medium text-muted-foreground">Overage Handling</p>
              </div>
              <p className="font-medium ml-7">
                {overageHandling === 'cut-off' && 'Cut off access at plan limit'}
                {overageHandling === 'allow-25' && 'Allow 25% overage billed at the plan\'s unit rate'}
                {overageHandling === 'allow-100' && 'Allow 100% overage billed at the plan\'s unit rate'}
                {overageHandling === 'unlimited' && 'No limit on overages (mission critical)'}
              </p>
            </div>
            
            {/* Payment method summary */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-500" />
                <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
              </div>
              <p className="font-medium ml-7">
                {formData.paymentMethod === 'card' ? 'Credit Card' : 'Bank Account (ACH)'}
              </p>
            </div>
            
            {/* Terms acceptance */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-500" />
                <p className="text-sm font-medium text-muted-foreground">Terms of Service</p>
              </div>
              <p className="font-medium ml-7">
                {formData.termsAccepted ? 'Accepted' : 'Not accepted'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-4">
        <SubscriptionSummary 
          selectedPlan={selectedPlan}
          plans={plans}
          activeAddOns={activeAddOns}
          addOns={addOns}
          costs={costs}
          subscription={null}
          isLoading={isLoading}
          onSubmit={() => {}}
          billingCycle={billingCycle}
          showSubmitButton={false}
        />
      </div>
    </div>
  );
};
