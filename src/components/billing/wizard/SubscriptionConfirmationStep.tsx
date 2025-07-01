import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { PlanData, AddOnData } from "@/types/billing";
import { CostSummary } from "./confirmation/CostSummary";
import { addDays, addMonths, getDaysInMonth } from "date-fns";
interface SubscriptionConfirmationStepProps {
  selectedPlan: string;
  plans: PlanData[];
  activeAddOns: string[];
  addOns: AddOnData[];
  overageHandling: string | null;
  costs: {
    basePrice: string;
    totalAddOns: string;
    total: string;
  };
  billingCycle: 'monthly' | 'annual';
  isLoading: boolean;
  paymentMethodType: 'card' | 'ach';
  showDashboardButton?: boolean;
}
export const SubscriptionConfirmationStep: React.FC<SubscriptionConfirmationStepProps> = ({
  selectedPlan,
  plans,
  activeAddOns,
  addOns,
  overageHandling,
  costs,
  billingCycle,
  isLoading,
  paymentMethodType,
  showDashboardButton = true
}) => {
  const navigate = useNavigate();
  const plan = plans.find(p => p.id === selectedPlan);
  const selectedAddOns = addOns.filter(addon => activeAddOns.includes(addon.id));

  // Format overage handling for display
  const formatOverageHandling = (value: string | null): string => {
    switch (value) {
      case 'cut-off':
        return 'Stop API calls when limit is reached';
      case 'allow-25':
        return 'Allow 25% overage';
      case 'allow-100':
        return 'Allow 100% overage';
      case 'unlimited':
        return 'Never cut off API key (mission critical)';
      default:
        return 'Not specified';
    }
  };

  // Calculate financial information for prorated billing
  const calculateFinancialInfo = () => {
    const today = new Date();
    const totalAmount = Number(costs.total.replace(/[$,]/g, ''));

    // Calculate first payment date (first of next month)
    const firstPaymentDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    // Calculate remaining days in current month
    const daysInMonth = getDaysInMonth(today);
    const remainingDays = daysInMonth - today.getDate() + 1;

    // Calculate prorated amount
    const proratedAmount = Math.round(totalAmount / daysInMonth * remainingDays);

    // Calculate transaction fee (3% for card payments)
    const transactionFee = paymentMethodType === 'card' ? Math.round(totalAmount * 0.03) : 0;
    const totalWithFee = totalAmount + transactionFee;
    return {
      transactionFee,
      totalWithFee,
      firstPaymentDate,
      remainingDays,
      proratedAmount
    };
  };
  const financialInfo = calculateFinancialInfo();
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };
  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };
  return <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscription Confirmed!</h1>
          <p className="text-lg text-gray-600 mt-2">
            Welcome to {plan?.name}! Your subscription is now active.
          </p>
        </div>
      </div>

      {/* Subscription Details */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Details</CardTitle>
          <CardDescription>Here's a summary of your new subscription</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-500">Selected Plan:</span>
              <p className="text-gray-900">{plan?.name}</p>
            </div>
            <div>
              <span className="font-medium text-gray-500">Subscription cycle:</span>
              <p className="text-gray-900">{billingCycle === 'annual' ? 'Annual' : 'Monthly'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-500">Payment Method:</span>
              <p className="text-gray-900">{paymentMethodType === 'card' ? 'Credit Card' : 'Bank Account'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-500">Overage Handling:</span>
              <p className="text-gray-900">{formatOverageHandling(overageHandling)}</p>
            </div>
          </div>

          {selectedAddOns.length > 0 && <div className="border-t pt-4">
              <span className="font-medium text-gray-500 block mb-2">Add-ons:</span>
              <ul className="space-y-1">
                {selectedAddOns.map(addon => <li key={addon.id} className="text-sm text-gray-700">
                    • {addon.name}
                  </li>)}
              </ul>
            </div>}

          {/* Cost Summary */}
          <CostSummary costs={costs} financialInfo={financialInfo} formatCurrency={formatCurrency} paymentMethodType={paymentMethodType} billingCycle={billingCycle} />
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <span>Your account has been upgraded and is ready to use</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <span>Generate API keys in your dashboard to start integration</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <span>Access our documentation for implementation guides</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <span>You'll receive a confirmation email shortly</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Return to Dashboard Button - Only show if showDashboardButton is true */}
      {showDashboardButton && <div className="text-center pt-6">
          <Button onClick={handleReturnToDashboard} size="lg" className="px-8">
            Go to Dashboard
          </Button>
        </div>}
    </div>;
};