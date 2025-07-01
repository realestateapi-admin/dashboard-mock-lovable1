
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CancellationInitialProps {
  planName: string;
  isAnnual: boolean;
  isEnterprise: boolean;
  onProceed: () => void;
}

export const CancellationInitial = ({
  planName,
  isAnnual,
  isEnterprise,
  onProceed,
}: CancellationInitialProps) => {
  const navigate = useNavigate();

  // Special handling for Enterprise plan
  if (isEnterprise) {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Enterprise Partnership</DialogTitle>
          <DialogDescription>
            We greatly value our partnership with you and we want to find a way to keep supporting your project. 
            Your dedicated Solutions Engineer will reach out shortly to offer some options--including closing your account. 
            Rest assured, we'll do whatever your feel is best for your business.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Keep My Subscription
          </Button>
          <Button onClick={onProceed}>
            Submit Request
          </Button>
        </DialogFooter>
      </>
    );
  } else if (isAnnual) {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Annual Contract Obligation</DialogTitle>
          <DialogDescription>
            You are currently on an annual contract for the {planName} plan. 
            Your subscription will continue until the end of the billing period.
            No refunds will be issued for the remainder of your annual term.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Keep My Subscription
          </Button>
          <Button onClick={onProceed}>
            Cancel Anyway
          </Button>
        </DialogFooter>
      </>
    );
  } else {
    // For month-to-month, we offer discounts or free month based on the plan
    const discountText = planName === 'Starter' 
      ? "We'd like to offer you 50% off your next billing cycle."
      : "We'd like to offer you the next month free.";
    
    return (
      <>
        <DialogHeader>
          <DialogTitle>We're sorry to see you go</DialogTitle>
          <DialogDescription>
            Before you cancel, would you consider an exclusive offer?
            {' '}{discountText}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Accept Offer
          </Button>
          <Button onClick={onProceed}>
            Proceed to Cancel
          </Button>
        </DialogFooter>
      </>
    );
  }
};
