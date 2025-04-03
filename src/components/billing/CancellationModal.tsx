
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAccountExecutive } from '@/contexts/AccountExecutiveContext';

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
  const [step, setStep] = useState<'initial' | 'questionnaire' | 'completed'>('initial');
  const [reason, setReason] = useState('');

  const handleProceedToCancel = () => {
    // If annual contract, no questionnaire is shown
    if (isAnnual) {
      handleCancellationComplete();
    } else {
      setStep('questionnaire');
    }
  };

  const handleCancellationComplete = () => {
    setStep('completed');
    
    // In a real app, this would make an API call to cancel the subscription
    toast({
      title: "Subscription Cancelled",
      description: "Your subscription has been cancelled successfully.",
    });
    
    // Simulating backend email trigger
    console.log(`Sending email to assigned sales rep for ${planName} cancellation`);
    
    // After 3 seconds redirect to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  // Determine the initial modal content based on plan and contract type
  const renderInitialContent = () => {
    if (isAnnual) {
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
            onClick={handleCancellationComplete}
            disabled={!reason}
          >
            Cancel Subscription
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
        {step === 'completed' && renderCompletedState()}
      </DialogContent>
    </Dialog>
  );
};
