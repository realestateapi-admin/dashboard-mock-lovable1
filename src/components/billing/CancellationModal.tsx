
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAccountExecutive } from '@/contexts/AccountExecutiveContext';
import { format, addMonths, endOfMonth } from 'date-fns';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface CancellationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  isAnnual: boolean;
}

export const CancellationModal = ({
  isOpen,
  onOpenChange,
  planName,
  isAnnual,
}: CancellationModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { ae } = useAccountExecutive();
  const [step, setStep] = useState<'initial' | 'questionnaire' | 'summary' | 'completed'>('initial');
  const [reason, setReason] = useState('');

  // Check if current plan is Enterprise
  const isEnterprise = planName.toLowerCase() === 'enterprise';

  const handleProceedToCancel = () => {
    // For Enterprise plan, just complete the cancellation process with SE outreach
    if (isEnterprise) {
      handleCancellationComplete();
      return;
    }
    
    // If annual contract, no questionnaire is shown
    if (isAnnual) {
      setStep('summary');
    } else {
      setStep('questionnaire');
    }
  };

  const handleSubmitQuestionnaire = () => {
    setStep('summary');
  };

  const handleCancellationComplete = () => {
    setStep('completed');
    
    // In a real app, this would make an API call to cancel the subscription
    toast({
      title: "Subscription Update",
      description: isEnterprise 
        ? "Your request has been received. Your Solutions Engineer will contact you shortly."
        : "Your subscription has been cancelled successfully.",
    });
    
    // Simulating backend email trigger
    console.log(`Sending email to assigned sales rep for ${planName} cancellation`);
  };

  // Calculate remaining obligation details
  const getCurrentDate = () => new Date();
  
  const getEndOfCurrentMonth = () => {
    const today = getCurrentDate();
    return endOfMonth(today);
  };

  const getContractEndDate = () => {
    const today = getCurrentDate();
    return addMonths(today, 12);
  };

  const formatDisplayDate = (date: Date) => {
    return format(date, 'MMMM d, yyyy');
  };

  const calculateRemainingMonths = () => {
    const today = getCurrentDate();
    const endDate = getContractEndDate();
    
    // Calculate the difference in months
    let months = (endDate.getFullYear() - today.getFullYear()) * 12;
    months -= today.getMonth();
    months += endDate.getMonth();
    
    // If we're past the day of the month of the end date, subtract a month
    if (today.getDate() > endDate.getDate()) {
      months--;
    }
    
    return months > 0 ? months : 0;
  };

  const getPlanPrice = () => {
    // Simple mapping of plan names to monthly prices
    const prices: Record<string, number> = {
      starter: 99,
      growth: 199,
      pro: 499,
      enterprise: 999
    };
    
    const planKey = planName.toLowerCase();
    return prices[planKey] || 99; // Default to 99 if plan not found
  };

  const calculateRemainingObligation = () => {
    if (!isAnnual) return 0;
    
    const monthsRemaining = calculateRemainingMonths();
    const monthlyPrice = getPlanPrice();
    return monthsRemaining * monthlyPrice;
  };

  // Determine the initial modal content based on plan and contract type
  const renderInitialContent = () => {
    // Special handling for Enterprise plan
    if (isEnterprise) {
      return (
        <>
          <AlertDialogHeader>
            <AlertDialogTitle>Enterprise Partnership</AlertDialogTitle>
            <AlertDialogDescription>
              We greatly value our partnership with you and we want to find a way to keep supporting your project. 
              Your dedicated Solutions Engineer will reach out shortly to offer some options--including closing your account. 
              Rest assured, we'll do whatever your feel is best for your business.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => navigate('/dashboard')}>
              Keep My Subscription
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleProceedToCancel}>
              Submit Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </>
      );
    } else if (isAnnual) {
      return (
        <>
          <AlertDialogHeader>
            <AlertDialogTitle>Annual Contract Obligation</AlertDialogTitle>
            <AlertDialogDescription>
              You are currently on an annual contract for the {planName} plan. 
              Your subscription will continue until the end of the billing period.
              No refunds will be issued for the remainder of your annual term.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => navigate('/dashboard')}>
              Keep My Subscription
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleProceedToCancel}>
              Cancel Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </>
      );
    } else {
      // For month-to-month, we offer discounts or free month based on the plan
      const discountText = planName === 'Starter' 
        ? "We'd like to offer you 50% off your next billing cycle."
        : "We'd like to offer you the next month free.";
      
      return (
        <>
          <AlertDialogHeader>
            <AlertDialogTitle>We're sorry to see you go</AlertDialogTitle>
            <AlertDialogDescription>
              Before you cancel, would you consider an exclusive offer?
              {' '}{discountText}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => navigate('/dashboard')}>
              Accept Offer
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleProceedToCancel}>
              Proceed to Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </>
      );
    }
  };

  const renderQuestionnaire = () => {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Help us improve</DialogTitle>
          <DialogDescription>
            We're sorry to see you go. Please let us know why you're cancelling.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup value={reason} onValueChange={setReason}>
            <div className="flex items-start space-x-2 my-2">
              <RadioGroupItem value="too_expensive" id="too_expensive" />
              <Label htmlFor="too_expensive" className="font-normal">
                Too expensive
              </Label>
            </div>
            <div className="flex items-start space-x-2 my-2">
              <RadioGroupItem value="missing_features" id="missing_features" />
              <Label htmlFor="missing_features" className="font-normal">
                Missing features I need
              </Label>
            </div>
            <div className="flex items-start space-x-2 my-2">
              <RadioGroupItem value="difficult" id="difficult" />
              <Label htmlFor="difficult" className="font-normal">
                Product was difficult to use
              </Label>
            </div>
            <div className="flex items-start space-x-2 my-2">
              <RadioGroupItem value="not_needed" id="not_needed" />
              <Label htmlFor="not_needed" className="font-normal">
                No longer need it
              </Label>
            </div>
            <div className="flex items-start space-x-2 my-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other" className="font-normal">
                Other reason
              </Label>
            </div>
          </RadioGroup>
        </div>
      
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Keep My Subscription
            </Button>
          </DialogClose>
          <Button 
            variant="destructive" 
            onClick={handleSubmitQuestionnaire}
            disabled={!reason}
          >
            Continue
          </Button>
        </DialogFooter>
      </>
    );
  };

  const renderSummary = () => {
    const today = getCurrentDate();
    const remainingObligation = calculateRemainingObligation();
    const accessEndDate = isAnnual ? today : getEndOfCurrentMonth();
    
    return (
      <>
        <DialogHeader>
          <DialogTitle>Cancellation Summary</DialogTitle>
          <DialogDescription>
            Please review the details of your cancellation before confirming.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="border rounded-md p-4 bg-muted/20">
            <h3 className="font-medium mb-2">Subscription Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Plan:</span>
              <span>{planName}</span>
              <span className="text-muted-foreground">Billing Cycle:</span>
              <span>{isAnnual ? 'Annual' : 'Monthly'}</span>
            </div>
          </div>
          
          <div className="border rounded-md p-4 bg-muted/20">
            <h3 className="font-medium mb-2">Cancellation Terms</h3>
            <div className="space-y-3 text-sm">
              {isAnnual ? (
                <>
                  <p>
                    Your subscription will be cancelled immediately, but in accordance with your annual contract, 
                    you are still responsible for payment of the remaining term.
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <span className="text-muted-foreground">Remaining Months:</span>
                    <span>{calculateRemainingMonths()} months</span>
                    <span className="text-muted-foreground">Remaining Obligation:</span>
                    <span className="font-medium">${remainingObligation.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    Your subscription will be cancelled at the end of your current billing period. 
                    You will continue to have access until {formatDisplayDate(accessEndDate)}.
                  </p>
                  <p className="text-amber-600">
                    Note: You will still be responsible for any overages that accrue during the remainder of your billing period.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setStep('initial')}>
            Go Back
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleCancellationComplete}
          >
            Confirm Cancellation
          </Button>
        </DialogFooter>
      </>
    );
  };

  const renderCompletedState = () => {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Subscription Cancelled</DialogTitle>
          <DialogDescription>
            Your subscription has been cancelled successfully. Your service will remain active
            until the end of the current billing period.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 text-center">
          {ae && (
            <div className="mt-4 text-sm text-muted-foreground">
              Your account executive {ae.name} has been notified and will reach out shortly.
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </DialogFooter>
      </>
    );
  };

  if (step === 'initial') {
    return (
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          {renderInitialContent()}
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        {step === 'questionnaire' && renderQuestionnaire()}
        {step === 'summary' && renderSummary()}
        {step === 'completed' && renderCompletedState()}
      </DialogContent>
    </Dialog>
  );
};
