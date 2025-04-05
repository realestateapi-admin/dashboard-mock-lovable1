
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

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
          <AlertDialogAction onClick={onProceed}>
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
          <AlertDialogAction onClick={onProceed}>
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
          <AlertDialogAction onClick={onProceed}>
            Proceed to Cancel
          </AlertDialogAction>
        </AlertDialogFooter>
      </>
    );
  }
};
